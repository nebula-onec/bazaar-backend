const connection = require("../config/database");
module.exports = (query, obj) => {
    return new Promise((resolve, reject) => {
        connection.query(query, obj, (err, result) => {
            if(err) reject(err);
            else resolve(result);
        });
    });
}