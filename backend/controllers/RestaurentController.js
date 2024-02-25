const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadImageToS3 } = require("../AWS_S3/s3");
const Restaurent = require("../models/RestaurentModel");
const Employee = require("../models/EmployeeModel");
const Inventory = require("../models/InventoryModel");

const Restaurent_AddItem = asyncHandler(async (req, res) => {
  const { product_name, product_description, price, stock_number } = req.body;
  const image = req.files.image;
  const imageUrl = await uploadImageToS3(image);

  const restaurent_additem = await Inventory.create({
    product_name: product_name,
    product_description: product_description,
    price: price,
    stock_number: stock_number,
    image: imageUrl,
  });

  res.json(restaurent_additem).status(201);
});

const get_inventory = asyncHandler(async (req, res) => {
  const get_inventory = await Inventory.find({});
  res.json(get_inventory);
});

const delete_item = asyncHandler(async (req, res) => {
  const product_id = req.params.productId;
  console.log(product_id);
  const deletedItem = await Inventory.findByIdAndDelete(product_id);
  res.json("Item Deleted");
});

const add_employee = asyncHandler(async(req,res) => {
  const {employee_name, employee_role, sex, age, number, email } = req.body
  
})

module.exports = { Restaurent_AddItem, get_inventory, delete_item };
