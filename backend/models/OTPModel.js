const { Int32 } = require("bson");
const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema(
  {
    HashedMetaData: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: 0,
    },
  },
  { collection: "OTPModel", timestamp: true }
);

module.exports = mongoose.model("OTPModel", OTPSchema);
