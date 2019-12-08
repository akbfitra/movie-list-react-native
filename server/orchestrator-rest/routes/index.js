const routes = require('express').Router();
const entertainment = require('./all')
const movies = require('./movies')
const series = require('./series')

routes.use('/entertainment', entertainment)
routes.use('/movies', movies)
routes.use('/series', series)

module.exports = routes