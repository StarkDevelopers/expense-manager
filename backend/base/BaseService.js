const APIContext = require('./APIContext');
const Logger = require('./logger/logger');
const commonFunctions = require('../utils/common/commonFunctions');

class BaseService {
    /**
     * @param {APIContext} context
     * @param {Logger} logger
     */
    constructor (context, logger) {
        this.context = context;

        this.logger = logger;
    }

    parseIfString (jsonString, handleError = null, errorMessage = null, defaultObject = null) {
        commonFunctions.parseIfString(jsonString, handleError, errorMessage, defaultObject);
    }

    stringify (jsonObject) {
        commonFunctions.stringify(jsonObject);
    }
}

module.exports = BaseService;
