const { Answer, User } = require("../models");

class AnswerController {
  static getAnswers(req, res, next) {
    Answer.findAll({
      where: {
        PostId: req.params.PostId,
      },
      order: [["id", "ASC"]],
      include: [
        {
          model: User,
        }
      ]
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static getAnswersById(req, res, next) {
    Answer.findOne({
      where: {
        PostId: req.params.PostId,
        id: req.params.id,
      },
    })
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static editAnswers(req, res, next) {
    const { description } = req.body;
    // console.log('wkwk')
    // console.log(Object.keys(req), 'hohoi');
    Answer.update(
      {
        description,
      },
      {
        where: {
          id: +req.params.id,
          PostId: req.params.PostId,
          UserId: req.loggedInUser.id,
        },
      }
    )
      .then((_) => {
        res.status(200).json({ message: "Data success updated" });
      })
      .catch((err) => {
        next(err);
      });
  }

  static createAnswers(req, res, next) {
    const { description } = req.body;
    // console.log(req.loggedInUser, 'lalala')
    Answer.create({
      description,
      PostId: req.params.PostId,
      UserId: req.loggedInUser.id
    })
      .then((data) => {
        res.status(201).json(data);
      })
      .catch((err) => {
        next(err);
      });
  }

  static deleteAnswers(req, res, next) {
    Answer.destroy({
      where: {
        PostId: req.params.PostId,
        id: req.params.id,
        UserId: req.loggedInUser.id, // dari userLogin
      },
    })
      .then(() => {
        res.status(200).json({ message: "Data success deleted" });
      })
      .catch((err) => {
        console.log('masuk error')
        next(err);
      });
  }
}

module.exports = AnswerController;
