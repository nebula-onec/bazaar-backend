const catchAsyncError = require("../middleware/catchAsyncError");
const dbInsertQuery = require("../utils/dbInsertQuery");
const dbQuery = require("../utils/dbQuery");
const cloudinary = require("cloudinary").v2;




//Get All Products -- Client
exports.getAllProducts = catchAsyncError ( async(req, res, next) => {
    
});

exports.getproducts = catchAsyncError( async (req, res, next) =>{
    const dbName = 'client' + req.user.id;
    const products = await dbQuery(`select * from product`, dbName);
    res.status(200).json({
        success: true,
        products
    });
});



exports.deleteProduct = catchAsyncError( async(req, res, next)=>{
    const { product_id } = req.body;
    const dbName = 'client' + req.user.id;
    await dbQuery(`delete from product where product_id = ${product_id}`, dbName);
    res.status(200).json({
        success: true,
        message: "Product Deleted successfully!" 
    });
});