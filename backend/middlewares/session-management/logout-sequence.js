const connectionPool = require('../../helpers/db-helper/connection-pool');

function logoutSequence(app) {
    app.all('/auth/logout', (req, res, next) => {
        clearCookies(res);

        if (req.user && req.user.Username && req.user.Domain && req.user.Server) {
            const connectionKey = connectionPool.generateKey(req.user.Server,
                req.user.Username,
                req.user.Domain);
            connectionPool.unregister(connectionKey);
        }

        // Destroying session
        console.log('Destroying session for user', req.user);
        req.session.destroy();

        // Logging out
        console.log('Logging out user', req.user);
        req.logout();

        res.redirect('/');
    });
}

function clearCookies(res) {
    // Clear cookies we have set for particular User login...
}

module.exports = logoutSequence;
