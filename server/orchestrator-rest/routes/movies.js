const routes = require('express').Router();
const MovieController = require('../controllers/movies')

routes.get('/', MovieController.findAll)
routes.post('/', MovieController.create)
routes.put('/:id', MovieController.update)
routes.delete('/:id', MovieController.delete)

module.exports = routes