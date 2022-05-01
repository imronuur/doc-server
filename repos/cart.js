const Cart = require("../models/cart");

exports.getCart = async ({ _id }) => {
  const cart = await Cart.findOne({ cartUser: _id }).populate({
    path: "items.productId",
    select: "name price total",
  });
  return cart;
};

exports.addItem = async (payload) => {
  const newItem = await Cart.create(payload);
  return newItem;
};
