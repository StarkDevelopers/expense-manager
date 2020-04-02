const Logger = require('./logger');
const Repository = require('./repository');

class LoggerFactory {
    constructor () {}

    static create (label, context) {
        const logger = new Logger(label, context);
        logger.writers.add(Repository.getDefault());
        return logger;
    }
}

module.exports = LoggerFactory;
