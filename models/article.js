const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const article = new mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    author: { type: String, required: true },
    content: { type: String, required: true },
    cover: {},
    tags: { type: [String], required: true },
    publish: { type: Boolean, required: true },
    comments: { type: Boolean, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    metaKeywords: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Article", article);
