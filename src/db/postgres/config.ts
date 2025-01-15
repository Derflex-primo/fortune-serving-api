import { Pool } from 'pg';

const pool = new Pool({
    user: 'fortune_serving',
    host: 'localhost',
    database: 'fortune_serving_db',
    password: '12345',
    port: 5432,
});

export default pool;
