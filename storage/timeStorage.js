const knex = require('knex')(require('../knexfile'));

const TABLE = 'zeitkonto';

const insert = (values) => {
	return knex.insert(values).into(TABLE);
};

const update = (id, values) => {
	return knex(TABLE).update(values).where({ id });
};

const selectMaxId = (user_id) => {
	return knex(TABLE).where({ user_id }).max('id', { as: 'id' });
};

const getById = (id) => {
	return knex(TABLE).select('from').where({ id });
};

const getAll = (job_id) => {
	return knex(TABLE).select('id', 'job_id', 'from', 'to', 'duration', 'comment').where({ job_id });
};

const getTotalTimePerJob = (job_id) => {
	// get times with the same job-id and make the sum of duration
	return knex(TABLE).sum('duration').where({ job_id });
};

const deleteById = (id) => {
	return knex(TABLE).where({ id }).del();
};

module.exports = {
	insert,
	update,
	selectMaxId,
	getById,
	getAll,
	deleteById,
	getTotalTimePerJob
};
