const connection = require("../config/database")





class Address{
    
}

Address.findById = (id)=> {
    return new Promise((resolve, reject)=> {
        connection.query('SELECT * from address where address_id = ?', id, (err, result)=> {
            if(err) reject(err)
            resolve(result[0])
        })
    })
}


module.exports = Address