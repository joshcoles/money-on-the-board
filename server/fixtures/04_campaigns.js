
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('campaigns').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('campaigns').insert({
          game_id: 1,
          user_id: 1,
          handle: '@SensMotB',
          title: 'Season Opener',
          charity_name: 'Senators Foundation',
          charity_url: 'www.donate.com',
          description: 'Help raise funds and awareness for the Sens Foundation! Checkout @SensMotB on twitter for updates and share this campaign with friends and family.',
          image_url: 'https://www.thestar.com/content/dam/thestar/opinion/editorials/2012/01/04/the_future_looks_bleak_for_canadian_minor_hockey/childhockey.jpeg'
        })
      ]);
    });
};
