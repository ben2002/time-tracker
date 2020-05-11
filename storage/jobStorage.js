const knex = require('knex')(require('../knexfile'));

const TABLE = 'taetigkeit';

const insert = (values) => {
	return knex.insert(values).into(TABLE);
};

const getAll = (user_id) => {
	return knex(TABLE).select('id', 'user_id', 'title', 'finished').where({ user_id });
};

const getJobById = (id) => {
	return knex(TABLE).select('*').where({ id });
};

const update = (id, values) => {
	return knex(TABLE).update(values).where({ id });
};

const deleteById = (id) => {
	return knex(TABLE).where({ id }).del();
};

module.exports = {
	insert,
	getAll,
	getJobById,
	update,
	deleteById
};
