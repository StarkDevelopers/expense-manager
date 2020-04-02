const APIContext = require('./APIContext');
const QueryBuilder = require('../helpers/query-helper/query-builder');

class BaseRepository {
    /**
     * @param {APIContext} context 
     */
    constructor (context, logger, feature) {
        this.context = context;

        this.logger = logger;

        this.feature = feature;
    }

    async create (object) {
        let query = new QueryBuilder(this.context.connection, this.feature);

        query = query.insert(object);

        return await query.execute();
    }

    async update (object, id) {
        let query = new QueryBuilder(this.context.connection, this.feature);

        query = query.update()
            .setFields(object)
            .where('Id = ?', id);

        return await query.execute();
    }

    async list (options) {
        let query = new QueryBuilder(this.context.connection, this.feature)
            .select();

        if (options.filter) {
            query = query.where('UserName like ?', `%${options.filter}%`);
        }
        if (options.sortBy) {
            const direction = options.sortType ? options.sortType : 'ASC';
            query = query.sortByWithDirection(options.sortBy, direction);
        }
        if (options.pageIndex && options.pageSize && !options.sortBy) {
            query = query.sortBy('(SELECT null)');
            query = query.offset(options.pageSize, options.pageIndex * options.pageSize);
        } else if (options.pageIndex && options.pageSize) {
            query = query.offset(options.pageSize, options.pageIndex * options.pageSize);
        } else if (options.pageSize) {
            query = query.limit(options.pageSize);
        }

        const items = await query.execute();

        let total = await new QueryBuilder(this.context.connection, this.feature)
            .select()
            .count()
            .execute();

        if (total && total.length > 0 && total[0].Count) {
            total = total[0].Count;
        } else {
            // Change it to show appropriate message
            total = 0;
        }

        return {
            items,
            total
        };
    }

    async get (id) {
        let query = new QueryBuilder(this.context.connection, this.feature)
            .select()
            .where('Id = ?', id);

        const users = await query.execute();

        return users[0];
    }

    async delete (id) {
        let query = new QueryBuilder(this.context.connection, this.feature)
            .removeWhere({
                condition: 'Id = ?',
                parameter: id
            })

        return await query.execute();
    }
}

module.exports = BaseRepository;
