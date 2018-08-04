const express = require('express');
const router = express.Router();

// GET users listing
router.get('/', function(req, res, next) {
    var db = req.db;
    var users = db.get('users');
    users.find({},{}, function(e, data){
        res.json(data)
    });
});

// GET user info by id
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    var db = req.db;
    var users = db.get('users');
    try {
        users.find({_id: id}, {}, function (e, data) {
            res.json(data[0])
        });
    } catch (e) {
        res.status(404).send({ error: "User not exist" });
    }
});

// POST create new user
router.post('/', function(req, res, next) {
    var db = req.db;

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var users = db.get('users');
    users.insert({
        firstName,
        lastName,
        email
    }, function (error, doc) {
        if (error) {
            res.status(400).send({ error: "Could not create new user." });
        } else {
            res.status(200).send({ msg: "success" });
        }
    });
});

module.exports = router;
