const dbConnection = require('../../helpers/db-helper/db-connection');
const QueryBuilder = require('../../helpers/query-helper/query-builder');
const buildConfig = require('../../config/mssql-config');
const TABLES = require('../../base/Tables');

async function login(server, username, password, domain, done) {
    let connection;

    // Tries to make connection using login credentials
    try {
        const config = buildConfig(server, username, password, domain);

        connection = await dbConnection.makeConnection(config);
    } catch (error) {
        console.error('Error while logging in user');
        console.error('User', username);
        console.error('Domain', domain);
        console.error('Server', server);
        console.error('Error=> ', error);

        return done(null, false, { message: `Login failed for user ${username}` });
    }

    let user;
    try {
        user = await getUser(connection, username);
        user.Domain = domain;
        user.Server = server;
    } catch (error) {
        console.error('Error while fetching user detail');
        console.error('User', username);
        console.error('Domain', domain);
        console.error('Server', server);
        console.error('Error=> ', error);

        return done(null, false, { message: `Login failed for user ${username}` });
    }

    /**
     * Closes the connection we have used for login purpose
     */
    connection.close();

    /**
     * Makes connection and registers in connection pool for current user
     */
    await dbConnection.getConnection(server, username, password, domain);

    return done(null, user);
}

async function getUser(connection, username) {
    let query = new QueryBuilder(connection, TABLES.USER);

    query = query.select()
        .where('Username = ?', username);

    const user = await query.execute();

    if (!user || user.length === 0) {
        throw new Error('User not found');
    }

    console.log('Logged in user detail ', user[0]);

    return user[0];
}

function serializeUser(user) {
    return {
        Id: user.Id,
        Username: user.Username,
        Name: user.Name,
        Domain: user.Domain,
        Server: user.Server
    };
}

module.exports = {
    login,
    serializeUser
};
