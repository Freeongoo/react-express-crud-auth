const express = require('express')
const router = express.Router()
const Util = require('../util/Util')
const ResponseUtil = require("../util/ResponseUtil")

// GET users listing
router.get('/', function(req, res, next) {
    let users = req.db.get('users')
    users.find({})
        .then((data) => {
            res.json(data)
        })
        .catch((e) => {
            ResponseUtil.sendExceptionResponse(req, res, e)
        })
})

// GET user info by id
router.get('/:id', function(req, res, next) {
    const id = req.params.id
    let users = req.db.get('users')

    Util.validateObjectId(id)

    users.findOne({_id: id})
        .then((data) => {
            if (!data) ResponseUtil.send404Response(res, "User not found")
            else res.json(data)
        })
        .catch((e) => {
            ResponseUtil.sendExceptionResponse(req, res, e, 400)
        })

})

// DELETE user by id
router.delete('/:id', function(req, res, next) {
    const id = req.params.id
    let users = req.db.get('users')

    Util.validateObjectId(id)

    users.remove({ _id: id })
        .then(() => {
            ResponseUtil.sendSuccessResponse(res, "success")
        })
        .catch((e) => {
            ResponseUtil.sendExceptionResponse(req, res, e, 400)
        })
})

// POST create new user
router.post('/', function(req, res, next) {
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
            ResponseUtil.sendSuccessResponse(res, "success")
        })
        .catch((e) => {
            ResponseUtil.sendExceptionResponse(req, res, e, 400)
        })
})

// PATCH edit user
router.patch('/:id', function(req, res, next) {
    const id = req.params.id
    let users = req.db.get('users')

    Util.validateObjectId(id)

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
            ResponseUtil.sendSuccessResponse(res, "success")
        })
        .catch((e) => {
            ResponseUtil.sendExceptionResponse(req, res, e, 400)
        })
})

module.exports = router
