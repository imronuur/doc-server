const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        count: Number,
        size: String,
      },
    ],
    orderInfo: {},
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Cash On Delivery",
        "processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
    orderBy: { type: ObjectId, ref: "User" },
    orderTo: { type: ObjectId, ref: "Client" },
    address: [],
    paymentType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
