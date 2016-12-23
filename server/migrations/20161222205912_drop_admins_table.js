
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('campaigns', function(table) {
      table.dropColumn('admin_id');
    }),
    knex.schema.dropTable('admins'),
    knex.schema.table('campaigns', function(table) {
      table.integer('user_id').references('id').inTable('users').notNullable();
    }),
    knex.schema.table('users', function(table) {
      table.boolean('admin').notNullable().defaultTo(false);
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('campaigns', function(table) {
      table.integer('admin_id').references('id').inTable('admins').notNullable();
    }),
    knex.schema.createTable('admins'),
    knex.schema.table('campaigns', function(table) {
      table.dropColumn('user_id');
    }),
    knex.schema.table('users', function(table) {
      table.dropColumn('admin');
    })
  ])
};
