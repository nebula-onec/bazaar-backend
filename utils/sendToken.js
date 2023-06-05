const jwt = require("jsonwebtoken");


// Send Token for Client App 
exports.sendUserToken = (id, client_id, res)=> {
  console.log("id: ", id, ", client_id: ", client_id);
  const payload = {
    id,
    client_id
  }

  const token = jwt.sign(payload, process.env.JWT_USER_SECRET, {
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
    success: true
  });
};


// Send Token for Admin App 
exports.sentAdminToken = ( admin_id, res) => {
    const token = jwt.sign({ admin_id }, process.env.JWT_ADMIN_SECRET, {
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
      // token: token,
    });
  };
  
      