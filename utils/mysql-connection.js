const mysql = require('mysql')

const conn = mysql.createConnection({
    host: 'localhost',
    database: 'laam_media',
    user: 'root',
    multipleStatements: true
})

conn.connect((err) => {
    if (err) throw err
})

module.exports = conn