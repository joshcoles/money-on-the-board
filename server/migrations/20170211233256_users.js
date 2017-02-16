
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').unique().notNullable();
      table.string('username').unique().notNullable();
      table.string('password');
      table.string('email').unique().notNullable();
      table.string('avatar', 500).notNullable();
    }),
    knex.schema.createTable('games', function(table){
      table.increments('id');
      table.string('game_uuid');
      table.string('link');
      table.string('game_date');
      table.string('state');
      table.integer('home_team_id');
      table.integer('away_team_id');
    }),
    knex.schema.createTable('charities', function(table) {
      table.increments('id');
      table.string('charity_name');
      table.string('charity_url', 500).notNullable();
      table.string('charity_transaction');
      table.string('charity_description', 500).notNullable;
      table.string('charity_image_url', 500).notNullable;
    }),
    knex.schema.createTable('campaigns', function(table){
      table.increments('id').unique().notNullable();
      table.integer('charity_id').references('id').inTable('charities').notNullable();
      table.integer('game_id').references('id').inTable('games').notNullable();
      table.string('handle');
      table.string('title');
      table.integer('user_id').references('id').inTable('users').notNullable();
      table.string('image_url');
      table.integer('total_pledges');
      table.integer('target_amount');
    }),
    knex.schema.createTable('in_game_events', function(table){
      table.increments('id');
      table.string('event_type');
    }),
    knex.schema.createTable('teams', function(table){
      table.increments('id');
      table.integer('team_uuid').unique().notNullable();
      table.string('team_fullname');
      table.string('team_name');
      table.string('team_abbreviation');
      table.string('roster_url',500).notNullable();
    }),
    knex.schema.createTable('players', function(table){
      table.increments('id');
      table.integer('player_uuid').unique().notNullable();
      table.string('player_name');
      table.string('player_jersey_number');
      table.string('player_position');
      table.integer('team_id').references('team_uuid').inTable('teams').notNullable();
    }),
    knex.schema.createTable('pledges', function(table){
      table.increments('id');
      table.integer('user_id').references('id').inTable('users').notNullable();
      table.integer('in_game_event_id').references('id').inTable('in_game_events').notNullable();
      table.integer('campaign_id').references('id').inTable('campaigns').notNullable();
      table.integer('player_id').references('player_uuid').inTable('players').notNullable();
      table.integer('team_id').references('team_uuid').inTable('teams').notNullable();
      table.decimal('money', 8, 2);
    }),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('games'),
    knex.schema.dropTableIfExists('charities'),
    knex.schema.dropTableIfExists('campaigns'),
    knex.schema.dropTableIfExists('in_game_events'),
    knex.schema.dropTableIfExists('teams'),
    knex.schema.dropTableIfExists('players'),
    knex.schema.dropTableIfExists('pledges')
  ]);
};
