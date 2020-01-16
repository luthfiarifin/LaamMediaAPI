const Router = require('express').Router()
const controller = require('../controller/user')

Router.post('/login', controller.post_login)
Router.post('/register', controller.post_register)
Router.put('/edit', controller.put_update_profile)

Router.get('/byid', controller.get_user_by_id)
Router.get('/job', controller.get_job)
Router.post('/following', controller.post_following)
Router.delete('/following/:user_id/:following_id', controller.delete_following)

module.exports = Router