const util = require('util');

const { createLogger, format } = require('winston');
const { combine, timestamp, printf } = format;
const { SPLAT } = require('triple-beam');

const Repository = require('./repository');
const { levels } = require('./config');
const LoggerFactory = require('./factory');

const {
    consoleTransport,
    applicationLogTransport,
    applicationErrorTransport
} = require('./transports');

const _loggerFormat = printf((data) => {
    const splat = data[SPLAT] || [];
    const message = util.format(data.message);
    const restMessages = splat.map((s) => util.format(s)).join('\n');
    data.message = `${message}\n${restMessages}`;

    return `${data.timestamp} ${data.level}: ${data.message}\n`;
});

function initialize () {
    const defaultWriter = createLogger({
        format: combine(
            timestamp(),
            _loggerFormat
        ),
        transports: [
            consoleTransport,
            applicationLogTransport,
            applicationErrorTransport
        ]
    });

    Repository.setDefault(defaultWriter);

    overrideConsoles();
}

function overrideConsoles () {
    const logger = LoggerFactory.create();

    levels.forEach((level) => {
        console[level] = function (...args) {
            logger[level](...args);
        };
    });
}

module.exports = initialize;
