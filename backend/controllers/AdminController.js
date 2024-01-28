const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadImageToS3 } = require("../AWS_S3/s3");
const Restaurent = require("../models/RestaurentModel");
const Employee = require("../models/EmployeeModel");
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }

  const admin = await Admin.findOne({ email });
  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.status(200).json({
      _id: admin.id,
      user_name: admin.admin_name,
      phone: admin.phone,
      email: admin.email,
      token: await generateToken(admin.id),
    });
  } else {
    res.status(400);
    throw new Error("Incorrect Admin credentails");
  }
});

//Function to add new restaurent
const addRestaurent = asyncHandler(async (req, res) => {
  const { restaurantName, restaurantLogo, phone, email } = req.body;
  const image = req.files.restaurantLogo;
  const imageUrl = await uploadImageToS3(image);

  const addRestaurent = await Restaurent.create({
    Restaurent_name: restaurantName,
    Restaurent_phone: phone,
    Restaurent_Logo: imageUrl,
    Restaurent_email: email,
  });

  res.status(201).json({ addRestaurent });
});
const getRestaurent = asyncHandler(async (req, res) => {
  const getRestaurent = await Restaurent.find({});

  res.status(200).json(getRestaurent);
});

const addManager = asyncHandler(async (req, res) => {
  const { employee_name, phone, email, RestaurentID, employee_role } = req.body;
  console.log(employee_name, phone, email, RestaurentID, employee_role);
  const password = "12345678";
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const addManager = await Employee.create({
    employee_name: employee_name,
    phone: phone,
    email: email,
    password: hashedPassword,
    employee_role: employee_role,
    RestaurentID: RestaurentID,
  });

  res.status(201).json({ addManager });
});

const getWorkforce = asyncHandler(async(req,res) => {
    const getEmployee = await Employee.find({})
    .populate("RestaurentID", "Restaurent_name Restaurent_phone Restaurent_Logo Restaurent_email")
    .select("RestaurentID employee_name employee_role phone email ")

    res.status(200).json(getEmployee)

})
const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { loginAdmin, addRestaurent, addManager, getRestaurent, getWorkforce };
