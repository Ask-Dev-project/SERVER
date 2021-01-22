const route = require('express').Router()
const PostController = require('../controllers/postController')
const authentication = require('../midddlewares/authentication')

route.use(authentication)
route.get('/', PostController.getAll)
route.get('/:PostId', PostController.getById)
route.post('/', PostController.create)
route.put('/:PostId', PostController.update)
route.delete('/:PostId', PostController.remove)

module.exports = route