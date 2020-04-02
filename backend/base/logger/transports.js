const path = require('path');

const { transports } = require('winston');
require('winston-daily-rotate-file');

const consoleTransport = new transports.Console();

const applicationLogTransport = new (transports.DailyRotateFile)({
    filename: path.join(__dirname, '../../logs/application-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    level: 'info',
    maxSize: '20m',
    maxFiles: '14d'
});

const applicationErrorTransport = new (transports.DailyRotateFile)({
    filename: path.join(__dirname, '../../logs/errors-%DATE%.log'),
    datePattern: 'YYYY-MM-DD-HH',
    level: 'error',
    maxSize: '20m',
    maxFiles: '14d'
});

module.exports = {
    consoleTransport,
    applicationLogTransport,
    applicationErrorTransport
};
