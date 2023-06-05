const { configDatabase } = require("../config/configDatabaseName");
const connection = require("../config/database");
const MasterUser = require("../models/masterUserModel");
const User = require("../models/userModel");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");


// Checking Valid Client_Id is supplied or not 
exports.validateClient = catchAsyncError( async (req, res, next)=>{
  if(req.headers['client_id'] === undefined){
    return res.status(400).json({
        success: false,
        message: "Invalid request no client_id"
    });
  }
  let DB = 'client' + connection.escape(Number(req.headers['client_id']))
  await configDatabase(DB);
  next();
});


// Checking User is Login or Not 
exports.validateUser = async(req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return;
  }

  const decode = jwt.verify(token, process.env.JWT_USER_SECRET);

  // console.log(decode);

  if(decode.client_id === undefined || decode.id === undefined){
    return;
  }
  if(decode.client_id !== Number(req.headers['client_id'])) return;
  try{
    req.user = await User.findById(decode.id);
  }
  catch(err){
    return;
  }
  return req.user;
}



//User Token Authentication
exports.userAuthentication = catchAsyncError( async(req, res, next)=> {
  const { token } = req.cookies;
  if (token === undefined) {
    return res.status(401).json({ success: false, message: "Token nahi he! Please Login to access this resource" });
  }

  const decode = jwt.verify(token, process.env.JWT_USER_SECRET);

  // console.log(decode);

  if(decode.client_id === undefined || decode.id === undefined){
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(401).json({ success: false, message: "token galat he! Please Login to access this resource" });
  }
 
  let DB = 'client' + connection.escape(Number(decode.client_id))
  await configDatabase(DB);
  req.user = await User.findById(decode.id);
  // req.user = { user_id, name, phone, email, cart }
  if(req.user === undefined){
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(401).json({ success: false, message: "token me id galat he! Please Login to access this resource" });
  }

  next();
});






// Admin Token Authentication
exports.adminAuthentication = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ success: false, message: "Please Login to access this resource" });
  }
  

  const decode = jwt.verify(token, process.env.JWT_ADMIN_SECRET);
  
  if(decode.admin_id === undefined){
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(401).json({ success: false, message: "Please Login to access this resource" });
  }
  await configDatabase('master')
  req.admin = await MasterUser.findById(decode.admin_id);
  if(req.admin === undefined){
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    return res.status(401).json({ success: false, message: "Please Login to access this resource" });
  }

  next();

});


