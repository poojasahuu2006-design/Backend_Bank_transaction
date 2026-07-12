// global error handler
const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined // hide stack trace in production
    });
};

module.exports = errorHandler;
