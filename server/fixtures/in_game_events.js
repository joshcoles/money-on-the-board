
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('in_game_events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('in_game_events').insert(
          {
            id: 1,
            event_type: 'gamesetup',
            id: 2,
            event_type: 'faceoff',
            id: 3,
            event_type: 'shotsaved',
            id: 4,
            event_type: 'hit',
            id: 5,
            event_type: 'penalty',
            id: 6,
            event_type: 'goal'
          })
      ]);
    });
};
