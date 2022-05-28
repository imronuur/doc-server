const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const brandSchema = new mongoose.Schema(
  {
    name: String,
    logo: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
