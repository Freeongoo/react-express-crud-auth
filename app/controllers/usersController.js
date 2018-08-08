const ResponseUtil = require("../util/ResponseUtil");
const UserUtil = require("../util/UserUtil");

exports.findAll = (req, res) => {
    let users = req.db.get('users')
    users.find({})
        .then(data => {
            res.json(data)
        })
        .catch(e => {
            ResponseUtil.sendExceptionResponse(req, res, e)
        })
}

exports.findOne = (req, res) => {
    const id = req.params.id
    let users = req.db.get('users')

    if (!UserUtil.isValidUserId(id))
        return ResponseUtil.send404Response(res, "Not exist user id")

    users.findOne({_id: id})
        .then(data => {
            if (!data) ResponseUtil.send404Response(res, "User not found")
            else res.json(data)
        })
        .catch(e => {
            ResponseUtil.sendExceptionResponse(req, res, e)
        })
}

exports.delete = (req, res) => {
    const id = req.params.id
    let users = req.db.get('users')

    if (!UserUtil.isValidUserId(id))
        return ResponseUtil.send404Response(res, "Not exist user id")

    users.remove({ _id: id })
        .then(() => {
            ResponseUtil.sendSuccessResponse(res, "success")
        })
        .catch((e) => {
            ResponseUtil.sendExceptionResponse(req, res, e)
        })
}

exports.create = (req, res) => {
    if (!req.body)
        return ResponseUtil.send400Response(res, "User content can not be empty")

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    let users = req.db.get('users')
    users.insert({
        firstName,
        lastName,
        email
    })
        .then(() => {
            ResponseUtil.sendSuccessResponse(res, "User successfully created")
        })
        .catch((e) => {
            ResponseUtil.sendExceptionResponse(req, res, e)
        })
}

exports.update = (req, res) => {
    const id = req.params.id
    let users = req.db.get('users')

    if (!UserUtil.isValidUserId(id))
        return ResponseUtil.send404Response(res, "Not exist user id")

    if (!req.body)
        return ResponseUtil.send400Response(res, "User content can not be empty")

    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email

    let updatedUser = {
        firstName,
        lastName,
        email
    }

    users.update({ _id: id }, { $set: updatedUser })
        .then(() => {
            ResponseUtil.sendSuccessResponse(res, "User successfully updated")
        })
        .catch((e) => {
            ResponseUtil.sendExceptionResponse(req, res, e)
        })
}