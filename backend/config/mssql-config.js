/**
 * For more config options: https://github.com/coopernurse/node-pool
 */

module.exports = (server, username, password, database = 'master', port = 1433) => {
    return {
        user: username,
        password: password,
        server: server,
        database: database,
        requestTimeout: 200000,
        connectionTimeout: 20000,
        port: port,
        pool: {
            max: 15,
            min: 1,
            acquireTimeoutMillis: 30000
        }
    }
}