var mysql = require('mysql');

const ve = require('./config.js');


var con = mysql.createConnection({

    host : ve.db_host,
    user : ve.db_user,
    password : ve.db_password,
    database : ve.db_database,
    port: ve.db
});

con.connect((err) => {
    if(err) throw err;
    console.log('Database Connected..');
});

module.exports = con;