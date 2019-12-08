const routes = require('express').Router();
const EntertainmentController = require('../controllers/all')

routes.get('/', EntertainmentController.findAll)

module.exports = routes