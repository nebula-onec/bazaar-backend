const { getOrderDetails } = require("../controllers/orderController");

const router = require("express").Router();

router.route("/admin/getorderdetails").get(getOrderDetails);

module.exports = router;