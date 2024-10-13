exports.handleError = (res, statusCode, message) => {
    res.status(statusCode).json({ message });
};