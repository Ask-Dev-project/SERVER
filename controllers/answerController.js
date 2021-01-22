const { Answer } = require('../models')

class AnswerController {
    static getAnswers(req, res, next){
        Answer.findAll({
            where: {
                PostId: req.params.PostId
            }, order: [['id', 'ASC']]
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getAnswersById(req, res, next) {
        Answer.findOne({
            where: {
                PostId: req.params.PostId,
                id: req.params.id
            }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static editAnswers(req, res, next){
        const { description } = req.body
        console.log(req.params)
        Answer.update({
            description
        }, {
            where: {
                id: +req.params.id,
                UserId: 1, //req.userLogin // nunggu dari auth nama variabelnya
                PostId: req.params.PostId
            }
        })
            .then(_ => {
                res.status(200).json({message: 'Data success updated'})
            })
            .catch(err => {
                next(err)
            })
    }

    static createAnswers(req, res, next){
        const { description } = req.body
        Answer.create({
            description,
            PostId: req.params.PostId,
            UserId: 1 // dari userLogin sda
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteAnswers(req, res, next){
        Answer.destroy({
            where: {
                PostId: req.params.PostId,
                id: req.params.id,
                UserId: 1, // dari userLogin
            }
        })
            .then(data => {
                console.log(data, '<<<')
                res.status(200).json({message: "Data success deleted"})
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = AnswerController