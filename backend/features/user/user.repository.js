const BaseRepository = require('../../base/BaseRepository');
const QueryExecutor = require('../../helpers/query-helper/query-executor');

class UserRepository extends BaseRepository {
    constructor (context, logger, feature) {
        super(context, logger, feature);

        this.queryExecutor = new QueryExecutor(context.connection);
    }

    async createSystemUser(user) {
        const query = `CREATE USER ${user.Username} WITH PASSWORD = '${user.Password}';
            exec sp_addrolemember 'db_owner','${user.Username}'`;
        return await this.queryExecutor.execute(query, []);
    }

    async updateSystemUser(user) {
        const query = `ALTER USER ${user.Username} WITH PASSWORD = '${user.Password}';
            exec sp_addrolemember 'db_owner','${user.Username}'`;
        return await this.queryExecutor.execute(query, []);
    }

    async deleteSystemUser(username) {
        const query = `DROP USER IF EXISTS ${username}`;
        return await this.queryExecutor.execute(query, []);
    }
}

module.exports = UserRepository;
