const BaseService = require('../../base/BaseService');
const UserRepository = require('./user.repository');
const TABLES = require('../../base/Tables');
const connectionPool = require('../../helpers/db-helper/connection-pool');
const CustomError = require('../../base/CustomError');

class UserService extends BaseService {
    constructor (context, logger) {
        super(context, logger);
        this.user = this.context.user;

        this.userRepository = new UserRepository(context, logger, TABLES.USER);
    }

    async create (user) {
        await this.userRepository.createSystemUser(user);
        delete user.Password;

        return await this.userRepository.create(user);
    }

    async update (user, id) {
        if (user.Username === this.user.Username) {
            throw CustomError.create(CustomError.Conflict, 'Cannot update current logged in user');
        }
        if (user.Password) {
            await this.userRepository.updateSystemUser(user);
            delete user.Password;
            if (this.user && this.user.Username && this.user.Domain && this.user.Server) {
                const connectionKey = connectionPool.generateKey(this.user.Server,
                    this.user.Username,
                    this.user.Domain);
                connectionPool.unregister(connectionKey);
            }
        }
        delete user.Username;

        return await this.userRepository.update(user, id);
    }

    async list (query) {
        return await this.userRepository.list(query);
    }

    async get (id) {
        return await this.userRepository.get(id);
    }

    async delete (id, username) {
        if (username === this.user.Username) {
            throw CustomError.create(CustomError.Conflict, 'Cannot delete current logged in user');
        }
        await this.userRepository.deleteSystemUser(username);

        return await this.userRepository.delete(id);
    }
}

module.exports = UserService;
