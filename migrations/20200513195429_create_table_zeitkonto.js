exports.up = function (knex) {
	return knex.schema.createTable('zeitkonto', function (table) {
		table.increments('id').primary();
		table.integer('job_id').unsigned().notNullable();
		table.integer('user_id').unsigned().notNullable();
		table.timestamp('from').notNullable();
		table.timestamp('to').nullable();
		table.integer('duration').nullable();
		table.integer('comment').nullable();

		table.foreign('job_id').references('taetigkeit.id').onDelete('cascade');
		table.foreign('user_id').references('user.id').onDelete('cascade');
		//table.foreign('job_id').references('id').inTable('taetigkeit');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('zeitkonto');
};
