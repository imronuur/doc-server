/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const { defaultAuth } = require("../firebase/");

exports.authCheck = async (req, res, next) => {
  const auth = req.headers.authorization;
  try {
    const user = await defaultAuth.verifyIdToken(auth);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};
