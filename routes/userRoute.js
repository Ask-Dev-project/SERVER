const routes = require('.')

const route = require('express').Router()
const UserController = require('../controllers/userController')

route.post('/googleLogin', UserController.googleLogin)

module.exports = route