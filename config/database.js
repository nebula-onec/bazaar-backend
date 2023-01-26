// Setup mysql db connection
const mysql = require('mysql');


module.exports = (dbName) => {
    const connection = mysql.createConnection({
        host     : process.env.DB_HOST,
        user     : process.env.DB_USER,
        password : process.env.DB_PASS,
        database: dbName
    });   
    
    connection.connect((err)=> {
        if (err)    throw err;
        // else console.log('Connected to DB');
    });
    return connection;
}

