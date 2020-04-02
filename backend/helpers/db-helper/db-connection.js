const sql = require('mssql');

const connectionPool = require('./connection-pool');
const buildConfig = require('../../config/mssql-config');

const domains = require('../../config/domains');

class DBConnection {
    constructor () {}

    async getConnection (server, username, password, database, port) {
        const connectionKey = connectionPool.generateKey(server, username, database);

        let connection = connectionPool.get(connectionKey);

        if (connection && connection._connected && connection.connected) {
            return connection;
        }

        const config = buildConfig(server, username, password, database, port);

        connection = await this.makeConnection(config);

        connectionPool.register(connectionKey, connection);

        return connection;
    }

    makeConnection (config) {
        return new Promise(async (resolve, reject) => {
            const pool = new sql.ConnectionPool(config);
        
            pool.on('error', error => {
                console.error('Error occured in pool with Config=> ', config, '\nError=> ', error);
            });
        
            try {
                await pool.connect();
            } catch (error) {
                console.error('Error while creating connection', error);
                return reject(error);
            }
        
            resolve(pool);
        }); 
    }

    async getUserConnection (request) {
        const username = request.user.Username;
        const domain = request.user.Domain;

        const {server} = domains[domain];

        const connectionKey = connectionPool.generateKey(server, username, domain);

        let connection = connectionPool.get(connectionKey);

        if (connection) {
            return connection;
        }

        const {admin, password} = domains[domain];

        return await this.getConnection(
            server,
            admin,
            password,
            domain
        );
    }

    removeConnection(server, username, database) {
        const connectionKey = connectionPool.generateKey(server, username, database);

        connectionPool.unregister(connectionKey);
    }
}

module.exports = new DBConnection();
