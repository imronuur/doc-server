const Users = require("../models/user");
const { defaultAuth } = require("../firebase/");
const cartRepository = require("../repos/cart");

exports.getUsers = async (req, res) => {
  try {
    const { page } = req.query;
    const LIMIT = 5;
    const startIndex = Number(page) * LIMIT;
    const total = await Users.countDocuments({});

    const users = await Users.find({})
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .skip(startIndex)
      .exec();
    res.json({
      data: users,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
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
      const cartId = await cartRepository.getCartId({ _id: user._id });
      res.json({ user, accessToken: authorization, cartId });
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
      const newUser = await new Users({ name, email }).save();
      res.json({ user: newUser, accessToken: authorization });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
exports.createUserProfile = async (req, res) => {
  try {
    const { _id, name, phone, dob } = req.body.user;
    const user = await Users.findOneAndUpdate(
      { _id },
      { name, phone, dob },
      { new: true }
    );
    if (user) {
      res.json({ user });
    } else {
      res.status(500).json({ message: "User Not Found " });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
};
exports.deleteUser = async (req, res) => {
  const { email } = req.headers;
  const notAllowedToBeDeletedRoles = ["superAdmin", "admin"];
  try {
    const user = Users.findOne({ _id: req.params._id });

    if (notAllowedToBeDeletedRoles.includes(user.role)) {
      res.status(500).send({
        message: "You can not delete Users with superAdmin or admin roles",
      });
    } else {
      const { uid } = await defaultAuth.getUserByEmail(email);
      if (uid) {
        await defaultAuth.deleteUser(uid);
        const deletedUser = await Users.findOneAndDelete({
          _id: req.params._id,
        });
        res.json({ message: `Deleted User ${deletedUser.name}` });
      }
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.adminAddUser = async (req, res) => {
  try {
    const {
      _id,
      name,
      role,
      phone,
      email,
      address,
      dob,
      gender,
      company,
      photo,
    } = req.body.user;
    const user = await Users.findOneAndUpdate(
      { _id },
      { name, phone, role, email, address, dob, gender, company, photo },
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

exports.deleteMany = async (req, res) => {
  try {
    await Users.deleteMany({ _id: req.body.ids });
    res.status(200).send({ message: "Deleted Many Users!" });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.saveAddress = async (req, res) => {
  try {
    const updatedAddress = await Users.findOneAndUpdate(
      { email: req.user.email },
      { address: req.body.address }
    );
    res.json(updatedAddress);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addAddress = async (req, res) => {
  try {
    const { address, email } = req.body.user;

    await Users.findOneAndUpdate(
      { email: email },
      { $addToSet: { address } }
    ).exec();

    res.json({ ok: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAddress = async (req, res) => {
  try {
    const { email } = req.user;
    console.log(email);
    const addresses = await Users.findOne({ email }).select("address").exec();
    res.json(addresses);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.removeAddress = async (req, res) => {
  try {
    const { _id, email } = req.body.user;
    await Users.findOneAndUpdate(
      { email },
      { $pull: { address: { _id: _id } } }
    ).exec();
    res.json({ ok: true });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
