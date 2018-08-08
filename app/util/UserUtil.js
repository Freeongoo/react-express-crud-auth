const Util = require("./Util")

let UserUtil = {

    /**
     * @param id
     * @returns {boolean}
     */
    isValidUserId(id) {
        try {
            Util.validateObjectId(id)
        } catch (e) {
            return false
        }

        return true
    }
}

module.exports = UserUtil