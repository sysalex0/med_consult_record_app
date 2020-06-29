
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id').primary();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.string('clinic_name').notNullable().unique();
            table.string('phone_number',8).notNullable().unique();
            table.text('address').notNullable();
            table.timestamp('created_at').notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('users');
};
