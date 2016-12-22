
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('campaigns').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('campaigns').insert({
          game_id: 1,
          admin_id: 1,
          handle: '@SensMotB',
          title: 'Eric - Senators vs Leafs',
          charity_name: 'Senators Foundation',
          charity_url: 'www.donate.com',
        })
      ]);
    });
};
