let ResponseUtil = {
    sendResponse(res, code, message) {
        res.statusMessage = message
        res.status(code).send(this._commonResponseInfo(message, code))
    },

    sendSuccessResponse(res, message) {
        this.sendResponse(res, 200, message)
    },

    send404Response(res, message) {
        this.sendResponse(res, 404, message)
    },

    send400Response(res, message) {
        this.sendResponse(res, 400, message)
    },

    sendExceptionResponse(req, res, err, code = null) {
        let isDev = req.app.get('env') === 'development'

        // set statusCode
        let statusCode = code ? code : err.status
        statusCode = statusCode || 500

        res.statusMessage = err.message
        res.status(statusCode)

        let info = {
            ...this._commonResponseInfo(err.message, statusCode),
            error: err.name,
        }

        if (!isDev) res.json(info)

        res.json({
            ...info,
            errorTrack: err.stack
        })
    },

    _commonResponseInfo(message, code) {
        return {
            statusCode: code,
            message: message
        }
    }
}

module.exports = ResponseUtil