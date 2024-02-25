const express = require("express");
const router = express.Router();
const { loginAdmin, addRestaurent, addManager, getRestaurent, getWorkforce, change_password, verifyOTP } = require("../controllers/AdminController");

router.route("/login/").post(loginAdmin);
router.route("/addRestaurent").post(addRestaurent)
router.route("/addManager").post(addManager)
router.route("/getrestaurent").get(getRestaurent)
router.route("/getworkforce").get(getWorkforce)
router.route("/clientchangepassword").post(change_password)
router.route("/verifyOTP").get(verifyOTP)

module.exports = router;
