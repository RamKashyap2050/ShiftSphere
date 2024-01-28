const mongoose = require("mongoose");
const EmployeeModel = require("./EmployeeModel");

const AvailabilitySchema = mongoose.Schema(
  {
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },
    availability: [
      {
        day_of_week: {
          type: Number,
          required: true,
          min: 1,
          max: 7,
        },
        start_time: {
          type: String,
          default: null,
        },
        end_time: {
          type: String,
          default: null,
        },
        is_full_day: {
          type: Boolean,
          default: false,
        },
      },
    ],
    is_Approved: {
      type: Boolean,
    },
    Approving_Manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    submitted_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Availability" }
);

module.exports = mongoose.model("Availability", AvailabilitySchema);
