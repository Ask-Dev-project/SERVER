const routes = require('express').Router()
const userRoute = require('./userRoute')

routes.use('/', userRoute)

module.exports = routes