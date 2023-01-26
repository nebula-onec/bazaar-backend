const { getOrderDetails } = require("../controllers/orderController");
const { isAuthenticatedAdmin } = require("../middleware/auth");

const router = require("express").Router();

router.route("/admin/getorderdetails").get(isAuthenticatedAdmin, getOrderDetails);

module.exports = router;