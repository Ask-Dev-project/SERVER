const { User, Answer, Post } = require("../models/index");
const createError = require("http-errors");
module.exports = async (req, res, next) => {
    const id = +req.params.id
    try {
        
    } catch (error) {
        next(error)
    }
}