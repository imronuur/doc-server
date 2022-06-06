const Article = require("../models/article");

exports.createOrUpdateArticles = async (req, res) => {
  try {
    const {
      _id,
      userId,
      title,
      description,
      author,
      content,
      image,
      tags,
      publish,
      comments,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body.article;

    const article = await Article.findOneAndUpdate(
      { _id },
      {
        userId,
        title,
        description,
        author,
        content,
        image,
        tags,
        publish,
        comments,
        metaTitle,
        metaDescription,
        metaKeywords,
      },
      { new: true }
    );
    if (article) {
      res.json(article);
    } else {
      const newArticle = await new Article(req.body.article).save();
      res.json(newArticle);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Article failed");
  }
};

exports.list = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Article.countDocuments({});

  const articles = await Article.find({})
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex)
    .exec();

  res.json({
    data: articles,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

exports.listAll = async (req, res) => {
  const articles = await Article.find({}).sort({ createdAt: -1 }).exec();
  res.json(articles);
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Article.findOneAndRemove({
      _id: req.params._id,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Article delete failed");
  }
};

exports.read = async (req, res) => {
  const article = await Article.findOne({ _id: req.params._id }).exec();
  res.json(article);
};

exports.deleteMany = async (req, res) => {
  try {
    await Article.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Articles!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
