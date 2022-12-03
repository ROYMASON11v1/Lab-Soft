var mysql = require('mysql');

const ve = require('./config.js');


var con = mysql.createConnection({

    host : ve.DB_HOST,
    user : ve.DB_USER,
    password : ve.DB_PASSWORD,
    database : ve.DB_DATABASE,
    port: ve.DB_PORT
});

con.connect((err) => {
    if(err) throw err;
    console.log('Database Connected..');
});

module.exports = con;