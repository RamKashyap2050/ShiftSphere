const express = require("express");
const { Restaurent_AddItem, get_inventory, delete_item } = require("../controllers/RestaurentController");
const router = express.Router();

router.route("/restaurentadditem/").post(Restaurent_AddItem);
router.route("/get_inventory/").get(get_inventory)
router.route("/deleteitem/:productId").delete(delete_item)
module.exports = router;
