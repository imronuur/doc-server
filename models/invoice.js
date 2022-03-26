import mongoose from 'mongoose'
const { ObjectId } = mongoose.Schema;

const InvoiceSchema = mongoose.Schema({
    dueDate: Date,
    dateCreated: Date,
    currency: String,
    items: [ { itemName: String, unitPrice: String, quantity: String, discount: String } ],
    rates: String,
    vat: Number,
    total: Number,
    subTotal: Number,
    notes: String,
    status: String,
    invoiceNumber: String,
    type: String,
    creator: [String],
    totalAmountReceived: Number,
    client: { type: ObjectId, ref: "User" },
    paymentRecords: [ {amountPaid: Number, datePaid: Date, paymentMethod: String, note: String, paidBy: String } ],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model("Invoice", InvoiceSchema);
