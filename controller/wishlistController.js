const User = require("../models/user");

exports.addToWishlist = async (req, res) => {
  const { _id } = req.body;

  await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: _id } }
  ).exec();

  res.json({ ok: true });
};

exports.getWishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};

exports.removeFromWishlist = async (req, res) => {
  const { _id } = req.params;
  await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: _id } }
  ).exec();

  res.json({ ok: true });
};
