let ResponseUtil = {
    sendErrorResponse(res, code, message) {
        res.statusMessage = message
        res.status(code).send({message});
    },

    send404Response(res, message) {
        this.sendErrorResponse(res, 404, message)
    },

    sendExceptionResponse(req, res, err, code = null) {
        let isDev = req.app.get('env') === 'development'
        let statusCode = code ? code : err.status

        res.statusMessage = err.message
        res.status(statusCode)

        let info = {
            statusCode: statusCode,
            message: err.message,
            error: err.name,
        }

        if (!isDev) res.json(info)

        res.json({
            ...info,
            errorTrack: err.stack
        })
    }
}

module.exports = ResponseUtil