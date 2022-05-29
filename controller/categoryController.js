const Category = require("../models/category");
const Product = require("../models/product");
const Sub = require("../models/subCategory");
const slugify = require("slugify");

exports.createOrUpdateCategory = async (req, res) => {
  try {
    const { name, slug, image } = req.body.category;
    const category = await Category.findOneAndUpdate(
      { slug },
      {
        slug: slugify(name),
        name,
        image,
      },
      { new: true }
    );
    if (category) {
      res.json(category);
    } else {
      const newCategory = await new Category({
        slug: slugify(name),
        name,
        image,
      }).save();
      res.json(newCategory);
    }
  } catch (err) {
    res.status(400).send("Create category failed");
  }
};

exports.listAll = async (req, res) => {
  let categories = await Category.find({})
    .sort([["createdAt", "desc"]])
    .exec();
  res.json(categories);
};

exports.list = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Category.countDocuments({});

  const categories = await Category.find({})
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex);

  res.json({
    data: categories,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

exports.read = async (req, res) => {
  let category = await Category.findOne({ slug: req.params.slug }).exec();
  const products = await Product.find({ category }).populate("category").exec();
  res.json({
    category,
    products,
  });
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).send("Category update failed");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ slug: req.params.slug });
    res.json(deleted);
  } catch (err) {
    res.status(400).send("Category delete failed");
  }
};

exports.getSubs = (req, res) => {
  Sub.find({ parent: req.params._id }).exec((err, subs) => {
    if (err) console.log(err);
    res.json(subs);
  });
};

exports.bulkCategory = async (req, res) => {
  let bulkCategories = [];

  req.body.names.forEach((element) => {
    const { name } = element;
    bulkCategories.push({
      name,
      slug: slugify(name),
    });
  });

  try {
    const newBulkCategories = await Category.insertMany(bulkCategories);
    res.status(201).send(newBulkCategories);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteMany = async (req, res) => {
  try {
    await Category.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Categories!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
