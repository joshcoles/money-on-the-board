exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('in_game_events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('in_game_events').insert([
          {
            event_type: "Faceoff"
          },
          {
            event_type: "Give away"
          },
          {
            event_type: "Blocked Shot"
          },
          {
            event_type: "Take Away"
          },
          {
            event_type: "Hit"
          },
          {
            event_type: "Shot"
          },
          {
            event_type: "Block Shot"
          },
          {
            event_type: "Goal"
          },
          {
            event_type: "Penalty"
          }
         ])
      ]);
    });
};
