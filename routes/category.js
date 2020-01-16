const Router = require('express').Router()
const controller = require('../controller/category')

Router.get('/', controller.get_category)

module.exports = Router