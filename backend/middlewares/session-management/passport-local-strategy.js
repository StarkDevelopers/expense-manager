const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const userFunctions = require('../../utils/users/userFunctions');

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
        const database = process.env.MONGODB_DATABASE;

        // Server
        const server = process.env.MONGODB_SERVER;

        userFunctions.login(server, username, password, database, done);
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
