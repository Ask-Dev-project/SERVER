const { User, Answer, Post } = require("../models/index");
const Jwt = require("../helper/jwt");
const createError = require("http-errors");
const { OAuth2Client } = require("google-auth-library");
const { response } = require("express");
const client = new OAuth2Client(process.env.googleClient);
const axios = require("axios").default;
const clientId = process.env.clientId;
const clientSecret = process.env.clientSecret;

class UserController {
  static async googleLogin(req, res, next) {
    try {
      console.log('sebelum')
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.googleClient,
      });
      console.log('sesudah')
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
        res
          .status(200)
          .json({ access_token: token, nickname: findUser.nickname });
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
        res
          .status(200)
          .json({ access_token: token, nickname: createUser.nickname });
      }
    } catch (error) {
      next(error);
    }
  }
  static async changeNickname(req, res, next) {
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
      res.status(201).json({ message: "Data success updated" });
    } catch (error) {
      next(error);
    }
  }
  static toGitHubLogin(req, res, next) {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${clientId}`
    );
  }
  static async callBack(req, res, next) {
    const body = {
      client_id: clientId,
      client_secret: clientSecret,
      code: req.query.code,
    };
    let email, nickname;
    const opts = { headers: { accept: "application/json" } };
    axios
      .post(`https://github.com/login/oauth/access_token`, body, opts)
      .then((response) => {
        return response.data["access_token"];
      })
      .then((_token) => {
        return axios.get("https://api.github.com/user", {
          headers: {
            accept: "application/json,application/vnd.github.v3+json",
            "user-agent": "node.js",
            authorization: `token ${_token}`,
          },
        });
      })
      .then((response2) => {
        email = response2.data.email;
        nickname = response2.data.login;
        return User.findOne({
          where: {
            email: response2.data.email,
          },
        });
      })
      .then((user) => {
        if (user) {
          const token = Jwt.Sign({
            id: user.id,
            email: user.email,
            status: user.status,
            nickname: user.nickname,
          });
          res
            .status(200)
            .json({ access_token: token, nickname: user.nickname });
        } else {
          return User.create({
            email: email,
            nickname: nickname,
          });
        }
      })
      .then((user) => {
        const token = Jwt.Sign({
          id: user.id,
          email: user.email,
          status: user.status,
          nickname: user.nickname,
        });
        res.status(200).json({ access_token: token, nickname: user.nickname });
      })
      .catch((err) => res.status(500).json({ message: err.message }));
  }
}

module.exports = UserController;