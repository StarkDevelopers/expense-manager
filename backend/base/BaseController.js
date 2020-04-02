const APIContext = require('./APIContext');
const Logger = require('./logger/logger');

class BaseController {
    /**
     * @param {APIContext} context
     * @param {Logger} logger
     * @param {string} feature
     */
    constructor (context, logger, feature) {
        this.context = context;

        this.logger = logger;

        this.feature = feature;
    }

    /**
     * Sends response
     * @param {string|Object} response 
     */
    respondOk (response) {
        this.respond(200, response);
    }

    /**
     * Sends error
     * @param {string|Object} error 
     */
    respondError (error) {
        this.respond(500, error);
    }

    /**
     * Sends not found error
     * @param {string|Object} errorMessage 
     */
    respondNotFound (errorMessage) {
        this.respond(404, errorMessage);
    }
    
    /**
     * Sends response with custom status code
     * @param {number} status 
     * @param {string|Object} response 
     */
    respond (status, response) {
        this.context.response.status(status);
        this.context.response.send(response);
    }
}

module.exports = BaseController;
