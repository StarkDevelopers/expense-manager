const winstonWriters = new Map();

class LoggerRepository {
    constructor () {}

    static getDefault () {
        return winstonWriters.get('DEFAULT');
    }

    static setDefault (writer) {
        return winstonWriters.set('DEFAULT', writer);
    }

    static set (traceId, writer) {
        return winstonWriters.set(traceId, writer);
    }

    static get (traceId) {
        return winstonWriters.get(traceId);
    }

    static delete (traceId) {
        return winstonWriters.delete(traceId);
    }

    static getByPattern (traceId) {
        const writers = [];

        for (let key of winstonWriters.keys()) {
            if (key.indexOf(traceId) === 0) {
                writers.push(winstonWriters.get(traceId));
            }
        }

        return writers;
    }
}

module.exports = LoggerRepository;
