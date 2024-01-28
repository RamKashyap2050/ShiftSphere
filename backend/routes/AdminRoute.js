const express = require("express");
const router = express.Router();
const { loginAdmin, addRestaurent, addManager, getRestaurent, getWorkforce } = require("../controllers/AdminController");

router.route("/login/").post(loginAdmin);
router.route("/addRestaurent").post(addRestaurent)
router.route("/addManager").post(addManager)
router.route("/getrestaurent").get(getRestaurent)
router.route("/getworkforce").get(getWorkforce)

module.exports = router;
