const util = require('util');

const APIContext = require('../APIContext');
const Repository = require('./repository');

const { levels } = require('./config');

class Logger {
    /**
     * @param {string} label
     * @param {APIContext} context
     */
    constructor (label = 'APP', context = null) {
        this.label = label;

        this.context = context;

        this.writers = new Set();
    }

    log (...args) {
        this.writers.forEach((writer) => {
            writer.log(...args);
        });
        
        if (this.context && this.context.request) {
            writeDebugTrace(this.context.request, ...args);
        }
    }

    static setupMethods () {
        levels.forEach((level) => {
            Logger.prototype[level] = function (message, ...args) {
                message = util.format(message);

                message = `[${this.label}] ${message}`;

                this.log(level, message, ...args);
            };
        });
    }
}

function writeDebugTrace (request, ...args) {
    if (request.user.Username && request.user.Domain) {
        const traceId = `${request.user.Username}@${request.user.Domain}`;
        const writers = Repository.getByPattern(traceId);

        if (writers && writers.length > 0) {
            writers.forEach((writer) => {
                writer.log(...args);
            });
        }
    }
}

module.exports = Logger;
