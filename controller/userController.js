const Users = require("../models/user");

exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.json({
      users,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.readUser = async (req, res) => {
  const { _id } = req.body;
  try {
    const user = await Users.find({ _id });
    res.json({
      user,
    });
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email } = req.user;
    const { authorization } = req.headers;
    const user = await Users.findOne({ email });
    if (user) {
      res.json({ user, accessToken: authorization });
    } else {
      res.status(401).json("User Not Found");
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.createOrUpdateUser = async (req, res) => {
  try {
    const { email } = req.user;
    const { name } = req.body;
    const { authorization } = req.headers;
    const user = await Users.findOneAndUpdate(
      { email },
      { name, email },
      { new: true }
    );
    if (user) {
      res.json({ user, accessToken: authorization });
    } else {
      const newUser = await new Users(req.user).save();
      res.json({ user: newUser, accessToken: authorization });
    }
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await Users.findOneAndDelete({ _id: req.params._id });
    res.json(deletedUser);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
