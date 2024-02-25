const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadImageToS3 } = require("../AWS_S3/s3");
const Restaurent = require("../models/RestaurentModel");
const Employee = require("../models/EmployeeModel");

const loginEmployee = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const employee = await Employee.findOne({ email });
  const employee_restaurant = employee.RestaurentID; // Corrected property name
  const restaurent_name = await Restaurent.findOne({
    _id: employee_restaurant,
  }); // Corrected property name

  if (employee && (await bcrypt.compare(password, employee.password))) {
    res.status(200).json({
      _id: employee.id,
      user_name: employee.employee_name,
      phone: employee.phone,
      email: employee.email,
      employee_role: employee.employee_role,
      restaurent_id: employee.RestaurentID,
      restaurent_name: restaurent_name.Restaurent_name,
      Restaurent_image: restaurent_name.Restaurent_Logo,
      token: await generateToken(employee.id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect Employee credentails");
  }
});

const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { loginEmployee };
