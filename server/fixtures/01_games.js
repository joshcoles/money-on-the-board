
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('games').insert(
          {
            game_uuid: '4a130cc4-3bd4-42ad-ac93-484043a2d5bc'
          }),
        knex('games').insert(
          {
            game_uuid: '3b8e1099-8050-42c9-b545-2aa74e93b2e8'
          })
      ]);
    });
};
