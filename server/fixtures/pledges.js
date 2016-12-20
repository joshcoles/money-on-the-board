
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('pledges').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('pledges').insert(
          {
            id: 1,
            user_id: 1,
            in_game_event_id: 6,
            campaign_id: 1,
            player_uuid: '42fa3dcd-0f24-11e2-8525-18a905767e44',
            team_uuid: '4416f5e2-0f24-11e2-8525-18a905767e44',
            money: 5.00})
      ]);
    });
};
