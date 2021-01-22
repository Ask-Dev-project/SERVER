const { User, Answer, Post } = require("../models/index");
const Jwt = require("../helper/jwt");
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.googleClient);

class UserController {
  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.googleClient,
      });
      const payload = ticket.getPayload();
      const findUser = await User.findOne({
        where: {
          email: payload.email,
        },
      });
      if (findUser) {
        const token = Jwt.Sign({
          id: findUser.id,
          email: findUser.email,
          status: findUser.status,
          nickname: findUser.nickname,
        });
        res.status(200).json(token);
      } else {
        const createUser = await User.create({
          email: payload.email,
          nickname: payload.email.split('@')[0]
        });
        const token = Jwt.Sign({
          id: createUser.id,
          email: createUser.email,
          status: createUser.status,
          nickname: createUser.nickname,
        });
        res.status(200).json(token);
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
