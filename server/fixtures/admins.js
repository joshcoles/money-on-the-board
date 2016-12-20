
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('admins').insert(
          {
           name: 'Eric',
           email: 'eric@eric.com'
          })
      ]);
    });
};
