const BaseController = require('../../base/BaseController');
const UserService = require('./user.service');
const Constants = require('../../base/Constants');

class UserController extends BaseController {
    constructor (context, logger, feature) {
        super(context, logger, feature);

        this.userService = new UserService(context, logger);
    }

    async create (user) {
        await this.userService.create(user);

        this.respondOk({
            message: Constants.createMessage(this.feature)
        });
    }

    async update (user, id) {
        await this.userService.update(user, id);

        this.respondOk({
            message: Constants.updateMessage(this.feature)
        });
    }

    async list (query) {
        const users = await this.userService.list(query);

        this.respondOk(users);
    }

    async get (id) {
        const user = await this.userService.get(id);

        this.respondOk(user);
    }

    async delete (id, username) {
        await this.userService.delete(id, username);

        this.respondOk({
            message: Constants.deleteMessage(this.feature)
        });
    }
}

module.exports = UserController;
