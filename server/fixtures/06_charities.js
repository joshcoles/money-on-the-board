exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('charities').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('charities').insert([
          {
            charity_name: "Canucks Autism Network",
            charity_url: "http://www.canucksautism.ca/",
            charity_transaction: "1",
            charity_description: "The Canucks Autism Network (CAN) provides year-round sports and recreation programs for individuals and families living with autism, while increasing awareness and providing training in communities across British Columbia.",
            charity_image_url: 'http://www.canucksautism.ca/Assets/Canucks+Austism+Network+Digital+Assets/Canucks+Autism+Network+Brand+Iden.jpg'
          },
          {
           charity_name: "Ottawa Senators Foundation",
           charity_url: "http://www.sensfoundation.com/",
           charity_transaction: "2",
           charity_description: "The Ottawa Senators Foundation empowers children and youth to reach their full potential by investing in social recreation and education programs that promote both physical and mental wellness.",
           charity_image_url: 'http://www.sensfoundation.com/wp-content/uploads/2016/01/sens-stats-logo.png'
         }])
      ]);
    });
};
