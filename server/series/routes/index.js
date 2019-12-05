const routes = require('express').Router();
const SeriesController = require('../controllers/series')

routes.get('/series', SeriesController.findAll)
routes.post('/series', SeriesController.create)
routes.put('/series/:id', SeriesController.update)
routes.put('/series/:id', SeriesController.delete)

module.exports = routes