const { User } = require("../models");
const Jwt = require("../helper/jwt");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    req.loggedInUser = Jwt.Verify(req.headers.access_token);
    console.log(req.loggedInUser, "<<<<<<<<<<<<< req login User");
    const user = User.findByPk(req.loggedInUser.id);
    if (!user) {
      throw createError(404, "User not found!");
    } else {
      next();
    }
  } catch (err) {
    console.log(err, "<<<<<< dari catch error handler");
    next(err);
  }
};
