const Sub = require("../models/subCategory");
const Product = require("../models/product");
const slugify = require("slugify");

exports.createOrUpdateSubCategory = async (req, res) => {
  try {
    const { name, parent, slug } = req.body.sub;
    const sub = await Sub.findOneAndUpdate(
      { slug },
      {
        slug: slugify(name),
        name,
        parent,
      },
      { new: true }
    );
    if (sub) {
      res.json(sub);
    } else {
      const newSub = await new Sub({
        slug: slugify(name),
        name,
        parent,
      }).save();
      res.json(newSub);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Sub Category failed");
  }
};

exports.list = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Sub.countDocuments({});

  const subCategories = await Sub.find({})
    .populate("parent")
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex);

  res.json({
    data: subCategories,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

exports.read = async (req, res) => {
  let sub = await Sub.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ subs: sub }).populate("parent").exec();

  res.json({
    sub,
    products,
  });
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;
  try {
    const updated = await Sub.findOneAndUpdate(
      { slug: req.params.slug },
      { name, parent, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Sub update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Sub delete failed");
  }
};

exports.deleteMany = async (req, res) => {
  try {
    await Sub.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Sub Categories!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
