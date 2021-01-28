const { User } = require("../models");
const Jwt = require("../helper/jwt");
const createError = require("http-errors");

module.exports = async (req, res, next) => {
  try {
    req.loggedInUser = Jwt.Verify(req.headers.access_token);
    // console.log(req.loggedInUser, "<<<<<<<<<<<<< req login User");
    const user = await User.findByPk(req.loggedInUser.id);
    if (!user) {
      console.log('masuk fake')
      throw {
        name: 'Expired-token',
        status: 404,
        message: 'Internal Server Error'
      }
    } else {
      next();
    }
  } 
  catch (err) {
    console.log('masuk fake 2')
    next(err)
  }
};
