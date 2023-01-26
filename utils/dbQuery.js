module.exports = (query, dbName) => {
    const dbConnectionSetup = require("../config/database");
    const connection = dbConnectionSetup(dbName);
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}