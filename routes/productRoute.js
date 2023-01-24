const { createProduct, getproducts  } = require('../controllers/productController');
const { isAuthenticatedAdmin } = require('../middleware/auth');

const router = require('express').Router();

router.route('/admin/products').get( isAuthenticatedAdmin ,getproducts);
router.route('/admin/createproduct').post(isAuthenticatedAdmin, createProduct);


module.exports = router;