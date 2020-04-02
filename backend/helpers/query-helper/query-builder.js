const squel = require('squel');
const _ = require('lodash');

const QueryExecutor = require('./query-executor');

class QueryBuilder {
    constructor (connection, table) {
        this.connection = connection;
        this.table = table;
        
        this.query = {};

        this.queryExecutor = new QueryExecutor(connection);

        QueryBuilder.initializeSquelConfig();
    }

    static initializeSquelConfig() {
        if (this._initialized)
            return;

        // Override squel flavor
        const driverType = 'mssql';
        const flavor = require('./flavor');
        squel.flavours[driverType] = flavor.getFlavor(squel);
        squel.useFlavour(driverType);

        //setting squel properties
        squel.cls.DefaultQueryBuilderOptions.autoQuoteTableNames = false;
        squel.cls.DefaultQueryBuilderOptions.autoQuoteFieldNames = false;
        squel.cls.DefaultQueryBuilderOptions.nameQuoteCharacter = '"';
        squel.cls.DefaultQueryBuilderOptions.tableAliasQuoteCharacter = '"';

        this._initialized = true;
    }

    static get () {
        return squel;
    }

    async execute () {
        const {text, values} = this.query.toParam();
        // TODO: Check for valid query object
        return await this.queryExecutor.execute(text, values);
    }

    static expr() {
        return squel.expr();
    }

    static case() {
        return squel.case();
    }

    set tableName(table) {
        this.table = table;
    }

    static getRandomInt(min, max) {
        return getRandomInt(min, max);
    }

    static sqlobj(field, noSplit) {
        return sqlobj(field, noSplit);
    }

    static escapeDoubleQuotes(field) {
        if (typeof field !== 'string')
            return field;
        return field.toString().replace(/"/g, '""');
    }

    static escapeAndQuote(field) {
        if (typeof field !== 'string')
            return field;

        const escapedValue = QueryHelper.escapeDoubleQuotes(field);
        return `"${escapedValue}"`;
    }

    static getQuotedFields(fields, noSplit) {
        return getQuotedFields(fields, noSplit);
    }

    static getQuotedFieldsArray(rowsOfFields) {
        return getQuotedFieldsArray(rowsOfFields);
    }

    static get Constraints() {
        return squel.Constraints;
    }

    select(alias) {
        this.query = squel
            .select({
                autoQuoteFieldNames: false,
                autoQuoteAliasNames: true
            });
        if (alias)
            this.query.from(this.table, alias);
        else
            this.query.from(this.table, null);

        return this;
    }

    from(table, alias) {
        this.query.from(table, alias);
        return this;
    }

    selectWhere(alias, whereClause) {
        this.select(alias);
        this.query.where(whereClause.condition, whereClause.parameter);

        return this;
    }

    join(table, alias, expression) {
        this.query.join(table, alias, expression, null);

        return this;
    }

    left_join(table, alias, expression) {
        this.query.left_join(table, alias, expression);

        return this;
    }

    cross_join(table, alias, expression, noLock) {
        this.query.cross_join(table, alias, expression, noLock);

        return this;
    }

    where(expression, parameter) {
        this.query.where(expression, parameter);

        return this;
    }

    field(expression, alias) {
        this.query = alias ? this.query.field(expression, alias) : this.query.field(expression);

        return this;
    }

    fields(fields) {
        fields.forEach((function (field) {
            this.query = this.query.field(sqlobj(field));
        }).bind(this));

        return this;
    }

    fieldsWithAlias(fields) {
        fields.forEach((function (field) {
            this.query = this.query.field(sqlobj(field.field), field.alias);
        }).bind(this));

        return this;
    }

    count() {
        this.query.field('count(*)', 'Count');

        return this;
    }

    distinct() {
        this.query.distinct();

        return this;
    }

    sortBy(sortField) {
        this.query = this.query.order(sortField);

        return this;
    }

    sortByWithDirection(sortField, direction) {
        this.query = this.query.order(sortField, direction);

        return this;
    }

    limit(limit) {
        this.query = this.query.top(limit);
        return this;
    }

    top(variableName) {
        this.query = this.query
            .top(variableName);
        return this;
    }

    offset(limit, offset) {
        this.query = this.query.offset(offset).limit(limit);

        return this;
    }

    insert(fields, outputFields) {
        this.query = squel
            .insert()
            .into(this.table)
            .setFields(fields);

        outputFields && (this.query = this.query.outputFields(outputFields));

        return this;
    }

    insertMany(rowsOfFields, outputFields, addQuotes) {
        if (addQuotes) {
            rowsOfFields = getQuotedFieldsArray(rowsOfFields);
        }
        this.query = squel
            .insert()
            .into(this.table)
            .setFieldsRows(rowsOfFields);

        outputFields && (this.query = this.query.outputFields(outputFields));

        return this;
    }

    bulkInsert(rowData, outputFields, addQuotes) {
        this.multipleQueries = [];
        const columns = Object.keys(rowData[0]).length;
        while (rowData.length > 0) {
            this.multipleQueries.push(this.insertMany(rowData.splice(0, 2000 / columns), outputFields, addQuotes).query.toParam());
        }
        return this;
    }

    updateWhere(fields, whereClause, outputFields) {
        this.query = squel
            .update()
            .table(this.table)
            .setFields(fields);

        if (whereClause) {
            this.query.where(whereClause.condition, whereClause.parameter);
        }

        outputFields && (this.query = this.query.outputFields(outputFields));

        return this;
    }

    update() {
        this.query = squel.update()
            .table(this.table);

        return this;
    }

    set(field, value) {
        if (value || value === null)
            this.query.set(field, value);
        else
            this.query.set(field);

        return this;
    }

    setFields(fields) {
        this.query = this.query.setFields(fields);
        return this;
    }

    removeWhere(whereClause, outputFields) {
        this.query = squel
            .delete()
            .from(this.table)
            .where(whereClause.condition, whereClause.parameter);

        outputFields && (this.query = this.query.outputFields(outputFields));
        return this;
    }

    remove() {
        this.query = squel
            .delete()
            .from(this.table);
        return this;
    }

    groupBy(groupByField) {
        this.query = this.query.group(groupByField);
        return this;
    }

    groupByFields(fields) {
        fields.forEach((function (field) {
            this.query = this.query.group(sqlobj(field));
        }).bind(this));

        return this;
    }

    toString() {
        return this.query.toString();
    }

    createTable() {
        this.query = squel
            .createTable();
        return this;
    }

    name(tableName) {
        this.query = squel
            .name(tableName);
        return this;
    }

    setColumns(columns) {
        this.query = squel
            .setColumns(columns);
        return this;
    }

    setConstraint(constraintField, constraintType) {
        this.query = squel
            .setConstraint(sqlobj(constraintField), constraintType);
        return this;
    }

    renameTable(oldTableName, newTableName) {
        this.query = squel
            .renameTable()
            .oldName(oldTableName)
            .newName(newTableName);

        return this;
    }

    clone() {
        const cloneQuery = new QueryBuilder(this.connection, this.table);
        cloneQuery.query = this.query.clone();
        return cloneQuery;
    }
}

function getRandomInt(min, max) {
    if (min && max)
        return Math.floor(Math.random() * (max - min + 1)) + min;
    return Math.floor(Math.random());
}

function sqlobj(field, noSplit) {
    if (field) {
        const _addQuoteToField = function (field) {
            // put quotes if there isn't any at the beginnig and at the end
            // put quotes if field is surrounded with [ or ] (used in fields like E-mail) by replacing them
            if (field === '*') {
                return field;
            }
            if (field[0] !== '"')
                if (field[0] === '[')
                    field = '"' + field.substring(1);
                else
                    field = '"' + field;

            const fieldLength = field.length;

            if (field[fieldLength - 1] !== '"')
                if (field[fieldLength - 1] === ']')
                    field = field.substring(0, fieldLength - 1) + '"';
                else
                    field = field + '"';
            return field;
        }

        if (field.indexOf('.') > -1 && !noSplit) {
            let fields = field.split('.');
            fields = fields.map(f => _addQuoteToField(f));
            return fields.join('.');
        } else {
            return _addQuoteToField(field);
        }
    }
    return field;
}

module.exports = QueryBuilder;
