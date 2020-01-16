const express = require('express')
const bp = require('body-parser')

const PostRouter = require('./routes/post')
const CategoryRouter = require('./routes/category')
const UserRouter = require('./routes/user')
const PageRouter = require('./routes/page')
const auth = require('./utils/auth')

const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const path = require('path')

require('./socket/comment')(io)
require('./socket/direct_message')(io)

app.set('port', (process.env.PORT || 3003));
app.set('socketio', io)

app.use('/media/', express.static(__dirname + '/public/'))
app.use(express.static(path.join(__dirname, 'public')));

app.use(auth)
app.use(bp.urlencoded({ limit: '50mb', extended: false }))

app.use('/', PageRouter)
app.use('/post', PostRouter)
app.use('/category', CategoryRouter)
app.use('/user', UserRouter)

http.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'))
})