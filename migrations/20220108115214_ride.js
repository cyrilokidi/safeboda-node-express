const name = 'ride';

exports.up = (knex) =>
  knex.schema.createTable(name, (table) => {
    table
      .uuid('id')
      .primary()
      .notNullable()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('passenger_id').notNullable();
    table.uuid('driver_id').notNullable();
    table.boolean('done').defaultTo(false);
    table.decimal('pickup_point_lat', 8, 6);
    table.decimal('pickup_point_long', 9, 6);
    table.decimal('destination_lat', 8, 6);
    table.decimal('destination_long', 9, 6);
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());

    // index

    table
      .foreign('passenger_id')
      .references('id')
      .inTable('passenger')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .foreign('driver_id')
      .references('id')
      .inTable('driver')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    // constraint

    table.unique(['passenger_id', 'driver_id']);
  });

exports.down = (knex) => knex.schema.dropTable(name);
