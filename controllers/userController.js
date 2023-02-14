const dbQuery = require("../utils/dbQuery");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/sendToken");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.adminLogin = catchAsyncError( async (req, res, next) => {
  const dbName = 'master';
  const { email, password} = req.body;
    
  if (!email || !password) {
    return res.status(401).json({ success: false, message: "Please Enter Email & Password"});
  }
  
  const user = await dbQuery(`select id, email, password from user where email = '${email}'`, dbName);
  if(!user[0]){
    return res.status(401).json({ success: false, message: "Invalid Email, or password"});
  }

  const isPasswordMatched = (password == user[0].password);

  if (!isPasswordMatched) {
    return res.status(401).json({ success: false, message: "Invalid Email, or password"});
  }

  sendToken( user[0].id, res);

});


exports.logout = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

exports.homePage = catchAsyncError(async(req, res, next)=>{
  const dbName = 'client'+req.user.id;

  let info = (await dbQuery(`select * from home`, dbName))[0];
  let pendingOrders = await dbQuery(`select user_order.order_id, user_order.order_date, user_order.order_status, user.user_id, user.phone  from user_order JOIN user where user_order.order_status not in (0,3) AND user_order.buyer_id=user.user_id order by user_order.order_date DESC`, dbName);

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
});