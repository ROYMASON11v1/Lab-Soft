const hola = require('dotenv').config();


const PORT = process.env.PORT || 3000
const DB_USER = process.env.DB_USER || 'root'
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_DATABASE = process.env.DB_DATABASE || 'Libreria'
const DB_PORT = process.env.DB_PORT || 3306


module.exports = {
    port: PORT,
    db_user: DB_USER,
    db_password: DB_PASSWORD,
    db_host: DB_HOST,
    db_database: DB_DATABASE,
    db_port: DB_PORT
}