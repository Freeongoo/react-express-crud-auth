const mongodb = require("mongodb")
const InvalidObjectIdException = require("./../exceptions/InvalidObjectIdException")

let Util = {

    validateObjectId(id) {
        if (!mongodb.ObjectID.isValid(id))
            throw new InvalidObjectIdException("Invalid Object Id")
    },

    createMongoDbFilter(query, fields) {
        let searchObj = fields.map((field) => {
            return {
                [field]: {
                    $regex: query,
                    $options: 'i'
                }
            }
        })

        return {
            $or: searchObj
        };
    }
}

module.exports = Util