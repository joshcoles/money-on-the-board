module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'motbdev',
      user: 'development',
      password: 'development'
    },
    seeds: {
    directory: './fixtures'
    },
  }
}