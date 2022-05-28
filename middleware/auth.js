/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const { defaultAuth } = require("../firebase/");
const Role = require("../models/role");
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    const user = await defaultAuth.verifyIdToken(auth);
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).send(err.message);
  }
};

exports.tokenCheck = async (req, res) => {
  let auth = req.headers.authorization;
  try {
    let user = await defaultAuth.verifyIdToken(auth);
    if (user) res.status(200).send("Valid Token");
  } catch (err) {
    res.send(401, "Expired Token");
  }
};

const getPermissions = async (role) => {
  const roles = await Role.findOne({ name: role }).exec();
  if (!roles) return [];
  return roles.permissions;
};

exports.checkPermissions = (...permissions) => {
  return async (req, res, next) => {
    const { email } = req.user;
    const user = await User.findOne({ email }).exec();
    if (!user.role) return res.status(404).json({ msg: "User role not found" });

    let userPermissions = await getPermissions(user.role);

    if (
      user &&
      permissions.every((permission) => userPermissions.includes(permission))
    )
      return next();

    res.status(403).json({ message: "Forbidden" });
  };
};
