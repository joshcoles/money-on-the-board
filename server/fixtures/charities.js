
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('charities').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('charities').insert({
          id: 1,
          campaign_id: 1,
          name: 'Ottawa Senators Foundation',
          url: 'www.sensfoundation.com'
          })
      ]);
    });
};
