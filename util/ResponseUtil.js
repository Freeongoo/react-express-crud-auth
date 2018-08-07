let ResponseUtil = {
    sendResponse(res, code, message) {
        res.statusMessage = message
        res.status(code).send({message})
    },

    sendSuccessResponse(res, message) {
        this.sendResponse(res, 200, message)
    },

    send404Response(res, message) {
        this.sendResponse(res, 404, message)
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