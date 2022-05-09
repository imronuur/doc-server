const Role = require("../models/role");

exports.createOrUpdateRole = async (req, res) => {
  try {
    const { name, permissions, _id } = req.body.role;

    const role = await Role.findOneAndUpdate(
      { _id },
      {
        name,
        permissions,
      },
      { new: true }
    );
    if (role) {
      res.json(role);
    } else {
      const newRole = await new Role(req.body.role).save();
      res.json(newRole);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Role failed");
  }
};

exports.getRoles = async (req, res) => {
  const { page } = req.query;
  const LIMIT = 5;
  const startIndex = Number(page) * LIMIT;
  const total = await Role.countDocuments({});

  const roles = await Role.find({})
    .sort({ createdAt: -1 })
    .limit(LIMIT)
    .skip(startIndex)
    .exec();

  res.json({
    data: roles,
    currentPage: Number(page),
    numberOfPages: Math.ceil(total / LIMIT),
  });
};

exports.deleteRole = async (req, res) => {
  try {
    const deleted = await Role.findOneAndRemove({
      _id: req.params._id,
    }).exec();
    res.json(deleted);
  } catch (err) {
    console.log(err);
    return res.staus(400).send("Role delete failed");
  }
};

exports.readRole = async (req, res) => {
  const role = await Role.findOne({ _id: req.params._id }).exec();
  res.json(role);
};

exports.addRolePermission = async (req, res) => {
  try {
    let { permissions } = req.body;

    const role = await Role.findOneAndUpdate(
      { _id: req.params._id },
      { $addToSet: { permissions } },
      { new: true }
    );
    if (!role) return res.status(404).json("Not founded");

    res.json(role);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
