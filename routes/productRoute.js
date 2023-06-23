const schemas = require('../config/JOISchemas');
const { configDatabase } = require('../config/configDatabaseName');
const { adminAuthentication, validateClient } = require('../middleware/auth');
const catchAsyncError = require('../middleware/catchAsyncError');
const inputValidator = require('../middleware/inputValidator');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');
const cloudinary = require("cloudinary").v2;
const router = require('express').Router();

// Get Products --Client API
router.route("/products").get( validateClient, inputValidator(schemas.productsList, 'query') ,catchAsyncError( async(req, res)=> {
    // Query Parameters: { name: String, category: Undefined/integer, page: integer}
    const products = await Product.find(['product_id', 'product_name', 'price', 'stock', 'images'], {product_name: req.query.name, category_id: req.query.category, page: req.query.page});
    const numberOfProducts = await Product.count({product_name: req.query.name, category_id: req.query.category})

    return res.status(200).json({
        success: true,
        products,
        numberOfProducts,
    })
})
)

//Get Single Product --Client API
router.route("/product/:id").get( validateClient ,inputValidator(schemas.paramsId, 'params') ,catchAsyncError( async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);
  
    if (!product) {
        return res.status(400).json({
            success: false,
            message: "Product Not Found"
        });
    }
    // if(product.category_id !== null) console.log(product.category_id)
    if(product.category_id !== null) product.category_name = (await Category.findById(product.category_id)).category_name;
    
    res.status(200).json({
      success: true,
      product
    });
    })
);




//Create Product --Admin API 
router.route('/admin/product/create').post(adminAuthentication, inputValidator(schemas.productCreate, 'body') ,catchAsyncError( async (req, res, next) => {

    let images = "";

    for (let i = 0; i < imageLinks.length; i++) {
        const result = await cloudinary.uploader.upload(imageLinks[i]);
        images += (result.public_id) + ";";
    }


    await configDatabase(req.admin.db);
    const product = new Product(req.body)
    await product.save()

    res.status(200).json({
        success: true,
        message: "Product Created successfully!"
    });
})
);


//Delete And Update Product --Admin API
router.route('/admin/product/:id').delete(adminAuthentication, inputValidator(schemas.paramsId, 'params') ,catchAsyncError( async(req, res, next)=>{
    await configDatabase(req.admin.db);
    const targetedProduct = await Product.findById(req.params.id)
    if(targetedProduct === undefined){
        return res.status(400).json({
            success: false,
            message: "Invalid Id"
        })
    }
    const images = targetedProduct.images;
    // Delete Image from Cloudinary

    await Product.deleteById(product_id)
    res.status(200).json({
        success: true,
        message: "Product Deleted successfully!" 
    });
})).patch(adminAuthentication, inputValidator(schemas.paramsId, 'params') ,catchAsyncError( async(req, res, next)=>{
    
    const product_id = req.params.id
    let { product_name, price, category_id, description_short, description_long, stock, imageLinks} = req.body;

    if(!product_name || !price || !stock){
        return res.status(206).json({
            success: false,
            message: "Please give Full Details"
        });
    }

    await configDatabase(req.admin.db);
    const targetedProduct = await Product.findById(product_id)
    if(targetedProduct === undefined){
        return res.status(400).json({
            success: false,
            message: "Invalid Id"
        })
    }
    const oldImages = targetedProduct.images

    // Delete oldImages from cloudinary
    
    if(imageLinks === undefined) imageLinks = []
    else if (typeof imageLinks === "string") {
        imageLinks = [imageLinks]
    } 

    let images = "";

    for (let i = 0; i < imageLinks.length; i++) {
        const result = await cloudinary.uploader.upload(imageLinks[i]);
        images += (result.public_id) + ";";
    }


    await configDatabase(req.admin.db);
    await Product.updateById(product_id, { product_name, price,categorydb
    });
}))


// router.route('/admin/products').get( adminAuthentication ,getproducts);




module.exports = router;