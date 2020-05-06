const MongoClient = require('mongodb').MongoClient;

const connectionPool = require('./connection-pool');
const buildConfig = require('../../config/mongodb-config');

class DBConnection {
    constructor () {}

    async getConnection (server, username, password, database, port) {
        const connectionKey = connectionPool.generateKey(username);

        let connection = connectionPool.get(connectionKey);

        if (connection && connection.isConnected()) {
            return connection;
        }

        const config = buildConfig(server, username, password, database, port);

        connection = await this.makeConnection(config);

        connectionPool.register(connectionKey, connection);

        return connection;
    }

    async makeConnection (config) {
        const client = new MongoClient(...config);
        try {
            return await client.connect();
        } catch (exception) {
            throw exception;
        }
    }

    async getUserConnection (request) {
        const username = request.user.Username;
        const database = request.user.Database;

        const server = process.env.MONGODB_SERVER;

        const connectionKey = connectionPool.generateKey(username);

        let connection = connectionPool.get(connectionKey);

        if (connection && connection.isConnected()) {
            return connection;
        }

        const { admin, password } = {
            admin: process.env.MONGODB_DATABASE_ADMIN,
            password: process.env.MONGODB_DATABASE_ADMIN_PASSWORD
        };

        return await this.getConnection(
            server,
            admin,
            password,
            database
        );
    }

    removeConnection(server, username, database) {
        const connectionKey = connectionPool.generateKey(server, username, database);

        connectionPool.unregister(connectionKey);
    }
}

module.exports = new DBConnection();
