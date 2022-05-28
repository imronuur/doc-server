const Product = require("../models/product");
const User = require("../models/user");

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
      available,
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
        available,
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
        available,
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
  const LIMIT = 100;
  const startIndex = Number(page) * LIMIT;
  const total = await Product.countDocuments({});

  const products = await Product.find({})
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex)
    .populate("category")
    .populate("brand")
    .populate("review.postedBy")
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
      .populate("review.postedBy")
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
    return res.status(400).send("Product delete failed");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params._id })
      .populate("category")
      .populate("review.postedBy")
      .populate("subCategories")
      .exec();
    res.json(product);
  } catch (error) {
    return res.status(400).send("Failed to read product");
  }
};

exports.bulkProduct = async (req, res) => {
  let bulkProducts = [];

  req.body.products.forEach((element) => {
    const {
      name,
      description,
      regularPrice,
      salePrice,
      available,
      brand,
      size,
    } = element;

    bulkProducts.push({
      name,
      slug: slugify(name),
      description,
      regularPrice,
      salePrice,
      available,
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
    await Product.find({ review: req.body.ids });
    res.status(200).send({ message: "Deleted Many Products!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.productRating = async (req, res) => {
  try {
    const product = await Product.findById(req.params._id).exec();
    const { _id, rating, comment, date } = req.body;
    const user = await User.findOne({ _id }).exec();

    let existingRatingObject = product.review.find(
      (ele) => ele.postedBy.toString() === user._id.toString()
    );

    // if user haven't left rating yet, push it
    if (existingRatingObject === undefined) {
      let ratingAdded = await Product.findByIdAndUpdate(
        product._id,
        {
          $push: { review: { rating, postedBy: user._id, comment, date } },
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
        {
          $set: {
            "review.$.rating": rating,
            "review.$.comment": comment,
            "review.$.date": date,
          },
        },
        { new: true }
      ).exec();
      console.log("ratingUpdated", ratingUpdated);
      res.json(ratingUpdated);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.listRelated = async (req, res) => {
  const product = await Product.findById(req.params._id).exec();

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(5)
    .populate("category")
    .populate("subCategories")
    .populate("review.postedBy")
    .exec();

  res.json(related);
};

// Search and Filter
exports.handleNameSearch = async (req, res) => {
  const { name } = req.body;
  const products = await Product.find({ $text: { $search: name } })
    .select("_id, name")
    .limit(10)
    .exec();
  console.log(products);
  res.json(products);
};

exports.handleCategory = async (req, res) => {
  const { category } = req.body;
  const search = JSON.parse(category);
  try {
    let products = await Product.find({ category: search })
      .populate("category", "_id name")
      .populate("subCategories", "_id name")
      .populate("review.postedBy", "_id name")
      .exec();

    res.json({
      data: products,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.handleSub = async (req, res) => {
  try {
    const { sub } = req.body;
    const products = await Product.find({ subCategories: sub })
      .populate("category", "_id name")
      .populate("subCategories", "_id name")
      .populate("review.postedBy", "_id name")
      .exec();

    res.json({
      data: products,
      status: 200,
    });
    console.log({ "Products ================": products });
  } catch (error) {
    console.log(error);
  }
};

exports.handleBrand = async (req, res) => {
  const { brand } = req.body;
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .populate("review.postedBy", "_id name")
    .exec();

  res.json({
    data: products,
    status: 200,
  });
};

exports.handlePrice = async (req, res) => {
  const { price } = req.body;
  const priceRange = JSON.parse(price);

  try {
    let products = await Product.find({
      salePrice: {
        $gte: priceRange[0],
        $lte: priceRange[1],
      },
    })
      .populate("category", "_id name")
      .populate("subCategories", "_id name")
      .populate("review.postedBy", "_id name")
      .exec();

    res.json({
      data: products,
      status: 200,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.handleRating = (req, res) => {
  const { rating } = req.body;
  console.log(rating);
  Product.aggregate([
    { $unwind: { path: "$review" } },
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: { $avg: "$review.rating" }, // floor value of 3.33 will be 3
        },
      },
    },
    { $match: { floorAverage: rating } },
  ])
    .limit(10)
    .exec((err, aggregates) => {
      console.log(aggregates);
      if (err) console.log("AGGREGATE ERROR", err);
      Product.find({ _id: aggregates })
        .populate("category", "_id name")
        .populate("subCategories", "_id name")
        .populate("review.postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("PRODUCT AGGREGATE ERROR", err);
          res.json({
            data: products,
            status: 200,
          });
        });
    });
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subCategories", "_id name")
    .populate("review.postedBy", "_id name")
    .exec();

  res.json(products);
};

// exports.searchFilters = async (req, res) => {
//   const { name, query, price, category, stars, sub, shipping, brand } =
//     req.body;

//   if (name) {
//     console.log("name --->", name);
//     await handleNameSearch(req, res, name);
//   }

//   if (query) {
//     console.log("query --->", query);
//     await handleQuery(req, res, query);
//   }

//   if (price !== undefined) {
//     console.log("price ---> ", price);
//     await handlePrice(req, res, price);
//   }

//   if (category) {
//     console.log("category ---> ", category);
//     await handleCategory(req, res, category);
//   }

//   if (stars) {
//     console.log("stars ---> ", stars);
//     await handleStar(req, res, stars);
//   }

//   if (sub) {
//     console.log("sub ---> ", sub);
//     await handleSub(req, res, sub);
//   }

//   if (shipping) {
//     console.log("shipping ---> ", shipping);
//     await handleShipping(req, res, shipping);
//   }

//   if (brand) {
//     console.log("brand ---> ", brand);
//     await handleBrand(req, res, brand);
//   }
// };
