const Offer = require("../models/superOffer");

exports.createOrUpdateSuperOffer = async (req, res) => {
  try {
    const { _id, title, subTitle, product } = req.body.offer;

    const offer = await Offer.findOneAndUpdate(
      { _id },
      {
        title,
        subTitle,
        product,
      },
      { new: true }
    );
    if (offer) {
      res.json(offer);
    } else {
      const newOffer = await new Offer(req.body.offer).save();
      res.json(newOffer);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Offer failed");
  }
};

exports.list = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Offer.countDocuments({});

  const offers = await Offer.find({})
    .sort({ createdAt: -1 })
    .populate("product")
    .limit(LIMIT)
    .skip(startIndex)
    .exec();

  res.json({
    data: offers,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Offer.findOneAndRemove({
      _id: req.params._id,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Offer delete failed");
  }
};

exports.read = async (req, res) => {
  const offer = await Offer.findOne({ _id: req.params._id }).exec();
  res.json(offer);
};

exports.deleteMany = async (req, res) => {
  try {
    await Offer.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Offers!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
