const {adminLogin, logout } = require("../controllers/userController");
const express = require("express");

const router = express.Router();
router.route("/admin/login").post( adminLogin );
router.route("/admin/logout").get(logout);


module.exports = router;