const Invoice = require("../models/invoice");

exports.createOrUpdateInvoice = async (req, res) => {
  try {
    const {
      dueDate,
      dateCreated,
      items,
      total,
      subTotal,
      notes,
      status,
      invoiceNumber,
      type,
      creator,
      refTo,
      _id,
    } = req.body.invoice;
    const invoice = await Invoice.findOneAndUpdate(
      { _id },
      {
        dueDate,
        dateCreated,
        items,
        total,
        subTotal,
        notes,
        status,
        invoiceNumber,
        type,
        creator,
        refTo,
      },
      { new: true }
    );
    if (invoice) {
      res.json(invoice);
    } else {
      const newInvoice = await new Invoice({
        dueDate,
        dateCreated,
        items,
        total,
        subTotal,
        notes,
        status,
        invoiceNumber,
        type,
        creator,
        refTo,
      }).save();
      res.json(newInvoice);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Create invoice failed");
  }
};

exports.list = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Invoice.countDocuments({});

  const invoices = await Invoice.find({})
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex)
    .exec();

  res.json({
    data: invoices,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};
