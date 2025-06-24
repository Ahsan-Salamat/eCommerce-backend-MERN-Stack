

export default (err, req, res, next) => {
    let error = {
        message: err.message || 'internal Server Error',
        statusCode: err.statusCode || 500,
        stack: err.stack || 'No stack trace available'
    }

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        res.status(error.statusCode).json({
        success: false,
        error: error,
    });
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        res.status(error.statusCode).json({
        success: false,
        message: error.message,
    });
    }

    
}