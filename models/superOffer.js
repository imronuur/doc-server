const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const superOfferSchema = new mongoose.Schema(
  {
    title: String,
    subTitle: String,
    price: Number,
    product: {
      type: ObjectId,
      ref: "Product",
    },
    expiryDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperOffer", superOfferSchema);
