const routes = require('express').Router();
const MovieController = require('../controllers/Movie')

routes.get('/movie', MovieController.findAll)
routes.post('/movie', MovieController.create)
routes.put('/movie/:id', MovieController.update)
routes.put('/movie/:id', MovieController.delete)

module.exports = routes