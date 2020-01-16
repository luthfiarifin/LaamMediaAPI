const conn = require('../utils/mysql-connection')
const response = require('../utils/response')
const joi = require('joi')

exports.get_category = (req, res) => {
    conn.query("SELECT id, name FROM post_category WHERE active = '1' ORDER BY name ASC", (err, rows, field) => {
        if (err) res.send(err)
        else response.get(rows, res)
    })
}