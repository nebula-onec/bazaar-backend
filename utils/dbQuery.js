const connection = require("../config/database");
module.exports = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}