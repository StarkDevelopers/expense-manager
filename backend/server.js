// Environment Context
const CONTEXT = process.env.NODE_ENV || 'DEVELOPMENT';
console.log('PROGRAM CONTEXT', CONTEXT);

// Built-in modules
const path = require('path');

// Initialize Environment Variables
require('dotenv').config();

// 3rd party modules
const express = require('express');
const bodyParser = require('body-parser');

// Project modules
const initializeSession = require('./middlewares/session-management/session-initialize');
const initializeCSRFToken = require('./middlewares/csrf-management/csrf-token');
const signupSequence = require('./middlewares/session-management/signup-sequence');
const loginSequence = require('./middlewares/session-management/login-sequence');
const logoutSequence = require('./middlewares/session-management/logout-sequence');
const {
    serveEJSTemplates,
    frontendResources,
    staticResourcesFromUtility
} = require('./middlewares/static-resource-management/static-resource');
const registerRoutes = require('./middlewares/route-management/register-routes');
const printRoutes = require('./middlewares/route-management/print-routes');
const {
    customErrorHandler,
    csrfTokenErrorHandler
} = require('./middlewares/error-handler/custom-error-handler');
const initializeLogger = require('./base/logger/index');
const Logger = require('./base/logger/logger');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cookie-parser')());

/**
 * Sets up methods for different levels e.g. info, error on prototype of Logger
 */
Logger.setupMethods();

/**
 * Seriveg EJS templates from views/ directory
 */
serveEJSTemplates(app);

/**
 * Initializes default winston logger for console and file transports
 * Overrides console methods with Winston transporter for Console
 */
initializeLogger();

/**
 * Initializes express-session with redis store/memory store based on CONTEXT
 * Initialized passport and passport-session
 * As well defines passport local-strategy for login
 */
initializeSession(app);

/**
 * Sets CSRF token in responses
 * Checks CSRF token in incoming requests
 */
initializeCSRFToken(app);

/**
 * Sign up users with email verification
 * Redirects to / or requested page
 */
signupSequence(app);

/**
 * Logs in user with passport local-strategy
 * Redirects to / or requested page
 */
loginSequence(app);

/**
 * Destroys user session from request
 * Logs out user
 * Redirects back to /
 */
logoutSequence(app);

/**
 * Login not required to access these resources
 */
staticResourcesFromUtility(app, __dirname);

/**
 * app.use(/) => This middleware will be called for all the requests on this server
 * So user needs to be logged in to access all the resources/APIs from here on
 */
app.use('/', (req, res, next) => {
    if (!req.isAuthenticated()) {
        const redirectUrl = req.url;
        res.render('login', { redirectUrl });
    } else {
        next();
    }
});

/**
 * Registers routes related to features API
 */
registerRoutes(app, __dirname);

/**
 * Print out all the registered routes
 */
printRoutes(app);

/**
 * Login will be required to access these resources
 */
frontendResources(app, __dirname);

/**
 * Handles invalid CSRF token error
 */
app.use(csrfTokenErrorHandler());

/**
 * Handles error occured in Express routes/middleware
 * or if next is called with error(object)
 */
app.use(customErrorHandler());

/**
 * Uncaught Exception
 * For more information: https://nodejs.org/api/process.html#process_event_uncaughtexception
 */
process.on('uncaughtException', (error) => {
    /**
     * Try your execution does not enter into this piece of code
     */
    console.error('Uncaught Exception Caught \n', error);
    // Handle error here
});

/**
 * Unhandled Rejection
 * For more information: https://nodejs.org/api/process.html#process_event_unhandledrejection
 */
process.on('unhandledRejection', (reason, p) => {
    /**
     * Try your execution does not enter into this piece of code
     */
    console.log('Unhandled Rejection at:', p, ' with reason:', reason);
    // Application specific logging, throwing an error, or other logic here
});

/**
 * Exit Process
 * For more information: https://nodejs.org/api/process.html#process_event_exit
 */
process.on('exit', (code) => {
    console.log(`Process is about to exit with code: ${code}`);
});

app.listen(8080, () => console.log('App listening on port 8080!'));
