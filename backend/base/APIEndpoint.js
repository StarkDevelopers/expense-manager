class APIEndpoint {
    constructor (endpoint = {}) {
        this.path = endpoint.path || '';

        this.verb = endpoint.verb || 'get';

        this.handler = endpoint.handler || {};

        this.middlewares = endpoint.middlewares || {};

        this.request = endpoint.request || {};

        this.response = endpoint.response || {};
    }
}

module.exports = APIEndpoint;
