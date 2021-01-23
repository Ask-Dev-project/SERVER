const route = require('express').Router()
const UserController = require('../controllers/userController')
const authentication = require('../midddlewares/authentication')

route.post('/googleLogin', UserController.googleLogin)
// route.use(authentication)
route.patch('/change-nickname', UserController.changeNickname)

module.exports = route