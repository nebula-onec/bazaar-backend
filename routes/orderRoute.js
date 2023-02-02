const { getOrderDetails, getPendingOrders, changeOrderStatus, getSingleOrderDetails } = require("../controllers/orderController");
const { isAuthenticatedAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.route("/admin/orders").get(isAuthenticatedAdmin, getOrderDetails);
router.route("/admin/order/:id").get(isAuthenticatedAdmin, getSingleOrderDetails); 
router.route("/admin/pendingorders").get(isAuthenticatedAdmin, getPendingOrders);
router.route("/admin/changeorderstatus").post(isAuthenticatedAdmin, changeOrderStatus);

module.exports = router;