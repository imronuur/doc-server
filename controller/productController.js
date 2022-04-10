const Product = require("../models/product");
const slugify = require("slugify");

exports.createOrUpdateProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      regularPrice,
      salePrice,
      category,
      subCategories,
      quantity,
      sold,
      images,
      inStock,
      shipping,
      brand,
      size,
      slug,
    } = req.body.product;
    const product = await Product.findOneAndUpdate(
      { slug },
      {
        slug: slugify(name),
        name,
        description,
        regularPrice,
        salePrice,
        category,
        subCategories,
        quantity,
        sold,
        images,
        inStock,
        shipping,
        brand,
        size,
      },
      { new: true }
    );
    if (product) {
      res.json(product);
    } else {
      const newProduct = await new Product({
        slug: slugify(name),
        name,
        description,
        regularPrice,
        salePrice,
        category,
        subCategories,
        quantity,
        sold,
        images,
        inStock,
        shipping,
        brand,
        size,
      }).save();
      res.json(newProduct);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Create product failed");
  }
};

exports.list = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Product.countDocuments({});

  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex)
    .populate("category")
    .populate("subCategories")
    .exec();

  res.json({
    data: products,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug })
    .populate("category")
    .populate("subCategories")
    .exec();
  res.json(product);
};

exports.bulkProduct = async (req, res) => {
  let bulkProducts = [];

  req.body.products.forEach((element) => {
    const {
      name,
      description,
      regularPrice,
      salePrice,
      quantity,
      brand,
      size,
    } = element;

    bulkProducts.push({
      name,
      slug: slugify(name),
      description,
      regularPrice,
      salePrice,
      quantity,
      brand,
      size,
    });
  });

  try {
    const newBulkProducts = await Product.insertMany(bulkProducts);
    res.status(201).send(newBulkProducts);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

exports.deleteMany = async (req, res) => {
  try {
    await Product.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Products!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
