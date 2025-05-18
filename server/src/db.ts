import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: parseInt(process.env.PG_PORT || '5432'),
    connectionString: process.env.DATABASE_URL,
});

export const generalPool = new Pool({
    connectionString: process.env.GENERAL_DATABASE_URL,
});

export default pool;