const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    password: 'Admin',
    database: 'sahaz'
});

module.exports.pool = pool;