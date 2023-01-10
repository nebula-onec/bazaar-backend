// Setup mysql db connection
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS
});   

connection.connect((err)=> {
    if (err)    throw err;
    else console.log('Connected to DB');
});

module.exports = connection;