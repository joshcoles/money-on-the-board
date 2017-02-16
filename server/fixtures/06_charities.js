exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('charities').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('charities').insert(
          {
            charity_name: "canuck autism network",
            charity_url: "http://www.canucksautism.ca/",
            charity_transaction: "1",
            charity_description: "Test description",
            charity_image_url: 'http://www.canucksautism.ca/Assets/Canucks+Austism+Network+Digital+Assets/Canucks+Autism+Network+Brand+Iden.jpg'
          })
      ]);
    });
};
