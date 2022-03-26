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

exports.createOrUpdateUser = async (req, res) => {
  try {
    const { _id, name, phone, email, about } = req.body.user;
    const user = await Users.findOneAndUpdate(
      { _id },
      { name, phone, email, about },
      { new: true }
    );
    if (user) {
      res.json(user);
    } else {
      const newUser = await new Users(req.body.user).save();
      res.json(newUser);
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
