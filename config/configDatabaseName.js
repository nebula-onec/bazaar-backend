const connection = require("./database");

exports.configDatabase = (DBtype, client_id) =>{
    return new Promise((resolve, reject)=> {
        let query = 'USE '
        if(DBtype === 'master') query += 'master'
        else if(DBtype === 'client') query += 'client' + connection.escape(Number(client_id));
        connection.query(query, (err, result)=> {
            if(err) reject(err);
            resolve(result);
        });
    });
}
