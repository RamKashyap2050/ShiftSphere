const { Int32 } = require("bson");
const mongoose = require("mongoose");

const ShiftScheduleSchema = mongoose.Schema(
  {
    Employee_Number: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Employee",
    },

    Shift_date: {
      type: Date,
      required: [true, "Please enter your Date"],
    },
    Shift_Time_In: {
      type: String,
      required: [true, "Please enter your Shift_Time_In"],
    },
    Shift_Time_Out: {
      type: String,
      required: [true, "Please enter your Shift_Time_Out"],
    },
    Total_Hours: {
        type: Number
    }
  },
  { collection: "ShiftSchedule", timestamps: true }
);

module.exports = mongoose.model("ShiftSchedule", ShiftScheduleSchema);
