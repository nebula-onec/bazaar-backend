const catchAsyncError = require("../middleware/catchAsyncError");
const dbInsertQuery = require("../utils/dbInsertQuery");
const dbQuery = require("../utils/dbQuery");


exports.getOrderDetails = catchAsyncError( async(req, res, next) => {
    const dbName = 'client'+req.user.id;
    let totalRevenue = 0, successfulOrders = 0, pendingOrders=0;
    const orders = await dbQuery(`select order_id, order_status, total_price from user_order `, dbName);

    orders.forEach((order)=>{
        if(order.order_status == 3) {  totalRevenue += order.total_price; successfulOrders++; }
    });
    pendingOrders=orders.length-successfulOrders;

    const productInOrders = await dbQuery(`select order_product.*, product.name  from order_product JOIN product ON order_product.product_id = product.product_id`, dbName);

    // productInOrders = [{order_id:1, product_id:1, quantity:5, price: 200}, {order_id:1, product_id:2, quantity:1, price:1000}
    // ,  {order_id:2, product_id:2, quantity:3, price:1000},  {order_id:2, product_id:5, quantity:1, price:12000}];
    const temp = new Map();
    productInOrders.forEach((product)=>{
        if(!temp.has(product.order_id)){
            temp.set(product.order_id, []);
        }
        temp.get(product.order_id).push({product_id: product.product_id, quantity: product.quantity, price: product.price, product_name: product.name});
    });

    orders.forEach((order)=>{
        order.product = temp.get(order.order_id);
    });

    // console.log(temp);

    res.status(200).json({
        success: true,
        totalRevenue,
        successfulOrders,
        pendingOrders,
        orders
    });
});


exports.getSingleOrderDetails = catchAsyncError( async(req, res, next)=>{
    const dbName = 'client'+req.user.id;
    const id = req.params.id;

    const result = (await dbQuery(`select * from user_order where order_id = ${id}`, dbName));
    if(!result[0]){
        return res.status(404).json({
            success: false,
            message: "Order Not Found"
        })
    }
    order = result[0];
    const address = await dbQuery(`select address_id, street1, street2, city, zipcode from address where address_id = ${order.address_id}`, dbName);
    delete order.address_id;
    // order.address=address;
    order.address = [{address_id:address[0].address_id,Line1:address[0].street1,city:address[0].city,zipcode:address[0].zipcode}];

    const user = await dbQuery(`select name,phone from user where user_id = ${order.buyer_id}`, dbName);
    order.user = {user_id: order.buyer_id, name: user[0].name,phone:user[0].phone};
    delete order.buyer_id;

    const products = await dbQuery(`select order_product.product_id, order_product.quantity, order_product.price, product.name from order_product JOIN product ON order_product.product_id = product.product_id where order_product.order_id = ${order.order_id}`, dbName);
    
    order.products = products;

    res.status(200).json({
        success: true,
        order
    });
});


// exports.getPendingOrders = catchAsyncError( async(req, res, next)=>{
//     const dbName = 'client'+req.user.id;
    // const orders = await dbQuery(`select order_id, order_status from user_order where order_status not in (0,3)`, dbName);

    // const pendingOrders=orders.length;

    // const productInOrders = await dbQuery(`select order_product.*, product.name  from order_product JOIN product JOIN user_order where order_product.product_id=product.product_id and order_product.order_id=user_order.order_id and user_order.order_status!=3`, dbName);

    // // productInOrders = [{order_id:1, product_id:1, quantity:5, price: 200}, {order_id:1, product_id:2, quantity:1, price:1000}
    // // ,  {order_id:2, product_id:2, quantity:3, price:1000},  {order_id:2, product_id:5, quantity:1, price:12000}];
    // const temp = new Map();
    // productInOrders.forEach((product)=>{
    //     if(!temp.has(product.order_id)){
    //         temp.set(product.order_id, []);
    //     }
    //     temp.get(product.order_id).push({product_id: product.product_id, quantity: product.quantity, price: product.price, product_name: product.name});
    // });

    // orders.forEach((order)=>{
    //     order.product = temp.get(order.order_id);
    // });

    // // console.log(temp);

    // res.status(200).json({
    //     success: true,
    //     pendingOrders,
    //     orders
    // });
// });

exports.changeOrderStatus = catchAsyncError( async(req, res, next)=>{
    const dbName = 'client'+req.user.id;
    const {order_id, new_status} = req.body;
    if(!order_id || !new_status){
        return res.status(206).json({
            success: false,
            message: "Please give Full Details"
        });
    }
    const order = (await dbQuery(`select order_status from user_order where order_id = ${order_id}`, dbName))[0];
    if(order.order_status == 0 ){
        return res.status(401).json({
            success: false,
            message: "Cancelled Order's Status can't be Updated"
        });
    }
    const result = await dbInsertQuery(`Update user_order SET order_status = ? WHERE order_id = ?`, [new_status, order_id], dbName);
    res.status(200).json({
        success: true,
        message: "Order Status Updated successfully!"
    });
});



// SELECT * FROM customers ORDER BY last_name, first_name LIMIT 10 OFFSET 20;
