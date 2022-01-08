const client = 'pg';
const migrations = {
  tableName: 'migrations',
};

module.exports = {
  development: {
    client,
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'password',
      database: 'safeboda',
    },
    migrations,
  },

  production: {
    client,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations,
  },
};
