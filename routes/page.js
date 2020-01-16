const Router = require('express').Router()

Router.get('/', function (req, res, next) {
    res.render('index', { title: 'LaamMedia' })
})

Router.get('/blankpage', function (req, res, next) {
    res.render('blankpage', { title: 'LaamMedia' })
})

module.exports = Router