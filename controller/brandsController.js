const Brand = require("../models/brand");

exports.createOrUpdateBrands = async (req, res) => {
  try {
    const { _id, name, logo } = req.body.brand;

    const brand = await Brand.findOneAndUpdate(
      { _id },
      {
        name,
        logo,
      },
      { new: true }
    );
    if (brand) {
      res.json(brand);
    } else {
      const newBrand = await new Brand(req.body.brand).save();
      res.json(newBrand);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Brand failed");
  }
};

exports.list = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Brand.countDocuments({});

  const brands = await Brand.find({})
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex)
    .exec();

  res.json({
    data: brands,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

exports.listAll = async (req, res) => {
  const brands = await Brand.find({}).sort({ createdAt: -1 }).exec();
  res.json(brands);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Brand.findOneAndRemove({
      _id: req.params._id,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Brand delete failed");
  }
};

exports.read = async (req, res) => {
  const brand = await Brand.findOne({ _id: req.params._id }).exec();
  res.json(brand);
};

exports.deleteMany = async (req, res) => {
  try {
    await Brand.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Brands!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
