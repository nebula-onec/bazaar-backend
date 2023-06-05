const {adminLogin, logout, homePage } = require("../controllers/userController");
const express = require("express");
const { adminAuthentication, validateClient, userAuthentication } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const { sendUserToken, sentAdminToken } = require("../utils/sendToken");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const MasterUser = require("../models/masterUserModel");
const { configDatabase } = require("../config/configDatabaseName");
const router = express.Router();

//API to test integrity of JWT Token
router.route("/wronglogin").get((req, res, next)=>{
  const token = jwt.sign({
    client_id: 1,
    id: 5
  }, process.env.JWT_USER_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + 5 * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(200).cookie("token", token, options).json({
    success: true,
    token: token,
  });
})

// Client API's
router.route('/register').post( validateClient, catchAsyncError( async(req, res, next)=> {
    let user = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password
    }
    if(user.name === undefined || user.email === undefined || user.password === undefined){
      return res.status(401).json({ success: false, message: "Please Enter name, Email & Password"}); 
    }

    user.password = await bcrypt.hash(user.password, 10);

    const userObj = new User(user);
    const {insertId} = await userObj.save();
    sendUserToken(insertId, Number(req.headers['client_id']), res);
})
)

router.route("/login").post( validateClient,catchAsyncError( async(req, res, next)=> {
  const { email, password} = req.body;
    
  if (!email || !password) {
    return res.status(401).json({ success: false, message: "Please Enter Email & Password"});
  }
  
  // returns list of matched User- However If we pass email to filter User then definitely we can have atmost one User.
  const user = (await User.find(['user_id', 'password'], {email}))[0]
  if(user === undefined){
    return res.status(401).json({ success: false, message: "Invalid Email, or password"});
  }
  // 
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return res.status(401).json({ success: false, message: "Invalid Email, or password"});
  }

  sendUserToken(user.user_id, Number(req.headers['client_id']), res);
})
)

router.route("/logout").get( catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
})
)

router.route('/cart').post(userAuthentication, catchAsyncError( async(req, res, next)=> {
  if(req.body.cart === undefined){
      return res.status(400).json({ success: false, message: 'Invalid Request No cart Data Provided'})
  }
  
  await User.updateById(req.user.user_id, {cart: JSON.stringify(req.body.cart)})

  return res.status(200).json({ success: true, message: 'Cart Updated Successfully'})
})
)


//Admin Login 
router.route("/admin/login").post(catchAsyncError( async (req, res, next) => {

  const { email, password } = req.body;
    
  if (!email || !password) {
    return res.status(401).json({ success: false, message: "Please Enter Email & Password"});
  }
  
  await configDatabase('master')
  const admin = (await MasterUser.find(['*'], {email}))[0];
  
  if(admin === undefined){
    return res.status(401).json({ success: false, message: "Invalid Email, or password"});
  }

  if (!await bcrypt.compare(password, admin.password)) {
    return res.status(401).json({ success: false, message: "Invalid Email, or password"});
  }

  sentAdminToken(admin.admin_id, res);

}));

router.route("/admin/logout").get(catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
}));


router.route("/admin/register").post(async(req, res, next)=> {
  const { email, password} = req.body;
  if(!email || !password){
    return res.status(401).json({ success: false, message: "Please Enter Super Admin Credintials"});
  }
  // 
  const isPasswordMatched = await bcrypt.compare(password, process.env.SUPER_ADMIN_PASSWORD);
  if(email !== process.env.SUPER_ADMIN_EMAIL || !isPasswordMatched){
    return res.status(401).json({ success: false, message: "Please Enter Super Admin Credintials"});
  }
  await configDatabase('master');

  res.status(200).json({
    success: true,
    message: "Admin Created Successfully"
  })
})
module.exports = router;