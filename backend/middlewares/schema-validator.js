const Joi = require('joi');

const _ = require('../utils/common/underscore');

async function validator (schema, req, res, next) {
    try {
        const data = _extractor(req, schema);
        const validatedData = await Joi.validate(data, schema, { stripUnknown: {objects: true} });
        _assigner(validatedData, req);

        next();
    } catch (error) {
        // Throw Invalid Schema Error
        let message;
        if (error.details && error.details.length > 0) {
            message = error.details[0].message && error.details[0].message.length < 60 ?
                error.details[0].message :
                error.details[0].path[0] + ' is invalid';
        } else {
            message = error;
        }
        next(message);
    }
}

function _extractor(req, schema) {
    const data = {};
    for (let property of ['params', 'body', 'query']) {
        //checking in req.body first if there is no body then
        //check in schema also if there is body in schema then add empty body object
        if (!_.isEmpty(req[property])) {
            data[property] = req[property];
        } else if (schema[property]) {
            data[property] = {};
        }
    }
    return data;
}

function _assigner({ body, query, params }, req) {
    if (body) {
        req.body = body;
    }
    if (query) {
        req.query = query;
    }
    if (params) {
        req.params = params;
    }
}

module.exports = (schema) => (req, res, next) => validator(schema, req, res, next);
