const Order = require("../models/order");
const Product = require("../models/product");

exports.createOrder = async (req, res) => {
  try {
    const { orderBy, orderTo, products, orderInfo, address } = req.body.order;

    let newOrder = await new Order({
      products,
      orderInfo,
      orderBy,
      orderTo,
      address,
    }).save();

    let bulkOption = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.product },
          update: { $inc: { available: -item.count, sold: +item.count } },
        },
      };
    });

    await Product.bulkWrite(bulkOption, {});

    res.json(newOrder);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.listAllOrders = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Order.countDocuments({});

  const orders = await Order.find({})
    .populate("products.product")
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex)
    .exec();

  res.json({
    data: orders,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

exports.getUserOrders = async (req, res) => {
  try {
    const { _id } = req.body;

    const { page } = req.query;
    const LIMIT = 5;
    const startIndex = Number(page) * LIMIT;
    const total = await Order.countDocuments({ orderBy: _id });

    const userOrders = await Order.find({ orderBy: _id })
      .populate("products.product")
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .exec();
    res.json({
      data: userOrders,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};
exports.readUserOrder = async (req, res) => {
  try {
    const userOrder = await Order.findOne({ _id: req.params._id })
      .populate("products.product")
      .exec();

    res.json(userOrder);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.updateOrderStatus = async (req, res) => {
  const { orderId, orderStatus } = req.body.status;

  try {
    const updated = await Order.findByIdAndUpdate(
      { _id: orderId },
      { orderStatus },
      { new: true }
    ).exec();
    res.json(updated);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Order.findOneAndDelete({ _id: req.params._id });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Order delete failed");
  }
};
exports.deleteMany = async (req, res) => {
  try {
    await Order.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Orders!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
// exports.createCashOrder = async (req, res) => {
//   const { COD, couponApplied } = req.body;
//   // if COD is true, create order with status of Cash On Delivery

//   if (!COD) return res.status(400).send("Create cash order failed");

//   const user = await User.findOne({ email: req.user.email }).exec();

//   let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

//   let finalAmount = 0;

//   if (couponApplied && userCart.totalAfterDiscount) {
//     finalAmount = userCart.totalAfterDiscount * 100;
//   } else {
//     finalAmount = userCart.cartTotal * 100;
//   }

//   let newOrder = await new Order({
//     products: userCart.products,
//     paymentIntent: {
//       id: uniqueid(),
//       amount: finalAmount,
//       currency: "usd",
//       status: "Cash On Delivery",
//       created: Date.now(),
//       payment_method_types: ["cash"],
//     },
//     orderdBy: user._id,
//     orderStatus: "Cash On Delivery",
//   }).save();

//   // decrement quantity, increment sold
//   let bulkOption = userCart.products.map((item) => {
//     return {
//       updateOne: {
//         filter: { _id: item.product._id }, // IMPORTANT item.product
//         update: { $inc: { quantity: -item.count, sold: +item.count } },
//       },
//     };
//   });

//   let updated = await Product.bulkWrite(bulkOption, {});
//   console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

//   console.log("NEW ORDER SAVED", newOrder);
//   res.json({ ok: true });
// };
