const { getOrderDetails, getPendingOrders, changeOrderStatus } = require("../controllers/orderController");
const { isAuthenticatedAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.route("/admin/orders").get(isAuthenticatedAdmin, getOrderDetails);
router.route("/admin/pendingorders").get(isAuthenticatedAdmin, getPendingOrders);
router.route("/admin/changeorderstatus").post(isAuthenticatedAdmin, changeOrderStatus);

module.exports = router;