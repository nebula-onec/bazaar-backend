const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const dbQuery = require("../utils/dbQuery");

exports.isAuthenticatedAdmin = catchAsyncError(async (req, res, next) => {

  const { token } = req.cookies;
  
  if (!token) {
    return res.status(401).json({ success: false, message: "Please Login to access this resource" });
  }

  const decodedData = jwt.verify(token, process.env.JWT_ADMIN_SECRET);

  req.user = ( await dbQuery(`select id from master.user where id = ${decodedData.id}`) )[0];

  next();
});

