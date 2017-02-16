exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('charities').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('charities').insert(
          {
            charity_name: "Tots 4 Kids",
            charity_url: "www.kids.com",
            charity_transaction: "Blah blah blah I'm supposed to be an integer but I'm a string lol",
            charity_description: "Tots 4 Kids provides tater tots for kids around Vancouver's impoverished DTES on 'Tater Tot Thursdays'",
            charity_image_url: "https://www.lehmansdeli.com/wp-content/uploads/2014/05/tater-1W-e1399744048140.jpg"
          })
      ]);
    });
};
