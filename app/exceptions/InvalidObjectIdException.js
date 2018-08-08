class InvalidObjectIdException extends Error {
    constructor(message, status) {
        super()

        Error.captureStackTrace(this, this.constructor)

        this.name = this.constructor.name

        this.message = message

        this.status = status || 404
    }
}

module.exports = InvalidObjectIdException