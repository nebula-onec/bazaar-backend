module.exports = (query, obj, dbName) => {
    const dbConnectionSetup = require("../config/database");
    const connection = dbConnectionSetup(dbName);
    return new Promise((resolve, reject) => {
        connection.query(query, obj, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}