const knex = require('knex')(require('../knexfile'));

const TABLE = 'user';

const insert = (values) => {
	return knex.insert(values).into(TABLE);
};

// not in use
const getAll = () => {
	return knex(TABLE).select('id', 'email', 'name');
};

const getUserByMail = (email) => {
	return knex(TABLE).select('id', 'name', 'email', 'password').where({ email });
};

const getUserById = (id) => {
	return knex(TABLE).select('id', 'name', 'email').where({ id });
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
	getUserByMail,
	getUserById,
	update,
	deleteById
};
