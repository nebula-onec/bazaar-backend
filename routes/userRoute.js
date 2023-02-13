const {adminLogin, logout, homePage } = require("../controllers/userController");
const express = require("express");
const { isAuthenticatedAdmin } = require("../middleware/auth");

const router = express.Router();
router.route("/admin/login").post( adminLogin );
router.route("/admin/logout").get(logout);
router.route("/admin/home", isAuthenticatedAdmin, homePage);


module.exports = router;