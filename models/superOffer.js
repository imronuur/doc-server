const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const superOfferSchema = new mongoose.Schema(
  {
    title: String,
    subTitle: String,
    price: Number,
    image: String,
    product: {
      type: ObjectId,
      ref: "Product",
    },
    dateCreated: Date,
    expiryDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperOffer", superOfferSchema);
