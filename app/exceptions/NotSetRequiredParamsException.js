class NotSetRequiredParamsException extends Error {
    constructor(message, status) {
        super()

        Error.captureStackTrace(this, this.constructor)

        this.name = this.constructor.name

        this.message = message

        this.status = status || 400
    }
}

module.exports = NotSetRequiredParamsException