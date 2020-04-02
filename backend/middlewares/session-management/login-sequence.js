const path = require('path');
const fs = require('fs');

const passport = require('passport');
const ExpressBrute = require('express-brute');
const store = new ExpressBrute.MemoryStore();

const bruteforce = new ExpressBrute(store, {
    freeRetries: 5,
    proxyDepth: 0,
    minWait: 1 * 60 * 1000, // 1 MINUTE
    maxWait: 60 * 60 * 1000, // 1 HOUR
    lifetime: 60 * 60 * 1000
});

function loginSequence(app) {
    app.all('/auth/login',
        preloginCheck,
        bruteforceCheck,
        autoLoginCheck,
        (req, res, next) => {
            // Authenticate 'local' will internally call Local strategy of passport
            passport.authenticate('local',
                /**
                 * Authenticate callback
                 * If authentication failed, user will be set to false.
                 * If an exception occurred, error will be set.
                 * An optional info argument will be passed which
                 * contains additional details provided by the strategy's verify callback.
                 */
                function(error, user, info) {
                    console.log('Passport authenticate callback...');
                    if (error) {
                        info = error;
                    }

                    if (info) {
                        if (!info.message) {
                            info.message = 'No error message';
                        }
                        console.error('Passport authenticate callback - error ', info);
                        return res.render('login', {
                            error: info
                        });
                    }

                    // It will call Serialize user 
                    req.logIn(user, function(error) {
                        if (error) {
                            console.error('Passport authenticate callback - Request logIn failed', error);
                            return next(error);
                        }
            
                        if (req.brute) {
                            console.log('Passport authenticate callback - Resetting brute force for logged in user...');
                            req.brute.reset();
                        }

                        // Check for Redirection url in cookie if any then redirect to url...
                        res.redirect('/');

                        // if (user.client) {
                        //     var cookieValue = user.client + '-' + user.ID;
                        //     console.info('passport: authenticate - setting cookies', _debugFunction(global._TraceStarted, req, conn, this, self));
                        //     var options = {
                        //         httpOnly: true,
                        //         secure: false
                        //     };
                        //     if (userFunctions.isSecure(req, true)) {
                        //         options.secure = true;
                        //     }
                        //     const config = dbr.clients().getClientConfig(req.user.client);
                        //     if (config.otherConfigurations && config.otherConfigurations.SessionTimeout) {
                        //         req.session.cookie.maxAge = (config.otherConfigurations.SessionTimeout) * 1000;
                        //     }
                        //     res.cookie('sofyhash', cookieValue, options);
            
                        //     if (req.cookies.redirectURL) {
                        //         var redirectURL = req.cookies.redirectURL;
                        //         res.clearCookie('redirectURL');
                        //         res.redirect(redirectURL);
                        //     } else {
                        //         res.redirect(app.get('routePrefix') + '/');
                        //     }
            
                    });
            })(req, res, next);
        }
    );

    /**
     * Middleware for Bruteforce check to prevent too many attempts for the same username
     * 
     * To prevent check for bruteforce and allow user for any number of attempts
     * bruteforce.prevent(req, res, next);
     */
    function bruteforceCheck (req, res, next) {
        bruteforce.getMiddleware({
            key: function(req, res, next) {
                next(req.body.Username);
            }
        })(req, res, next);
    }
    
    /**
     * Middleware for Pre-login check like Blocked IPs...
     */
    function preloginCheck (req, res, next) {
        next();
    }

    /**
     * Middleware for auto-login check and setting username and password in request
     * Only for development platform
     */
    function autoLoginCheck (req, res, next) {
        if (app.AUTOLOGIN) {
            console.log('Auto-login is on.');
            const file = path.join(__dirname, '../config/auto-login');
            if (fs.existsSync(file + '.js')) {
                console.log('Auto-login file found. Using credentials from there...');
                const login = require(file);
                req.body.Username = login.Username;
                req.body.Password = login.Password;
            } else {
                console.log('Auto-login file not found! Continue with regular login flow...');
            }
        }
        next();
    }
}

module.exports = loginSequence;
