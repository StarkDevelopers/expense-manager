
const APIEndpoint = require('./APIEndpoint');
const ControllerFactory = require('./ControllerFactory');
const MiddlewareFactory = require('./MiddlewareFactory');

const trim = (value) => String(value).replace(new RegExp(`^/*(.*?)/*$`), '$1');

class API {
    /**
     * API Registration to Express routes
     * @param {string} name name of the feature
     * @param {string} parentPath parent path for the API of same feature
     * @param {Object} endPoints Array containing information regarding routes
     */
    constructor (name, parentPath = '', endPoints = []) {
        this.name = name;
        this.parentPath = trim(parentPath);
        this.endPoints = [];

        if (Array.isArray(endPoints)) {
            endPoints.forEach((endPoint) => {
                this.endPoints.push(new APIEndpoint(endPoint));
            });
        } else {
            // throw an error
        }

        this.factories = {};
    }

    register (app) {
        this.endPoints.forEach((endPoint) => {
            this.registerEndPoint(app, endPoint);
        });
    }

    registerEndPoint (app, endPoint) {
        const path = trim(endPoint.path);

        const route = `/${this.parentPath}/${path}`;

        const verb = endPoint.verb.toLowerCase();

        const routeArguments = [route];

        const { controller, method, methodArguments } = endPoint.handler;

        const factory = this.factories[controller.name] ||
            (this.factories[controller.name] = new ControllerFactory(controller));

        const middleware = endPoint.middlewares;

        middleware.validation = [endPoint.request];

        const middlewares = Object.keys(middleware).map((id) => {
            let args = middleware[id];
            if (!Array.isArray(args)) {
                args = [args];
            }
            return MiddlewareFactory.create(id, args);
        }).sort((a, b) => {
            return b.priority > a.priority;
        });

        for (let middlewareObject of middlewares) {
            routeArguments.push(MiddlewareFactory.wrapMiddleware(middlewareObject));
        }

        routeArguments.push(factory.create(method, ...methodArguments));

        app[verb].apply(app, routeArguments);
    }
}

module.exports = API;
