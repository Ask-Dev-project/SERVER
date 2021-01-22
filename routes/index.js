const routes = require('express').Router()
const userRoute = require('./userRoute')
const answerRoute = require('./answerRoute')

routes.use('/', userRoute)
routes.use('/answers', answerRoute)

module.exports = routes