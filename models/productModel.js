const connection = require("../config/database");



class Product{
    constructor(product){
        this.product_name = product.product_name
        this.price = product.price
        this.category_id = product.category_id
        this.description_short = product.description_short
        this.description_long = product.description_long
        this.stock = product.stock
        this.images = product.images
    }
    save = ()=> {
        return new Promise((resolve, reject)=> {
            connection.query("INSERT INTO product SET ?", this, (err, result)=> {
                if(err) reject(err)
                resolve(result)
            })
        })
    }
}

//Use category.category_id Or product.category_id to access category_id in SQL Query
/*
    filters = { page: Number/Sting, product_name: String, category_id: Number/String }
*/
Product.find = (columns=['*'], filters={}, checks={}) => {
    
    return new Promise((resolve, reject)=> {
        const resultPerPage=12
        // if(filters && filters.page && filters.page>0) page = Number(filters.page);
        let query = `SELECT ${columns.join(', ')} FROM product LEFT JOIN category ON(product.category_id=category.category_id) WHERE 1`
        if(filters.product_name) query += ' && product_name LIKE ' + connection.escape('%' + filters.product_name + '%') ;
        if(filters.category_id)  query += ' && category.category_id = ' + connection.escape(filters.category_id) ;
        if(Array.isArray(filters.productIds) && filters.productIds.length>0) query += ' && product_id IN (' + connection.escape(filters.productIds) + ')'
        if(checks.stock===true) query += " && stock>0 "
        if(filters.page) query += ' LIMIT ' + ((connection.escape(Number(filters.page))-1)*resultPerPage) + ',' + resultPerPage;
        // console.log("Product query: ",query);
        connection.query(query, (err, result)=> {
            if(err) reject(err);
            resolve(result);
        })
    });
}

Product.count = (filters={})=> {
    return new Promise((resolve, reject)=> {
        let query = `SELECT count(*) as numberOfProducts FROM product WHERE product_name LIKE ` + connection.escape('%' + filters.product_name + '%');
        if(filters.category_id)  query += ' && category_id = ' + connection.escape(filters.category_id) ;
        connection.query(query, (err, result)=> {
            if(err) reject(err)
            resolve(result[0].numberOfProducts)
        })
    })
}

Product.findById = (id) =>{
    return new Promise((resolve, reject)=> {
        connection.query('SELECT * FROM product WHERE product_id = ?', id, function(err, result) {
            if(err) reject(err);
            resolve(result[0])
        });
    });
}

Product.deleteById = (product_id)=> {
    return new Promise((resolve, reject)=> {
        connection.query('DELETE FROM product where product_id = ?', product_id, (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}

Product.updateById = (id, product)=> {
    return new Promise((resolve, reject)=> {
        connection.query('UPDATE product SET ? WHERE product_id = ?', [product, id], (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports = Product;