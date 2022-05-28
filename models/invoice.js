const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const InvoiceSchema = mongoose.Schema(
  {
    dueDate: Date,
    dateCreated: Date,
    items: [
      {
        itemName: String,
        unitPrice: String,
        quantity: String,
        discount: String,
      },
    ],
    total: Number,
    subTotal: Number,
    notes: String,
    status: String,
    invoiceNumber: String,
    type: String,
    creator: String,
    refTo: { type: ObjectId, ref: "Client" },
    totalAmountReceived: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
