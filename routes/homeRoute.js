const { validateClient, validateUser, adminAuthentication } = require('../middleware/auth');
const catchAsyncError = require('../middleware/catchAsyncError');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const User = require('../models/userModel');

const router = require('express').Router();

//Client App Home Page resource API
router.route('/home').get(validateClient , catchAsyncError( async(req, res, next)=> {
    let responseObj = { success: true, };
    // filters = {product_name: 'am', category_id: 1, page: '2', product_id: Array}
    responseObj.products = await Product.find(['product_id', 'product_name', 'price', 'stock', 'images'], {page: 1})
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
    const dbName = 'client'+req.user.id;
  
    let info = (await dbQuery(`select * from home`, dbName))[0];
    let pendingOrders = await dbQuery(`select user_order.order_id, user_order.order_date, user_order.order_status, user.user_id,user.name from user_order JOIN user where user_order.order_status not in (0,3) AND user_order.buyer_id=user.user_id order by user_order.order_date DESC`, dbName);
  
    info.unfulfilled_orders = { number: pendingOrders.length, orders: pendingOrders };
  
      //  productInOrders = [{order_id:1, product_id:1, quantity:5, price: 200}, {order_id:1, product_id:2, quantity:1, price:1000}
      //  ,  {order_id:2, product_id:2, quantity:3, price:1000},  {order_id:2, product_id:5, quantity:1, price:12000}];
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
  
      // console.log(temp);
  
      res.status(200).json({
          success: true,
          info
      });
  }));
  

module.exports = router;