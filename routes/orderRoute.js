const { getOrderDetails, getPendingOrders, changeOrderStatus, getSingleOrderDetails } = require("../controllers/orderController");
const { adminAuthentication, userAuthentication } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/ordermodel");

const router = require("express").Router();

//Get My Orders -- Client API
router.route("/orders/myorders").get( userAuthentication, catchAsyncError(async(req, res, next)=> {
    //No of orders, orders, 
    let filters = {
        buyer_id: req.user.user_id,
        page: 1
    }
    if(req.query.page !== undefined) filters.page = Number(req.query.page)
    const orders = await Order.find(filters);
    const noOfOrders = (await Order.count({buyer_id: req.user.user_id})).total;
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


//Single Order -- Client API
router.route("/order/:id").get(userAuthentication, catchAsyncError(async(req, res, next)=> {
    const order = await Order.findById(req.params.id);
    if(order === undefined){
        return res.status(400).json({
            success: false,
            message: "Wrong order ID"
        })
    } 
    order.address = JSON.parse(order.address)
    order.products = JSON.parse(order.products)
    res.status(400).json({
        success: true,
        order
    })
})).patch(userAuthentication, catchAsyncError(async(req, res, next)=> {
    const result = await Order.updateById(req.params.id, req.user.user_id)
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


//Create Order -- Admin API
router.route("/admin/orders").get(adminAuthentication, getOrderDetails);
router.route("/admin/order/:id").get(adminAuthentication, getSingleOrderDetails); 
router.route("/admin/changeorderstatus").post(adminAuthentication, changeOrderStatus);

module.exports = router;