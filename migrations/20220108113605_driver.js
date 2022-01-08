const name = 'driver';

exports.up = (knex) =>
  knex.schema.createTable(name, (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.string('phone_number').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    // constraints

    table.unique('phone_number');
  });

exports.down = (knex) => knex.schema.dropTable(name);
