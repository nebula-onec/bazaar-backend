const { createProduct, getproducts, deleteProduct  } = require('../controllers/productController');
const { isAuthenticatedAdmin } = require('../middleware/auth');

const router = require('express').Router();

router.route('/admin/products').get( isAuthenticatedAdmin ,getproducts);
router.route('/admin/createproduct').post(isAuthenticatedAdmin, createProduct);
router.route('/admin/deleteproduct').delete(isAuthenticatedAdmin, deleteProduct);


module.exports = router;