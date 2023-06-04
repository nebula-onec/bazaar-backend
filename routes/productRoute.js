const { configDatabase } = require('../config/configDatabaseName');
const { adminAuthentication, validateClient } = require('../middleware/auth');
const catchAsyncError = require('../middleware/catchAsyncError');
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

const router = require('express').Router();

// Get Products --Client API
router.route("/products").get( validateClient, catchAsyncError( async(req, res)=> {
    // Query Parameters: { name: product_name, category: category_id, page}
    const filters = {}
    if(req.query.name) filters.product_name = req.query.name
    if(req.query.category) filters.category_id = req.query.category
    if(req.query.page) filters.page = req.query.page
    const products = await Product.find(['product_id', 'product_name', 'price', 'stock', 'images'], filters);

    return res.status(200).json({
        success: true,
        products,
    })
})
)

//Get Single Product --Client API
router.route("/product/:id").get( validateClient ,catchAsyncError( async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);
  
    if (!product) {
        return res.status(404).json({
            success: false,
            message: "PRODUCT NOT FOUND"
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
router.route('/admin/product/create').post(adminAuthentication, catchAsyncError( async (req, res, next) => {
    let images = [];

    if (typeof req.body.images === "string") {
        images.push(req.body.images);
    } else {
        images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.uploader.upload(images[i], {
            folder: "products",
        });

        imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
        });
    }

    
    const { product_name, price, description_short, description_long, stock} = req.body;
    if(!product_name || !price || !stock){
        return res.send(206).json({
            success: false,
            message: "Please give Full Details"
        });
    }
    const product = {
        product_name, price, description_short, description_long, stock, imagesLinks
    }
    await dbInsertQuery(`INSERT INTO product SET ? `, product , dbName);
    res.status(200).json({
        success: true,
        message: "Product Created successfully!"
    });
})
);


// router.route('/admin/products').get( adminAuthentication ,getproducts);
// router.route('/admin/deleteproduct').delete(adminAuthentication, deleteProduct);




module.exports = router;