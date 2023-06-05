const connection = require("./database");

exports.configDatabase = (DB) =>{
    return new Promise((resolve, reject)=> {
        let query = 'USE ' + DB
        connection.query(query, (err, result)=> {
            if(err) reject(err);
            resolve(result);
        });
    });
}
