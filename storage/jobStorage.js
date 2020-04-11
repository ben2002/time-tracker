const knex = require('knex')(require('../knexfile'));

const TABLE = 'taetigkeit';

const insert = (values) => {
	return knex.insert(values).into(TABLE);
};

const getAll = (user_id) => {
	return knex(TABLE).select('id', 'user_id', 'title').where({ user_id });
};

// not in use
const update = (id, values) => {
	return knex(TABLE).update(values).where({ id });
};

// not in use
const deleteById = (id) => {
	return knex(TABLE).where({ id }).del();
};

module.exports = {
	insert,
	getAll,
	update,
	deleteById
};
