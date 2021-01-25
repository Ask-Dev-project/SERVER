const routes = require('express').Router()
const userRoute = require('./userRoute')
const answerRoute = require('./answerRoute')
const postRoute = require('./postRoute')

routes.use('/user', userRoute)
routes.use('/post', postRoute)
routes.use('/answers', answerRoute)


module.exports = routes