
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('campaigns').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('campaigns').insert({
          id: 1,
          charity_id: 1,
          game_id: 1,
          admin_id: 1,
          handle: '@SensMotB',
          title: 'Eric - Senators vs Leafs'
        })
      ]);
    });
};
