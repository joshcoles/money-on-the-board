
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('in_game_events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('in_game_events').insert(
          {
            event_type: 'gamesetup',
            event_type: 'faceoff',
            event_type: 'shotsaved',
            event_type: 'hit',
            event_type: 'penalty',
            event_type: 'goal'
          })
      ]);
    });
};
