exports.get = (val, res) => {
    res.status(200)
    res.send(val)
    res.end()
}

exports.post = (success, msg, res) => {
    var data = {
        'success': success,
        'message': msg
    }

    res.setHeader('Content-Type', 'application/json');
    res.json(data)
    res.end()
}

exports.login = (success, msg, data, res) => {
    var json = {
        'success': success,
        'message': msg,
        'data': data
    }

    res.setHeader('Content-Type', 'application/json');
    res.json(json)
    res.end()
}