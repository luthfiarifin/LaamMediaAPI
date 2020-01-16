const Router = require('express').Router()
const controller = require('../controller/post')

Router.post('/add', controller.add_post)
Router.get('/cat', controller.get_article)
Router.get('/following', controller.get_article_following)
Router.get('/profile', controller.get_article_profile)
Router.get('/byid', controller.get_article_byid)
Router.post('/like', controller.post_like)
Router.delete('/like/:user_id/:post_id', controller.delete_unlike)

Router.get('/headermessage', controller.header_message)
Router.get('/listfollowing', controller.get_following_list)

module.exports = Router