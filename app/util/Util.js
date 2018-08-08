const mongodb = require("mongodb")
const InvalidObjectIdException = require("./../exceptions/InvalidObjectIdException")

let Util = {

    validateObjectId(id) {
        if (!mongodb.ObjectID.isValid(id))
            throw new InvalidObjectIdException("Invalid Object Id")
    }
}

module.exports = Util