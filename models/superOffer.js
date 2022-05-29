const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const superOfferSchema = new mongoose.Schema(
  {
    title: String,
    subTitle: String,

    product: {
      type: ObjectId,
      ref: "Product",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SuperOffer", superOfferSchema);
