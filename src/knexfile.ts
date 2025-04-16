import config from './config/config';
import dotenv from 'dotenv';

dotenv.config();
const ssl = process.env.SSL === 'true'
const { database } = config;

const knexConfig: { [key: string]: import('knex').Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      host: database.host,
      database: database.name,
      user: database.user,
      password: database.password,
      port: Number(database.port as string) || 5466,
      ssl: false,
      port: Number(database.port as string) || 5432,
      ssl: ssl ? { rejectUnauthorized: false } : false
    },
    migrations: {
      directory: '../data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  staging: {
    client: 'postgresql',
    connection: {
      host: database.host,
      database: database.name,
      user: database.user,
      password: database.password,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      host: database.host,
      database: database.name,
      user: database.user,
      password: database.password,
      ssl: {
        rejectUnauthorized: true,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default knexConfig;
