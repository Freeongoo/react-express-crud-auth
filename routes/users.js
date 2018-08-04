var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var db = req.db;
    var users = db.get('users');
    users.find({},{}, function(e, data){
        res.json(data)
    });
});

/* GET users listing. */
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

module.exports = router;
