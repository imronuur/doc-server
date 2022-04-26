const Order = require("../models/order");
const Product = require("../models/product");

exports.createOrder = async (req, res) => {
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
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  await Product.bulkWrite(bulkOption, {});

  res.json(newOrder);
};

exports.listAllOrders = async (req, res) => {
  const allOrders = await Order.find({}).populate("products.product").exec();
  res.json(allOrders);
};
exports.getUserOrders = async (req, res) => {
  const userOrders = await Order.find({ orderBy: req.params._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
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
