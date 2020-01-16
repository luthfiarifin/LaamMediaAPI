const conn = require('../utils/mysql-connection')

var messages = []

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('join')
        socket.on('joinMessage', function (data) {
            console.log('join message')
            messages = []
            conn.query("SET @dest_id = ?; SET @user_id = ?; SELECT DM.id, U.name, CONCAT('/media/user/', U.image_url) AS image_url, DM.destination_id, DM.content, DM.created_at FROM dirrect_message DM INNER JOIN user U ON U.id = DM.destination_id WHERE (DM.destination_id = @dest_id AND DM.user_id = @user_id) OR (DM.user_id = @dest_id AND DM.destination_id = @user_id) ORDER BY DM.created_at ASC", [data.destination_id, data.user_id], (err, rows, fields) => {
                if (err) console.log(err.sqlMessage)
                else {
                    rows[2].forEach(element => {
                        messages.push(element)
                        socket.emit('initMessage', JSON.stringify(messages))
                    });
                }
            })
        })

        socket.on('newMessage', function (data) {
            conn.query('INSERT INTO dirrect_message(destination_id, user_id, content) VALUES(?, ?, ?)', [data.destination_id, data.user_id, data.content], (err, rows, field) => {
                if (err) console.log(err.sqlMessage)
                else {
                    conn.query("SELECT CONCAT('/media/user/', image_url) AS image_url FROM user WHERE id = ?", [data.destination_id], (err1, rows1, fields1) => {
                        if (err1) console.log(err1.sqlMessage)
                        else {
                            data.image_url = rows1[0].image_url
                            io.emit('newMessage', JSON.stringify(data))
                        }
                    })
                }
            })
        })

        socket.on('disconnect', function () {
            messages = []
        })
    })
}