const connection = require("../config/database");

class MasterUser{

}

MasterUser.find = (columns=['*'], filters) => {
    return new Promise((resolve, reject)=> {
        let query = `SELECT ${columns.join(',')} FROM admin `
        if(filters && filters.email) query += ' where email = ' + connection.escape(filters.email)
        connection.query(query, (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}

MasterUser.findById = (id)=> {
    return new Promise((resolve, reject)=> {
        connection.query('SELECT admin_id, email, phone, password, db FROM admin WHERE admin_id = ?', id, (err, result)=> {
            if(err) reject(err);
            resolve(result[0])
        })
    })
}


module.exports = MasterUser