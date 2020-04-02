const middlewares = {};

const PRIORITY = {
    low: 0,
    medium: 1,
    high: 2
}

class MiddlewareFactory {
    constructor () {}

    static register (id, middleware, priority) {
        middlewares[id] = {
            middleware,
            priority
        }
    }

    static create (id, args) {
        if (middlewares[id] === undefined) {
            // throw an error
        }

        return {
            handler: middlewares[id].middleware,
            priority: middlewares[id].priority,
            args
        }
    }

    static wrapMiddleware({handler, args}) {
        return async (req, res, next) => {
            if (res.headersSent) {
                return;
            }
            try {
                handler(...args)(req, res, next);
            } catch (err) {
                // Throw an error...
            }
        };
    }
}

MiddlewareFactory.register('validation', require('../middlewares/schema-validator'), PRIORITY.high);

module.exports = MiddlewareFactory;
