const catchAsyncError = require("../middleware/catchAsyncError");
const dbInsertQuery = require("../utils/dbInsertQuery");
const dbQuery = require("../utils/dbQuery");




exports.getproducts = catchAsyncError( async (req, res, next) =>{
    const products = await dbQuery(`select * from client1.product`);
    res.status(500).json({
        success: true,
        products
    });
});

exports.createProduct = catchAsyncError( async (req, res, next) => {
    const {name, price, description, stock} = req.body;
    if(!name || !price || !stock){
        return res.send(206).json({
            success: false,
            message: "Please give Full Details"
        });
    }
    const product = {
        name, price, description, stock
    }
    await dbInsertQuery(`INSERT INTO ${'client'+req.user.id}.product SET ? `, product );
    return res.json({
        success: true,
        message: "Product created Successfully"
    });
});