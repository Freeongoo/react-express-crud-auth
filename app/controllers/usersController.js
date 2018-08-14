const ResponseUtil = require("../util/ResponseUtil")
const UserUtil = require("../util/UserUtil")
const Util = require("../util/Util")
const _ = require("lodash")
const NotSetRequiredParamsException = require('../exceptions/NotSetRequiredParamsException')
const NotFoundException = require('../exceptions/NotFoundException')

const DEFAULT_SEARCH_USERS_FIELDS = 'firstName, lastName, email'

exports.findAll = (req, res, next) => {
    // detect search
    let query = req.query.query
    let fields = req.query.fields;

    if (_.isEmpty(fields)) {
        fields = {}
        fields.users = DEFAULT_SEARCH_USERS_FIELDS
    }

    fields.users = fields.users.split(",").map(item => {
        return item.trim();
    })

    let queryUsersRequest = (!_.isEmpty(query)) ? Util.createMongoDbFilter(query, fields.users) : {}

    let users = req.db.get('users')

    users.find(queryUsersRequest)
        .then(data => {
            res.json(data)
        })
        .catch(e => {
            return next(e)
        })
}

exports.findOne = (req, res, next) => {
    const id = req.params.id

    if (!UserUtil.isValidUserId(id))
        throw new NotFoundException("Not exist user id")

    let users = req.db.get('users')
    users.findOne({_id: id})
        .then(data => {
            if (!data) throw new NotFoundException("User not found")
            else res.json(data)
        })
        .catch(e => {
            return next(e)
        })
}

exports.delete = (req, res, next) => {
    const id = req.params.id

    if (!UserUtil.isValidUserId(id))
        throw new NotFoundException("Not exist user id")

    let users = req.db.get('users')
    users.remove({ _id: id })
        .then(() => {
            ResponseUtil.sendSuccessResponse(res, "success")
        })
        .catch((e) => {
            return next(e)
        })
}

exports.create = (req, res, next) => {
    if (_.isEmpty(req.body))
        throw new NotSetRequiredParamsException("User content can not be empty")

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    let newUser = {
        firstName,
        lastName,
        email
    }

    // TODO: validate newUser

    let users = req.db.get('users')
    users.insert(newUser)
        .then(() => {
            ResponseUtil.sendSuccessResponse(res, "User successfully created")
        })
        .catch((e) => {
            return next(e)
        })
}

exports.update = (req, res, next) => {
    const id = req.params.id

    if (!UserUtil.isValidUserId(id))
        throw new NotFoundException("Not exist user id")

    if (_.isEmpty(req.body))
        throw new NotSetRequiredParamsException("User content can not be empty")

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    let updatedUser = {
        firstName,
        lastName,
        email
    }

    // TODO: validate updatedUser

    let users = req.db.get('users')
    users.update({ _id: id }, { $set: updatedUser })
        .then(() => {
            ResponseUtil.sendSuccessResponse(res, "User successfully updated")
        })
        .catch((e) => {
            next(e)
        })
}