
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('in_game_events', function(table){
      table.increments('id');
      table.string('event_type');
    }),
    knex.schema.createTable('users', function(table){
      table.increments('id');
      table.string('twitter');
      table.string('email');
    }),
    knex.schema.createTable('admins', function(table){
      table.increments('id');
      table.string('name');
      table.string('email');
    }),
    knex.schema.createTable('charities', function(table){
      table.increments('id');
      table.string('name');
      table.string('url');
    }),
    knex.schema.createTable('games', function(table){
      table.increments('id');
      table.string('game_uuid');
    }),
    knex.schema.createTable('campaigns', function(table){
      table.increments('id');
      table.integer('charity_id').references('id').inTable('charities').notNullable();
      table.integer('game_id').references('id').inTable('games').notNullable();
      table.integer('admin_id').references('id').inTable('admins').notNullable();
      table.string('handle');
      table.string('title');
    }),
    knex.schema.createTable('pledges', function(table){
      table.increments('id');
      table.integer('user_id').references('id').inTable('users').notNullable();
      table.integer('in_game_event_id').references('id').inTable('in_game_events').notNullable();
      table.integer('campaign_id').references('id').inTable('campaigns').notNullable();
      table.string('player_uuid');
      table.string('team_uuid');
      table.decimal('money', 8, 2);
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pledges'),
    knex.schema.dropTable('campaigns'),
    knex.schema.dropTable('in_game_events'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('games'),
    knex.schema.dropTable('charities'),
    knex.schema.dropTable('admins'),
  ])
};
