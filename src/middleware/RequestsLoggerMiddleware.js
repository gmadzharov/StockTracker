class RequestsLoggerMiddleware {
    constructor(logger) {
        this._logger = logger;
    }

    logRequest = (req, res, next) => {
        if (this._logger?.log) {
            const { method, url, params, query } = req;
            this._logger.log(`${new Date().toISOString()} - Request: ${method} ${url} Params: ${JSON.stringify(params)} Query:${JSON.stringify(query)}`)
            next()

        }
    }
}

export default RequestsLoggerMiddleware;