const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      text: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
      text: true,
    },
    regularPrice: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    salePrice: {
      type: Number,
      required: true,
      trim: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subCategories: [
      {
        type: ObjectId,
        ref: "Sub",
      },
    ],
    available: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: [],
    inStock: Boolean,
    shipping: Boolean,
    brand: {
      type: String,
      enum: [],
    },
    size: [
      {
        sizeNo: String,
        sizePrice: String,
      },
    ],
    review: [
      {
        rating: Number,
        comment: String,
        date: Date,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
