const Coupon = require("../models/coupon");

exports.createOrUpdateCoupon = async (req, res) => {
  try {
    const { name, expiryDate, discount, _id } = req.body.coupon;
    const coupon = await Coupon.findOneAndUpdate(
      { _id },
      {
        name,
        expiryDate,
        discount,
      },
      { new: true }
    );
    if (coupon) {
      res.json(coupon);
    } else {
      const newCoupon = await new Coupon({
        name,
        expiryDate,
        discount,
      }).save();
      res.json(newCoupon);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Coupon Code failed");
  }
};

exports.list = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Coupon.countDocuments({});

  const CouponCodes = await Coupon.find({})
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex);

  res.json({
    data: CouponCodes,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Coupon.findOneAndDelete({ _id: req.params._id });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Coupon delete failed");
  }
};

exports.deleteMany = async (req, res) => {
  try {
    await Coupon.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Coupon Codes!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
