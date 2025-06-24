

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;


        //i dont get this part
        // Capture stack trace for debugging
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;