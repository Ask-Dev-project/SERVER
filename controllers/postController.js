const { User, Answer, Post } = require("../models/index");

class PostController {
  static async getAll(req, res, next) {
    try {
      const posts = await Post.findAll({
        order: [["id", "DESC"]],
        include: [
          {
            model: User,
          },
          {
            model: Answer,
          },
        ],
      });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
  static async getById(req, res, next) {
    const id = req.params.PostId;
    try {
      const post = await Post.findByPk(id, {
        include: [
          {
            model: User,
          },
          {
            model: Answer,
          },
        ],
      });
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
  static async getByCategory(req, res, next) {
    try {
      const posts = await Post.findAll({
        where: {
          category: req.query.name,
        },
        order: [["id", "DESC"]],
        include: [
          {
            model: User,
          },
          {
            model: Answer,
          },
        ],
      });
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
  static async create(req, res, next) {
    const user = req.loggedInUser;
    const { question, description, category } = req.body;
    try {
      const post = await Post.create({
        question,
        description,
        category,
        UserId: user.id,
      });
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
  static async update(req, res, next) {
    const user = req.loggedInUser;
    const id = req.params.PostId;
    const { question, description, category } = req.body;
    try {
      const post = await Post.update(
        {
          question,
          description,
          category,
        },
        {
          where: {
            id: id,
            UserId: user.id,
          },
          returning: true,
        }
      );
      res.status(201).json({message: 'Data success updated'})
      // res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }
  static async remove(req, res, next) {
    const user = req.loggedInUser;
    const id = req.params.PostId;
    await Post.destroy({
      where: {
        id: id,
        UserId: user.id,
      },
    });
    res.status(200).json({ message: "Data success deleted" });
  }
}
module.exports = PostController;
