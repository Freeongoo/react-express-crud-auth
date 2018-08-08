const express = require('express')
const router = express.Router()
const Util = require('../util/Util')
const ResponseUtil = require("../util/ResponseUtil")
const userController = require("../controllers/usersController")

// GET users listing
router.get('/', userController.findAll)

// POST create new user
router.post('/', userController.create)

// GET user info by id
router.get('/:id', userController.findOne)

// DELETE user by id
router.delete('/:id', userController.delete)

// PATCH edit user
router.patch('/:id', userController.update)

module.exports = router
