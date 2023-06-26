const { adminAuthentication } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");

const router = require("express").Router();

router.route("/admin/category/new").post(adminAuthentication , catchAsyncError( async(req, res, next)=> {
    req.body.user_id = req.user.user_id
    const add1 = new Address(req.body);
    await add1.save();
    res.status(201).json({
        success: true,
        message: "Address Created Successfully"
    })
})) 

module.exports = router;