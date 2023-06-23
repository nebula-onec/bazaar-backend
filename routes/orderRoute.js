const schemas = require("../config/JOISchemas");
const connection = require("../config/database");
const { getOrderDetails, getPendingOrders, changeOrderStatus, getSingleOrderDetails } = require("../controllers/orderController");
const { adminAuthentication, userAuthentication } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const inputValidator = require("../middleware/inputValidator");
const Address = require("../models/addressModel");
const Order = require("../models/ordermodel");
const Product = require('../models/productModel');

const router = require("express").Router();

//Get My Orders -- Client API
router.route("/orders/myorders").get( userAuthentication, inputValidator(schemas.myOrders, 'query') ,catchAsyncError(async(req, res, next)=> {
    //No of orders, orders, 
    let filters = {
        buyer_id: req.user.user_id,
        page: req.query.page
    }
    const orders = await Order.find(filters);
    const noOfOrders = await Order.count(['buyer_id = ' + req.user.user_id]);
    orders.forEach((order)=> {
        order.address = JSON.parse(order.address)
        order.products = JSON.parse(order.products)
    })
    res.status(400).json({
        success: true,
        noOfOrders,
        orders
    })
}))


//Get Single Order, Cancel Single Order( i.e., update order_status) --Client API
router.route("/order/:id").get(userAuthentication, inputValidator(schemas.order, 'params') ,catchAsyncError(async(req, res, next)=> {
    const order = await Order.findById(req.params.id);
    if(order === undefined){
        return res.status(400).json({
            success: false,
            message: "Wrong order ID"
        })
    } 
    order.address = JSON.parse(order.address)
    order.products = JSON.parse(order.products)
    res.status(200).json({
        success: true,
        order
    })
})).patch(userAuthentication, inputValidator(schemas.order, 'params') ,catchAsyncError(async(req, res, next)=> {
    const result = await Order.updateById(req.params.id, {order_status: 0}, ['buyer_id ='+connection.escape(req.user.user_id), 'order_status = 1'] )
    if(result.changedRows === 0){
        return res.status(200).json({
            success: false,
            message: "Invalid Request"
        })
    }
    res.status(400).json({
        success: true,
        message: "Order Cancelled Successfully"
    })
}))

// Create Order --User Restricted Client API
router.route("/order/new").post(userAuthentication, inputValidator(schemas.orderCreate, 'body') ,catchAsyncError(async(req, res, next)=> {
    let { address_id, orderProducts, shipping_price } = req.body;

    //Checking Product's List
    let productIds = []
    for(key in orderProducts){
        productIds.push(key)
    }
    const productsInOrder = await Product.find(['product_id', 'price'], { productIds })
    if(productsInOrder.length !== productIds.length){
        return res.status(400).json({ success: false, message: "One or more Invalid orderProduct"})
    }

    //Checking Address Information
    const address = await Address.findById(address_id);
    if(address === undefined || address.user_id !== req.user.user_id){
        return res.status(400).json({ success: false, message: "Invalid address Information"})
    }

    
    let total_price = shipping_price
    productsInOrder.forEach((product)=>{
        product.quantity = orderProducts[product.product_id]
        total_price += product.quantity * product.price
    })
    
    const order = new Order({buyer_id: req.user.user_id, address_id, total_price, shipping_price, productsInOrder})
    await order.save()

    res.status(201).json({
        success: true,
        message: "Order Created Successfully",
    })

}))


router.route("/admin/changeorderstatus").post(adminAuthentication, inputValidator(schemas.orderStatus, 'body') ,catchAsyncError( async(req, res, next)=>{
    const order = await Order.findById(req.body.order_id)
    if(order === undefined ){
        return res.status(401).json({
            success: false,
            message: "Order Doesn't Exist"
        });
    }
    if(order.order_status === 0){
        return res.status(401).json({
            success: false,
            message: "Can't Change Status of Cancelled Order"
        });
    }
    const result = await Order.updateById(order.order_id, {order_status: req.body.new_status});
    if(result.changedRows === 0){
        return res.status(200).json({
            success: false,
            message: "Invalid Request"
        })
    }
    res.status(200).json({
        success: true,
        message: "Order Status Updated successfully!"
    });
}));

//Create Order -- Admin API
router.route("/admin/orders").get(adminAuthentication, inputValidator(schemas.orderList, 'query') ,catchAsyncError( async(req, res, next) => {
    let totalRevenue = 25600000
    const orders = await Order.find({page: req.query.page})
    const pendingOrders = await Order.count(['(order_status = 1 || order_status = 2)'])
    const successfulOrders = await Order.count(['order_status = 3'])
    
    res.status(200).json({
        success: true,
        totalRevenue,
        successfulOrders,
        pendingOrders,
        orders
    });
}));

router.route("/admin/order/:id").get(adminAuthentication, getSingleOrderDetails); 

module.exports = router;