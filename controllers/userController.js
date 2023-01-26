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