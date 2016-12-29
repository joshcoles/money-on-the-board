
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('pledges', function(table) {
      table.string('username').notNullable();
    })
  ])
};

exports.down = function(knex, Promise) {
};
