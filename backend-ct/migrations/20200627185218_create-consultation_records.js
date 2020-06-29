
exports.up = function(knex) {
    return knex.schema
        .createTable('consultation_records', table => {
            table.increments('id').primary();
            table.string('clinic_name').notNullable();
            table.string('doctor_name').notNullable();
            table.string('patient_name').notNullable();
            table.text('diagnosis').notNullable();
            table.text('medication').notNullable();
            table.decimal('consultation_fee',10,2).notNullable();
            table.timestamp('created_at').notNullable();
            table.boolean('follow_up').notNullable();
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('consultation_records');
};
