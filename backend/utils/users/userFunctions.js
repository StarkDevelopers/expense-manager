const dbConnection = require('../../helpers/db-helper/db-connection');
const buildConfig = require('../../config/mongodb-config');
const TABLES = require('../../base/Tables');

async function login(server, username, password, database, done) {
    let connection;

    // Tries to make connection using login credentials
    try {
        const config = buildConfig(server, username, password, database);

        connection = await dbConnection.makeConnection(config);
    } catch (error) {
        console.error('Error while logging in user');
        console.error('User', username);
        console.error('Database', database);
        console.error('Server', server);
        console.error('Error=> ', error);

        return done(null, false, { message: `Login failed for user ${username}` });
    }

    let user = {
        Username: username,
        Database: database,
        Server: server
    };

    /**
     * Closes the connection we have used for login purpose
     */
    connection.close();

    /**
     * Makes connection and registers in connection pool for current user
     */
    await dbConnection.getConnection(server, username, password, database);

    return done(null, user);
}

function serializeUser(user) {
    return {
        Id: user.Id,
        Username: user.Username,
        Name: user.Name,
        Database: user.Database,
        Server: user.Server
    };
}

module.exports = {
    login,
    serializeUser
};
