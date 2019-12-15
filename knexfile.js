// Update with your config settings.
module.exports = {
  development: {
    client: 'pg',
    connection:'postgres://localhost/rifftube',
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true
  }
}