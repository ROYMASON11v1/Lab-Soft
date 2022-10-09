import {createPool} from 'mysql2/promise'
import { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } from '../config/config.js'

const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})

pool.getConnection(( err) => {
    if (err) {
        console.log(err);
        throw new Error('Error en iniciar la base de datos');
    }
});

export default pool;