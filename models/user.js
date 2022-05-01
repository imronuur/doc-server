const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "user",
    },
    address: [
      {
        address1: String,
        state: String,
      },
    ],
    wishlist: [{ type: ObjectId, ref: "Product" }],
    phone: String,
    company: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
