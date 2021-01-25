const { User, Answer, Post } = require("../models/index");
const Jwt = require("../helper/jwt");
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.googleClient);
const axios = require("axios");
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;
let token = null;

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
          nickname: payload.email.split("@")[0],
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
  static async changeNickname(req, res, next) {
    console.log('masukk')
    const user = req.loggedInUser;
    const { nickname } = req.body;
    try {
      const updateData = await User.update(
        { nickname },
        {
          where: {
            id: user.id,
          },
        }
      );
      res.status(201).json({message: 'Data success updated'});
    } catch (error) {
      next(error);
    }
  }
  static toGitHubLogin(req, res, next) {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientId}`
    );
  }
  static callBack(req, res, next) {
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code: req.query.code,
    };
    const opts = { headers: { accept: "application/json" } };
    axios
      .post(`https://github.com/login/oauth/access_token`, body, opts)
      .then((res) => {
        console.log(res);
        return res.data["access_token"];
      })
      .then((_token) => {
        console.log("My token:", _token);
        token = _token;
        res.json({ ok: 1 });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
}

module.exports = UserController;
