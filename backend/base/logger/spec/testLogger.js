const initializeLogger = require('../index');
const Logger = require('../logger');

/**
 * Sets up methods for different levels e.g. info, error on prototype of Logger
 */
Logger.setupMethods();

/**
 * Initializes default winston logger for console and file transports
 */
initializeLogger();

console.info('Test123', {a:4}, {b:{c:2}}, [1,2,3,3]);
console.error('Test123', {a:4}, {b:{c:2}}, [1,2,3,3], new Error('Testing Error!!!'));
