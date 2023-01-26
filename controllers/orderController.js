const catchAsyncError = require("../middleware/catchAsyncError");
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


exports.getPendingOrders = catchAsyncError( async(req, res, next)=>{
    const dbName = 'client'+req.user.id;
    const orders = await dbQuery(`select order_id, order_status from user_order where order_status!=3`, dbName);

    const pendingOrders=orders.length;

    const productInOrders = await dbQuery(`select order_product.*, product.name  from order_product JOIN product JOIN user_order where order_product.product_id=product.product_id and order_product.order_id=user_order.order_id and user_order.order_status!=3`, dbName);

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
        pendingOrders,
        orders
    });
});

exports.changeOrderStatus = catchAsyncErro( async(req, res, next)=>{

});

// SELECT * FROM customers ORDER BY last_name, first_name LIMIT 10 OFFSET 20;
