const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "user",
    },
    photo: String,
    dob: Date,
    gender: String,
    phone: String,
    company: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
