const { Int32 } = require("bson");
const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema(
  {
    employee_name: {
      type: String,
      required: [true, "Please enter your first name"],
    },
    phone: {
      type: String,
      required: [true, "Please enter your phone"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    image: {
      type: String,
    },
    employee_role: {
      type: String,
      default: true,
    },
    RestaurentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Restaurent",
      required: true
    }
  },
  { collection: "Employee", timestamps: true }

);

module.exports = mongoose.model("Employee", employeeSchema);
