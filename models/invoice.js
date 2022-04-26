const mongoose = require("mongoose");

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
    refTo: String,
    totalAmountReceived: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
