import ErrorHandler from '../utils/errorHandler.js';

export default (err, req, res, next) => {
    let error = {
        message: err.message || 'internal Server Error',
        statusCode: err.statusCode || 500,
        stack: err.stack || 'No stack trace available'
    }

    if(err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err?.path}`;
        error = new ErrorHandler(message, 400);
    }


    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((value)=>value.message);
        error = new ErrorHandler(message, 400);
    }

      if(err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        error = new ErrorHandler(message, 400);
    }

    if(err.name === 'JsonWebTokenError') {
        const message = 'Json Web Token is invalid, try again';
        error = new ErrorHandler(message, 400);
    }

    if(err.name === 'TokenExpiredError') {
        const message = 'Json Web Token is expired, try again';
        error = new ErrorHandler(message, 400);
    }

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(error.statusCode).json({
        success: false,
        error: error,
        message: error.message,
    });
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        res.status(error.statusCode).json({
        message: error.message,
    });
    }

    
}