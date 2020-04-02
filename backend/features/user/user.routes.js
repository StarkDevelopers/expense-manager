const Joi = require('joi');

const API = require('../../base/API');
const UserController = require('./user.controller');

const createUserApi = {
    path: '',
    verb: 'POST',
    handler: {
        controller: UserController,
        method: 'create',
        methodArguments: ['request:body']
    },
    middlewares: {
        // authorization: 'admin:user:create',
        // decryption: 'Username,Name,Password,Email',
        // subscription: 'Free'
    },
    request: {
        body: {
            Username: Joi.string().required(),
            Name: Joi.string().required(),
            Password: Joi.string().regex(/^.*[a-z]+.*$/)
                .regex(/^.*[A-Z]+.*$/)
                .regex(/^.*[0-9]+.*$/)
                .regex(/^.*\W+.*$/)
                .required(),
            Email: Joi.string().email().required()
        }
    }
}

const updateUserApi = {
    path: '/:id',
    verb: 'PUT',
    handler: {
        controller: UserController,
        method: 'update',
        methodArguments: ['request:body', ':id']
    },
    middlewares: {
        // authorization: 'admin:user:create',
        // decryption: 'Username,Name,Password,Email',
        // subscription: 'Free'
    },
    request: {
        body: {
            Username: Joi.string().required(),
            Name: Joi.string().required(),
            Password: Joi.string().regex(/^.*[a-z]+.*$/)
                .regex(/^.*[A-Z]+.*$/)
                .regex(/^.*[0-9]+.*$/)
                .regex(/^.*\W+.*$/)
                .optional(),
            Email: Joi.string().email().required()
        },
        params: {
            id: Joi.number().required()
        }
    }
}

const listUsersApi = {
    path: '',
    verb: 'GET',
    handler: {
        controller: UserController,
        method: 'list',
        methodArguments: ['request:query']
    },
    middlewares: {},
    request: {
        query: {
            filter: Joi.string().allow('', null).optional(),
            sortBy: Joi.string().allow('', null).optional(),
            sortType: Joi.string().allow('', null).optional(),
            pageIndex: Joi.number().optional(),
            pageSize: Joi.number().optional()
        }
    }
}

const getUsersApi = {
    path: '/:id',
    verb: 'GET',
    handler: {
        controller: UserController,
        method: 'get',
        methodArguments: [':id']
    },
    middlewares: {},
    request: {
        params: {
            id: Joi.string().required()
        }
    }
}

const deleteUsersApi = {
    path: '/:id/:username',
    verb: 'DELETE',
    handler: {
        controller: UserController,
        method: 'delete',
        methodArguments: [':id', ':username']
    },
    middlewares: {},
    request: {
        params: {
            id: Joi.string().required(),
            username: Joi.string().required()
        }
    }
}

const userEndpoints = [
    createUserApi,
    listUsersApi,
    updateUserApi,
    getUsersApi,
    deleteUsersApi
];

module.exports = new API('User', '/api/user', userEndpoints);
