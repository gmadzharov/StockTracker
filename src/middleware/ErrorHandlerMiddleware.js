class ErrorHandlerMiddleware {
    constructor(logger = null) {
        this._logger = logger;
    }

    handleError = (error, req, res, next) => {
        this._logError(error.message);
        res.status(500).send('Internal Server Error');
    }

    _logError(msg) {
        if (this._logger?.log) {
            this._logger.log(`${new Date().toISOString()} - Error: ${msg}`);
        }
    }
}

export default ErrorHandlerMiddleware;