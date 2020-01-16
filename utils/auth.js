const auth = require('basic-auth')

const admins = { laam: { password: 'laam123' } }

module.exports = function (req, res, next) {
    var user = auth(req)
    if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
        res.setHeader('WWW-Authenticate', 'Basic realm="example"')
        return res.status(401).send({ 'error': true, 'message': 'Access Denied :)' })
    }
    return next()
}