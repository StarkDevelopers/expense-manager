class APIContext {
    constructor (request, connection) {
        this.request = request;

        this.response = request.res;

        this.connection = connection;

        this.user = request.user;

        this.session = request.session;
    }
}

module.exports = APIContext;
