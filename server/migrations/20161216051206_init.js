
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('pledges', function(table){
      table.increments();
      table.integer('user_id');
      table.integer('in_game_event_id');
      table.integer('campaign_id');
      table.string('player_uuid');
      table.string('team_uuid');
      table.decimal('money', 8, 2);
    }),
    knex.schema.createTable('in_game_events', function(table){
      table.increments();
      table.string('event_type');
    }),
    knex.schema.createTable('users', function(table){
      table.increments();
      table.string('twitter');
      table.string('email');
    }),
    knex.schema.createTable('admins', function(table){
      table.increments();
      table.string('name');
      table.string('email');
    }),
    knex.schema.createTable('charities', function(table){
      table.increments();
      table.integer('campaign_id');
      table.string('name');
      table.string('url');
    }),
    knex.schema.createTable('games', function(table){
      table.increments();
    }),
    knex.schema.createTable('campaigns', function(table){
      table.increments();
      table.integer('charity_id');
      table.integer('game_id');
      table.integer('admin_id');
      table.string('handle');
      table.string('title');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('pledges'),
    knex.schema.dropTable('in_game_events'),
    knex.schema.dropTable('campaigns'),
    knex.schema.dropTable('users'),
    knex.schema.dropTable('games'),
    knex.schema.dropTable('charities'),
    knex.schema.dropTable('admins')
  ])
};
