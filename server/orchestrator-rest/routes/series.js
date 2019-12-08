const routes = require('express').Router();

const SerieController = require('../controllers/series')

routes.get('/', SerieController.findAll)
routes.post('/', SerieController.create)
routes.put('/:id', SerieController.update)
routes.delete('/:id', SerieController.delete)

module.exports = routes