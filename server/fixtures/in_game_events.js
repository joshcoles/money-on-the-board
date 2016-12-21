
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('in_game_events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('in_game_events').insert(
          {
            event_type: 'gamesetup'
          }),
        knex('in_game_events').insert(
          {
            event_type: 'faceoff'
          }),
        knex('in_game_events').insert(
          {
            event_type: 'shotsaved'
          }),
        knex('in_game_events').insert(
          {
            event_type: 'hit'
          }),
        knex('in_game_events').insert(
          {
            event_type: 'penalty'
          }),
        knex('in_game_events').insert(
          {
            event_type: 'goal'
          })
      ]);
    });
};
