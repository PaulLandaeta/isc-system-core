import knex from 'knex';
import config from '../config/config';
import dotenv from 'dotenv';

dotenv.config();
const ssl = process.env.SSL === 'true';
const { database } = config;

const db = knex({
  client: 'pg',
  connection: {
    host: database.host,
    database: database.name,
    user: database.user,
    password: database.password,
    port: Number(database.port) || 5466,
    ssl: ssl ? true : false,
  },
});

export default db;
