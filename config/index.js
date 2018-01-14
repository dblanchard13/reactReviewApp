module.exports = {
  development: {
    username: "dblanchard",
    password: null,
    database: "messenger_backend",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: null
  },
  test: {
    username: "dblanchard",
    password: null,
    database: "messenger_backend_test",
    host: "127.0.0.1",
    dialect: "postgres",
    logging: null // don't show the SQL queries when running tests
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres"
  },
}
