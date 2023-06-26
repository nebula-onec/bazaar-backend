const schemas = require("../config/JOISchemas");
const { userAuthentication } = require("../middleware/auth");
const catchAsyncError = require("../middleware/catchAsyncError");
const inputValidator = require("../middleware/inputValidator");
const Address = require("../models/addressModel");

const router = require("express").Router();


router.route("/address").get(userAuthentication, catchAsyncError( async(req, res, next)=> {
    const address = await Address.find(req.user.user_id);
    res.status(200).json({
        success: true,
        address
    })
}));

router.route("/address/new").post(userAuthentication ,inputValidator(schemas.createAddress, 'body'), catchAsyncError( async(req, res, next)=> {
    req.body.user_id = req.user.user_id
    const add1 = new Address(req.body);
    await add1.save();
    res.status(201).json({
        success: true,
        message: "Address Created Successfully"
    })
})) 

module.exports = router;