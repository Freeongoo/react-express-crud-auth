const express = require('express');
const router = express.Router();

// GET users listing
router.get('/', function(req, res, next) {
    let db = req.db;
    let users = db.get('users');
    users.find({},{}, function(e, data){
        res.json(data)
    });
});

// GET user info by id
router.get('/:id', function(req, res, next) {
    const id = req.params.id;
    let db = req.db;
    let users = db.get('users');
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
    let db = req.db;

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let users = db.get('users');
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

// PATCH edit user
router.patch('/:id', function(req, res, next) {
    const id = req.params.id;
    let db = req.db;
    let users = db.get('users');

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let updatedUser = {
        firstName,
        lastName,
        email
    }

    try {
        users.find({_id: id}, {}, function (e, data) {
            let findUser = data[0]

            users.update(findUser,
                { $set: updatedUser },
                function (error, doc) {
                    if (error) {
                        res.status(400).send({ error: error.message });
                    } else {
                        res.status(200).send({ msg: "success" });
                    }
                });
        });
    } catch (e) {
        res.status(404).send({ error: "User not exist" });
    }
});

module.exports = router;
