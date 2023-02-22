const jwt = require("jsonwebtoken");

const sendToken = ( id, res) => {
    const token = jwt.sign({ id }, process.env.JWT_ADMIN_SECRET, {
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
  };
  
  module.exports = sendToken;
  