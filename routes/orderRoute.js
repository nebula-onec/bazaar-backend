const { getOrderDetails, getPendingOrders } = require("../controllers/orderController");
const { isAuthenticatedAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.route("/admin/orders").get(isAuthenticatedAdmin, getOrderDetails);
router.route("/admin/pendingorders").get(isAuthenticatedAdmin, getPendingOrders);

module.exports = router;