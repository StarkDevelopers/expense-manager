const userAPI = require('./user.routes');

function initializeRoutes (app) {
    userAPI.register(app);
}

module.exports = initializeRoutes;
