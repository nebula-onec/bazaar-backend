const connection = require("../config/database")





class Address{
    constructor(address){
        this.user_id = address.user_id,
        this.street1 = address.street1,
        this.street2 = address.street2,
        this.city = address.city,
        this.zipcode = address.zipcode
    }
    save = ()=> {
        return new Promise((resolve, reject)=> {
            connection.query("INSERT INTO address SET ?", this, (err, result)=> {
                if(err) reject(err);
                resolve(result);
            })
        })
    }
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