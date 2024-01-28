const { Int32 } = require("bson");
const mongoose = require("mongoose");

const TimeOffSchema = mongoose.Schema(
  {
    Employee_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    Time_Off_Start_Date: {
      type: String,
    },
    Time_Off_End_Date: {
      type: String,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "Announcement", timestamp: true }
);

module.exports = mongoose.model("Announcement", AnnouncementSchema);
