const mongoose = require("mongoose");
const slotSchema = require("./SlotSchema");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "expert"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  iSBlock: {
    type: Boolean,
    default: false,
  },
  profile: {
    type: String,
  },
  planDuration: {
    type: Number,
  },
  planStartDate: {
    type: Date,
  },
  planEndDate: {
    type: Date,
  },
  planId: {
    type: String,
  },
  planType: {
    type: String,
  },
  checkoutSessionId: {
    type: String,
  },
  uuid: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  emailToken: {
    type: String,
  },
  filename: {
    type: String,
  },
  selectedOption: {
    type: String,
  },
  slots: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
    },
  ],
  booking: [
    {
      type:String
    }
  ],
  profile: {
    type: String,
  },
  description: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
