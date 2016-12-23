
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert(
          {
            username: 'admin',
            password: 'hashedpassword',
            email: 'admin@user.com',
            twitter: '@fun',
            admin: true
          })
      ]);
    });
};
