var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.json([
        {
            "id": 1,
            "firstName": "Mark",
            "lastName": "Otto",
            "email": "mark@example.com"
        },
        {
            "id": 22,
            "firstName": "Jacob",
            "lastName": "Thornton",
            "email": "jacob@example.com"
        },
        {
            "id": 231,
            "firstName": "Larry",
            "lastName": "Bird",
            "email": "larry@example.com"
        }
    ]);
});

module.exports = router;
