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
    paymentRecords: [
      {
        amountPaid: Number,
        datePaid: Date,
        paymentMethod: String,
        note: String,
        paidBy: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", InvoiceSchema);
