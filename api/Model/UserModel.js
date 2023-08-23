const mongoose = require("mongoose");

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
  address: [
    {
      house: { type: String },
      area: { type: String },
      landmark: { type: String },
      pincode: { type: String },
      city: { type: String },
      state: { type: String },
      phone: { type: String },
      email: { type: String },
      name: { type: String },
    },
  ],
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
});

const User = mongoose.model("User", userSchema);
module.exports = User;
