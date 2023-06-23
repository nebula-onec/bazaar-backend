const connection = require("../config/database")

class Order{
    constructor(order){
        this.buyer_id = order.buyer_id
        this.address_id = order.address_id
        this.total_price = order.total_price
        this.shipping_price = order.shipping_price
        this.productsInOrder = order.productsInOrder
    }
    save = ()=>{
        return new Promise((resolve, reject)=> {
            let user_order = { buyer_id: this.buyer_id, address_id: this.address_id, total_price: this.total_price, shipping_price:this.shipping_price}
            connection.beginTransaction((err)=>{
                if(err) reject(err);
                connection.query("UPDATE product JOIN JSON_TABLE( ? , '$[*]' COLUMNS(quantity INT PATH '$.quantity',product_id INT PATH '$.product_id') ) as A ON(product.product_id = A.product_id) SET stock = stock - quantity", [JSON.stringify(this.productsInOrder)] ,(err, result)=> {
                    if(err){
                        return connection.rollback(function(){
                            reject(err)
                        })
                    }
                    // console.log("1st result: ", result)
                    connection.query('INSERT INTO user_order SET ?', user_order, (err, result)=> {
                        if(err){
                            return connection.rollback(function(){
                                reject(err)
                            })
                        }
                        // console.log("2nd result: ", result)
                        // Order of columns matter in result obtained from select query
                        connection.query(`INSERT INTO order_product SELECT * from (SELECT ${result.insertId} as order_id) as A JOIN  JSON_TABLE(? ,'$[*]' COLUMNS(product_id INT PATH '$.product_id',quantity INT PATH '$.quantity',price INT PATH '$.price') ) as B`, [JSON.stringify(this.productsInOrder)], (err, result)=> {
                            if(err){
                                return connection.rollback(function(){
                                    reject(err)
                                })
                            }
                            // console.log("3rd result: ", result)
                            connection.commit((err)=> {
                                return connection.rollback(()=> {
                                    reject(err)
                                })
                            })
                            console.log("Order Transaction Completed Successfully!")
                            resolve(1)
                        })
                    })
                })
            })
        })
    }
}

Order.count = (conditions) => {
    return new Promise((resolve, reject)=> {
        let query = 'SELECT count(*) as total FROM user_order'
        for(let i=0;i<conditions.length;i++){
            if(i==0) query+=" WHERE ";
            query+=conditions[i];
            if(i!=conditions.length-1) query+=' AND '
        }
        connection.query(query, (err, result)=> {
            if(err) reject(err);
            resolve(result[0].total);
        })
    })
}
Order.find = (filters={})=> {
    return new Promise((resolve, reject)=> {
        const resultPerPage = 10
        let query = "SELECT user_order.*, JSON_OBJECT('address_id' , address_id, 'street1', street1, 'street2', street2, 'city', city, 'zipcode', zipcode) as address, JSON_ARRAYAGG( JSON_OBJECT('product_id', product_id, 'product_name', product_name, 'images', images, 'quantity', quantity, 'price', order_product.price) ) as products from user_order NATURAL JOIN address NATURAL JOIN order_product JOIN product USING(product_id) "
        if(filters.buyer_id) query += " where buyer_id = " + connection.escape(filters.buyer_id)
        query += " GROUP BY order_id ORDER BY order_date DESC " 
        query+=" LIMIT " + connection.escape((filters.page-1)*resultPerPage) + ',' + resultPerPage
        // console.log("Find query: ", query);
        connection.query(query, (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}

// "SELECT user_order.*, JSON_OBJECT('address_id' , address_id, 'street1', street1, 'street2', street2, 'city', city, 'zipcode', zipcode) as address, JSON_ARRAYAGG( JSON_OBJECT('product_id', product_id, 'product_name', product_name, 'images', images, 'quantity', quantity, 'price', order_product.price) ) as products from user_order NATURAL JOIN address NATURAL JOIN order_product JOIN product USING(product_id) where buyer_id = 15 group by order_id"
Order.findById = (id)=> {
    return new Promise((resolve, reject)=> {
        let query = "SELECT user_order.*, JSON_OBJECT('address_id' , address_id, 'street1', street1, 'street2', street2, 'city', city, 'zipcode', zipcode) as address, JSON_ARRAYAGG( JSON_OBJECT('product_id', product_id, 'product_name', product_name, 'images', images, 'quantity', quantity, 'price', order_product.price) ) as products from user_order NATURAL JOIN address NATURAL JOIN order_product JOIN product USING(product_id) "
        query += " where order_id = " + connection.escape(id)
        query += " group by order_id " 
        connection.query(query, (err, result)=> {
            if(err) reject(err)
            resolve(result[0])
        })
    })
}

Order.updateById = (id, updates, conditions=[] )=> {
    return new Promise((resolve, reject)=> {
        let query = 'UPDATE user_order SET ' + connection.escape(updates)
        query+=' WHERE order_id = ' + connection.escape(id);
        for(let i=0;i<conditions.length;i++){
            query+=' AND '
            query+=conditions[i];
        }
        // console.log(query);
        connection.query(query, (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports = Order