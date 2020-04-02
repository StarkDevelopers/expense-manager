/**
 * Express Custom Error Handler
 * Whenever error(object) is passed to next this handler will be called
 * 
 * Try to catch each and every error and send response from controller or respective route/middleware
 * Avoid this custom error handler
 */
function customErrorHandler () {
    return (error, req, res, next) => {
        // Send error mail
        res.status(500);
        res.send(error);
    };
}

function csrfTokenErrorHandler () {
    return (error, req, res, next) => {
        if (error.code !== 'EBADCSRFTOKEN') {
            return next(error);
        }
        if (!req.isAuthenticated()) {
            res.render('login', { code: 'EBADCSRFTOKEN' });
        } else {
            res.send('Invalid or expired CSRF Token. Please refresh and try again.');
        }
    };
}

module.exports = {
    customErrorHandler,
    csrfTokenErrorHandler
};
