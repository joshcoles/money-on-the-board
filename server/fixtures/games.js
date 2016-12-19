
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('games').insert(
          {
            id: 1,
            game_uuid: '4a130cc4-3bd4-42ad-ac93-484043a2d5bc'
          })
      ]);
    });
};
