const connection = require('../config/database')

class Category{

}


Category.find = ()=> {
    return new Promise((resolve, reject)=> {
        connection.query('select * from category', (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}

Category.findById = (id) =>{
    return new Promise((resolve, reject)=> {
        connection.query('select category_name from category where category_id = ?', id, (err, result)=> {
            if(err) reject(err)
            resolve(result[0])
        })
    })
}


module.exports = Category