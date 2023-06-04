const connection = require("../config/database")
const bcrypt = require('bcryptjs')

class User{
    constructor(user){
        this.email = user.email,
        this.name = user.name,
        this.phone = user.phone,
        this.password = user.password
    }
    save = ()=> {
        return new Promise((resolve, reject)=> {
            connection.query('INSERT INTO user SET ?', this, (err, result)=> {
                if(err) reject(err)
                resolve(result)
            })
        })
    }
}


User.find = (columns=['*'], filters) => {
    return new Promise((resolve, reject)=> {
        let query = `SELECT ${columns.join(',')} FROM user WHERE 1`
        if(filters){
            if(filters.email) query += ' && email = ' + connection.escape(filters.email);
        }
        connection.query(query, (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}
User.findById = (id)=> {
    return new Promise((resolve, reject)=> {
        connection.query('SELECT user_id, name, phone, email, cart from USER WHERE user_id = ?', id, (err, result)=> {
            if(err) reject(err);
            resolve(result[0])
        })
    })
}

User.updateById = (id, set)=> {
    return new Promise((resolve, reject)=> {
        connection.query('UPDATE user SET ? WHERE user_id = ?', [set, id], (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports = User;