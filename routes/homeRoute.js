const { validateClient, validateUser, adminAuthentication } = require('../middleware/auth');
const catchAsyncError = require('../middleware/catchAsyncError');
const Category = require('../models/categoryModel');
const Order = require('../models/ordermodel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const router = require('express').Router();

//Client App Home Page resource API
router.route('/home').get(validateClient , catchAsyncError( async(req, res, next)=> {
    let responseObj = { success: true, };
    // filters = {product_name: 'am', category_id: 1, page: '2', product_id: Array}
    responseObj.products = await Product.find(['product_id', 'product_name', 'price', 'stock', 'images'], {page: 1})
    responseObj.numberOfProducts = await Product.count({product_name: ''})
    responseObj.categories = await Category.find();

    await validateUser(req, res, next);
    if(req.user !== undefined){
        if(req.user.cart === null || Object.keys(req.user.cart).length===0){
            responseObj.cart={}
            responseObj.cartProducts={}
        }
        else{
            responseObj.cart = JSON.parse(req.user.cart);
            let productIds = [];
            for(key in responseObj.cart){
                productIds.push(key);
            }
            responseObj.cartProducts = await Product.find(['product_id', 'product_name', 'price', 'stock', 'images'], {productIds})
            responseObj.cartProducts.forEach((product)=>{
                product.quantity = responseObj.cart[product.product_id]
            })
        }
    }
    return res.status(200).json(responseObj);
})
);




router.route("/admin/home").get(adminAuthentication, catchAsyncError(async(req, res, next)=>{
    let info = {orders: 15, n_customers: 50, n_products: 15, unavailable_products: 2, n_sold: 20, revenue: 50000};
    
    info.unfulfilled_orders = await Order.find({status: [1,2]});

    res.status(200).json({
        success: true,
        info
    });
  }));
  

module.exports = router;