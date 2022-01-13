const extension = 'uuid-ossp';

exports.up = (knex) =>
  knex.raw(`CREATE EXTENSION IF NOT EXISTS "${extension}"`);

exports.down = (knex) => knex.raw(`DROP EXTENSION IF EXISTS "${extension}"`);
