let connections;

class ConnectionPool {
    constructor() {
        connections = [];
    }

    get (key) {
        if (key && connections[key]) {
            return connections[key];
        }

        return null;
    }

    register (key, connection) {
        if (key && connection && connection._connected && connection.connected) {
            connections[key] = connection;
        }
    }

    unregister (key) {
        if (key && connections[key]) {
            connections[key] = null;
        }
    }

    generateKey (server, username, domain) {
        return domain ? `${username}@${server}|${domain}` : `${username}@${server}`;
    }
}

module.exports = new ConnectionPool();