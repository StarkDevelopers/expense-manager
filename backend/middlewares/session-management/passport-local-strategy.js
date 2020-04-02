const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userFunctions = require('../../utils/users/userFunctions');
const domains = require('../../config/domains');

/**
 * Defining passport local strategy for Authenticating user at the time of login
 * Whenever passport.authenticate('local') will be invoked this strategy will be executed
 */
function passportLocalStrategy () {
    passport.use(new LocalStrategy({
        usernameField: 'Username',
        passwordField: 'Password',
        passReqToCallback: true
    }, (req, username, password, done) => {
        // Database
        const domain = username.split('@')[1]; // 'Test3012';

        // Server
        const server = domains[domain] ? domains[domain].server : '';

        username = username.split('@')[0];

        userFunctions.login(server, username, password, domain, done);
    }));

    /**
     * This middleware will be called when req.logIn is called
     */
    passport.serializeUser((user, done) => {
        done(null, userFunctions.serializeUser(user));
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = passportLocalStrategy;
