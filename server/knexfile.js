// Update with your config settings.
require('dotenv').config();

module.exports = {

  client: 'pg',
  connection: {
    database: 'motbdev',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  seeds: {
      directory: './seeds'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }

};
