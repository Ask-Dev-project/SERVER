'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {foreignKey: 'UserId'})
      Post.hasMany(models.Answer, {foreignKey: 'PostId'})
    }
  };
  Post.init({
    question: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Question is required'
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        notEmpty: {
          msg: 'Description is required'
        }
      }
    },
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};