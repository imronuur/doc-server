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

exports.listAll = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("subCategories")
      .exec();

    res.json({
      data: products,
      status: 200,
    });
  } catch (error) {
    res.json({
      error: error.message,
      status: 400,
    });
  }
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
  const product = await Product.findOne({ _id: req.params._id })
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
      images: [
        "https://firebasestorage.googleapis.com/v0/b/silicon-ecom.appspot.com/o/cubes.png?alt=media&token=1de750b8-f99f-4e29-b218-82f900c71174",
      ],
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

exports.listHighDiscountProducts = async (req, res) => {
  try {
    await Product.find({}).sort();
    res.status(200).send({ message: "Deleted Many Products!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.listNewestProducts = async (req, res) => {
  try {
    const newProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(6)
      .exec();
    res.status(200).send(newProducts);
    console.log(newProducts.length);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.listTopRatedProducts = async (req, res) => {
  try {
    await Product.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Products!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.productRating = async (req, res) => {
  const product = await Product.findById(req.params._id).exec();
  const { _id, rating, comment } = req.body;
  const user = await User.findOne({ _id }).exec();

  let existingRatingObject = product.review.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // if user haven't left rating yet, push it
  if (existingRatingObject === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { review: { rating, postedBy: user._id, comment } },
      },
      { new: true }
    ).exec();
    console.log("ratingAdded", ratingAdded);
    res.json(ratingAdded);
  } else {
    // if user have already left rating, update it
    const ratingUpdated = await Product.updateOne(
      {
        review: { $elemMatch: existingRatingObject },
      },
      { $set: { "review.$.rating": rating, "review.$.comment": comment } },
      { new: true }
    ).exec();
    console.log("ratingUpdated", ratingUpdated);
    res.json(ratingUpdated);
  }
};
