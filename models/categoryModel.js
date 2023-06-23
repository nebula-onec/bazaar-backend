const connection = require('../config/database')

class Category{

}


Category.find = ()=> {
    return new Promise((resolve, reject)=> {
        connection.query('SELECT * FROM category', (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}

Category.findById = (id) =>{
    return new Promise((resolve, reject)=> {
        connection.query('SELECT category_name FROM category WHERE category_id = ?', id, (err, result)=> {
            if(err) reject(err)
            resolve(result[0])
        })
    })
}


module.exports = Category