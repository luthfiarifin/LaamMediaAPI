const conn = require('../utils/mysql-connection')

var comments = []

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('a user connected')

        socket.on('joinComment', function (data) {
            comments = []
            conn.query("SELECT PC.id, U.name, CONCAT('/media/user/', U.image_url) AS image_url, PC.user_id, PC.content, PC.created_at FROM post_comment PC INNER JOIN user U ON U.id = PC.user_id WHERE PC.post_id = ? ORDER BY PC.created_at ASC", [data], (err, rows, fields) => {
                if (err) console.log(err.sqlMessage)
                else {
                    rows.forEach(element => {
                        comments.push(element)
                        io.emit('initComment', JSON.stringify(comments))
                    });
                }
            })
        })

        socket.on('newComment', function (data) {
            conn.query('INSERT INTO post_comment(post_id, user_id, content) VALUES(?, ?, ?)', [data.post_id, data.user_id, data.content], (err, rows, field) => {
                if (err) console.log(err.sqlMessage)
                else {
                    conn.query("SELECT name, CONCAT('/media/user/', image_url) AS image_url FROM user WHERE id = ?", [data.user_id], (err1, rows1, fields1) => {
                        if (err1) console.log(err1.sqlMessage)
                        else {
                            data.name = rows1[0].name
                            data.image_url = rows1[0].image_url
                            io.emit('newComment', JSON.stringify(data))
                        }
                    })
                }
            })
        })

        socket.on('disconnect', function () {
            console.log('disconnect')
            comments = []
        })
    })
}