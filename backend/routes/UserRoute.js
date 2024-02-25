const express = require("express");
const { loginEmployee } = require("../controllers/UserController");
const router = express.Router();

router.route("/login/").post(loginEmployee);


module.exports = router;
