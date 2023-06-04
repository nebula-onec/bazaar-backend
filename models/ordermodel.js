const connection = require("../config/database")

class Order{

}

Order.count = ({buyer_id}) => {
    return new Promise((resolve, reject)=> {
        let query = 'select count(*) as total  from user_order'
        if(buyer_id !== undefined) query += ' where buyer_id = ' + connection.escape(buyer_id);
        connection.query(query, (err, result)=> {
            if(err) reject(err);
            resolve(result[0]);
        })
    })
}
Order.find = (filters)=> {
    return new Promise((resolve, reject)=> {
        const resultPerPage = 10
        let query = "SELECT user_order.*, JSON_OBJECT('address_id' , address_id, 'street1', street1, 'street2', street2, 'city', city, 'zipcode', zipcode) as address, JSON_ARRAYAGG( JSON_OBJECT('product_id', product_id, 'product_name', product_name, 'images', images, 'quantity', quantity, 'price', order_product.price) ) as products from user_order NATURAL JOIN address NATURAL JOIN order_product JOIN product USING(product_id) "
        if(filters && filters.buyer_id) query += " where buyer_id = " + connection.escape(filters.buyer_id)
        query += " group by order_id LIMIT " + connection.escape((filters.page-1)*resultPerPage) + ',' + resultPerPage
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

Order.updateById = (id, buyer_id)=> {
    return new Promise((resolve, reject)=> {
        connection.query('UPDATE user_order SET order_status = 0 WHERE order_status = 1 AND buyer_id = ? AND order_id = ?', [buyer_id, id], (err, result)=> {
            if(err) reject(err)
            resolve(result)
        })
    })
}

module.exports = Order