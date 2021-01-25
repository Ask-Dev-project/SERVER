const route = require('express').Router()
const UserController = require('../controllers/userController')
const authentication = require('../midddlewares/authentication')
route.post('/googleLogin', UserController.googleLogin)
<<<<<<< HEAD
=======
route.get('/githubLogin', UserController.toGitHubLogin)
route.get('/oauth-callback', UserController.callBack)
>>>>>>> development
route.use(authentication)
route.patch('/change-nickname', UserController.changeNickname)

module.exports = route