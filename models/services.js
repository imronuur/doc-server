const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String },
  techStacks: [],
  process: [],
  benifts: [],
  consider: { type: String },
});

module.exports = mongoose.model("Service", serviceSchema);
