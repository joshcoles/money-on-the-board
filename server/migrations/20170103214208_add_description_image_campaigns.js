exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('campaigns', function(table) {
      table.string('description').notNullable();
      table.string('image_url').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('campaigns', function(table) {
      table.dropColumn('description');
      table.dropColumn('image_url');
    })
  ])
};