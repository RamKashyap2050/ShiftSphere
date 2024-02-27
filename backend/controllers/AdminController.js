const asyncHandler = require("express-async-handler");
const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { uploadImageToS3 } = require("../AWS_S3/s3");
const Restaurent = require("../models/RestaurentModel");
const Employee = require("../models/EmployeeModel");
const nodemailer = require("nodemailer");
const OTPModel = require("../models/OTPModel");
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

const change_password = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401).json({ status: 401, message: "Enter Your Email" });
  }

  try {
    //Take Email and find user with that Email and Create a random OTP
    const userfind = await Employee.findOne({ email });
    const OTP = Math.floor(100000 + Math.random() * 900000);
    //We create A Metadata Hash using the combination of email and OTP and assign a default expiry time using expiresAt
    const metadata = OTP + userfind.email;
    const salt = await bcrypt.genSalt(10);
    const hashedmetadata = await bcrypt.hash(metadata, salt);
    const expirationTime = new Date(Date.now() + 120 * 1000); // 120 seconds
    console.log("Email and OTP during Generation", userfind.email, OTP);
    console.log(
      "This for Meta Data created during Change Password",
      hashedmetadata
    );
    const otpRecord = OTPModel.create({
      HashedMetaData: hashedmetadata,
      expiresAt: expirationTime,
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODE_MAILER_USER,
        pass: process.env.NODE_MAILER_PASS,
      },
    });
    const mailOptions = {
      from: process.env.NODE_MAILER_USER,
      to: userfind.email,
      subject: "OTP for Password reset",
      html: `<!DOCTYPE html>
      <html lang="en">
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>OTP Email</title>
      <style>
          /* Font styles */
          body {
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              margin: 0;
              padding: 0;
          }
          h1 {
              font-size: 24px;
          }
          p {
              font-size: 18px;
          }
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
          }
          .otp {
              font-size: 36px;
              font-weight: bold;
              text-align: center;
              margin-bottom: 20px;
          }
          .disclaimer {
              margin-top: 20px;
              font-size: 14px;
          }
      </style>
      </head>
      <body>
          <div class="container">
              <h1>OTP Email</h1>
              <p>Your One-Time Password (OTP) is:</p>
              <div class="otp">${OTP}</div>
              <p>Please use this OTP to complete your Password Reset.</p>
              
              <hr>
      
              <p><strong>Important:</strong> Do not share your OTP with anyone.</p>
              <p>Sharing your OTP can lead to unauthorized access to your account and may result in data theft or other security breaches.</p>
      
              <p>ShiftSphere takes the security of your information seriously. We are not responsible for any data damage caused by voluntarily sharing your OTP.</p>
              
              <hr>
      
              <p>If you did not request this OTP, please contact us immediately at <a href="mailto:ShiftSphere@gmail.com">ShiftSphere@gmail.com</a>.</p>
              
              <p>Thank you,</p>
              <p>ShiftSphere Team</p>
              
              <p class="disclaimer">This is an automated email. Please do not reply to this message.</p>
          </div>
      </body>
      </html>`,
    };
    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(401).json({ status: 401, message: "email not send" });
          reject(error);
        } else {
          res.status(202).json({ email, hashedmetadata });
        }
      });
    });
  } catch (error) {
    res.status(401).json({ status: 401, message: "invalid user" });
  }
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { email, OTP, hashedmetadata } = req.query;
  try {
    // Generate hashed OTP from input data
    const metadata = OTP + email;
    // const salt = await bcrypt.genSalt(10);
    // const hashedOTP = await bcrypt.hash(metadata, salt);
    console.log("Email and OTP during Verification", email, OTP);
    // console.log("This Hashed OTP during Verify OTP", hashedOTP)
    const otpRecords = await OTPModel.find({}, "HashedMetaData");

    for (const otpRecord of otpRecords) {
      const isMatch = await bcrypt.compare(metadata, otpRecord.HashedMetaData);
      if (isMatch) {
        return res
          .status(200)
          .json({ status: 200, message: "OTP verified successfully" });
      } else {
        // If no OTP record is found, the OTP is invalid
        return res.status(401).json({ status: 401, message: "Invalid OTP" });
      }
    }
  } catch (error) {
    // If an OTP record is found, it means the OTP is valid
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

const getWorkforce = asyncHandler(async (req, res) => {
  const getEmployee = await Employee.find({})
    .populate(
      "RestaurentID",
      "Restaurent_name Restaurent_phone Restaurent_Logo Restaurent_email"
    )
    .select("RestaurentID employee_name employee_role phone email ");

  res.status(200).json(getEmployee);
});
const generateToken = async (id) => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  loginAdmin,
  addRestaurent,
  addManager,
  getRestaurent,
  getWorkforce,
  change_password,
  verifyOTP,
};
