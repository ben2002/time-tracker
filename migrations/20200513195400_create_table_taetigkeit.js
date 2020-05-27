exports.up = function (knex) {
	return knex.schema.createTable('taetigkeit', function (table) {
		table.increments('id').primary();
		table.integer('user_id').unsigned().notNullable();
		table.string('title').notNullable();
		table.boolean('finished').notNullable().defaultTo(0);

		table.foreign('user_id').references('user.id').onDelete('cascade');
	});
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('taetigkeit');
};
