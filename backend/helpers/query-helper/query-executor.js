const { isNumber } = require('util');
const sql = require('mssql');

const _ = require('../../utils/common/underscore');

const PARAM_REGEX = /(=|in|<|>|like|between|values|,\s?|object_id)(\s)*(\(?)[?]/i;
const PARAM_REPLACEMENT = '$1$2$3';

const __QueryParamTypes = {
    INT: 'INT',
    FLOAT: 'FLOAT',
    DECIMAL: 'DECIMAL'
};

class QueryExecutor {
    constructor (connection) {
        this.connection = connection;
    }

    async execute (text, params) {
        try {
            const query = _replaceQueryParameters(text, params);
            const request = new sql.Request(this.connection);
            const response = await request.query(query);

            const recordset = response.recordsets[0];
            const result = _transformQueryResult(recordset, true);
            return result;
        } catch (exception) {
            throw exception;
        }
    }
}

function _replaceQueryParameters (query, params) {
    if (!Array.isArray(params)) {
        console.error("_replaceQueryParameters: unexpected non param array", params);
        return query;
    }

    const now = new Date().getTime();
    const questionMarkIdentifier = `~~QuestionMark_${now}~~`;
    const questionMarkIdentifierRegex = new RegExp(questionMarkIdentifier, 'g');

    for (var k = 0; k < params.length; k++) {
        var param = params[k];

        if (param === null || param === undefined) {
            query = query.replace(PARAM_REGEX, PARAM_REPLACEMENT + 'null');
            continue;
        }

        if (isNumber(param)) {
            const parsedParam = getNumberTypeFromRange(param) === __QueryParamTypes.INT ? parseInt(param) : parseFloat(param);
            query = query.replace(PARAM_REGEX, PARAM_REPLACEMENT + parsedParam);
            continue;
        }

        query = query.replace(PARAM_REGEX, PARAM_REPLACEMENT + "'" + escapeValues(param, questionMarkIdentifier) + "'");
    }

    query = query.replace(questionMarkIdentifierRegex, '\?');

    return query;
}

function getNumberTypeFromRange(param) {
    if (param % 1 === 0) {
        // check for decimal numbers
        if (param < -2147483648 || param > 2147483647) {
            return __QueryParamTypes.DECIMAL;
        } else {
            return __QueryParamTypes.INT;
        }
    } else {
        return __QueryParamTypes.FLOAT;
    }
}

function escapeValues(valueString, questionMarkIdentifier) {
    if (!valueString)
        return '';

    return String(valueString).replace(/'/g, '\'\'').replace(/\?/g, questionMarkIdentifier);
}

function _transformQueryResult(recordset, handleResult) {
    var results = {};

    if (handleResult === true) {
        return returnRecordsFromRecordset(recordset);
    }

    results.rows = [];
    if (recordset !== undefined) {
        let k;
        for (let p = 0; p < recordset.length; p++) {
            let r = [];
            for (k in recordset[p]) {
                r.push(recordset[p][k]);
            }
            results.rows.push(r);
        }
        results.meta = [];
        for (k in recordset.columns) {
            results.meta.push(recordset.columns[k]);
        }
    }

    return results;
}

function returnRecordsFromRecordset(recordset) {
    if (!recordset) {
        return [];
    }

    if (_.isArray(recordset)) {
        return recordset;
    } else {
        return [recordset]
    }
}

module.exports = QueryExecutor;
