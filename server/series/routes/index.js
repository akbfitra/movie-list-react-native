const routes = require('express').Router();
const SeriesController = require('../controllers/series')

routes.get('/series', SeriesController.findAll)
routes.post('/series', SeriesController.create)
routes.get('/series/:id', SeriesController.findOne)
routes.put('/series/:id', SeriesController.update)
routes.delete('/series/:id', SeriesController.delete)

module.exports = routes