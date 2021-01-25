const express = require('express')
const router = express.Router()
const AnswerController = require('../controllers/answerController')
const authentication = require('../midddlewares/authentication')

router.get('/:PostId', AnswerController.getAnswers)
router.get('/:PostId/:id', AnswerController.getAnswersById)
router.use(authentication)
router.put('/:PostId/:id', AnswerController.editAnswers)
router.post('/:PostId', AnswerController.createAnswers)
router.delete('/:PostId/:id', AnswerController.deleteAnswers)

module.exports = router