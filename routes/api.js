const apiRouter = require('express').Router()
const apiController = require('../controllers/apiController')

apiRouter.all('/:datatype', apiController.handleDatatype)

module.exports = apiRouter