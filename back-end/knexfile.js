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
    //connection: process.env.DATABASE_URL,
    connection: {
      host: 'ec2-174-129-255-26.compute-1.amazonaws.com',
      user : 'ivhxtosrdsnily',
      password : '7be361340747590de7baac1b79e87c51c0baffdcbbbd01f04a37b847d9d1d18e',
      database : 'd1ddtb5aknigj3',
      ssl: true,
    },
    migrations: {
      directory: './data/migrations'
    },
    useNullAsDefault: true
  }
}