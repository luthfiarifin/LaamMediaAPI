const conn = require('../utils/mysql-connection')
const response = require('../utils/response')
const joi = require('joi')
const fs = require('fs')

exports.get_article = (req, res) => {
    if (req.query.user_id != 0) {
        if (req.query.cat_id == 0) {
            conn.query("SELECT post.id, post.title, post.content, CONCAT('/media/post/', post.image_url) AS image_url, user.id AS author_id, user.name AS author_name, DATE_FORMAT(post.created_at, '%W, %e %M %Y') AS created_at, (SELECT COUNT(*) FROM post_like WHERE post_like.post_id = post.id) AS like_count, (SELECT IF(post_like.id IS NULL, 0, 1) FROM post_like WHERE post_like.post_id = post.id AND post_like.user_id = ?) AS liked FROM post INNER JOIN user ON user.id = post.user_id WHERE post.delete_at IS NULL AND post.active = '1' AND (post.title LIKE '%" + req.query.title + "%' OR user.name LIKE '%" + req.query.title + "%') ORDER BY post.created_at DESC", [req.query.user_id], (err, rows, field) => {
                if (err) res.send(err)
                else response.get(rows, res)
            })
        } else {
            conn.query("SELECT post.id, post.title, post.content, CONCAT('/media/post/', post.image_url) AS image_url, user.id AS author_id, user.name AS author_name, DATE_FORMAT(post.created_at, '%W, %e %M %Y') AS created_at, (SELECT COUNT(*) FROM post_like WHERE post_like.post_id = post.id) AS like_count, (SELECT IF(post_like.id IS NULL, 0, 1) FROM post_like WHERE post_like.post_id = post.id AND post_like.user_id = ?) AS liked FROM post INNER JOIN user ON user.id = post.user_id WHERE post.delete_at IS NULL AND post.active = '1' AND post.category_id = ? AND (post.title LIKE '%" + req.query.title + "%' OR user.name LIKE '%" + req.query.title + "%') ORDER BY post.created_at DESC", [req.query.user_id, req.query.cat_id], (err, rows, field) => {
                if (err) res.send(err)
                else response.get(rows, res)
            })
        }
    } else {
        conn.query("SELECT post.id, post.title, post.content, CONCAT('/media/post/', post.image_url) AS image_url, post.user_id AS author_id, user.name AS author_name, DATE_FORMAT(post.created_at, '%W, %e %M %Y') AS created_at, (SELECT COUNT(*) FROM post_like WHERE post_like.post_id = post.id) AS like_count, (0) AS liked FROM post INNER JOIN user ON user.id = post.user_id WHERE post.delete_at IS NULL AND post.active = '1' AND (post.title LIKE '%" + req.query.title + "%' OR user.name LIKE '%" + req.query.title + "%') ORDER BY post.created_at DESC", (err, rows, field) => {
            if (err) res.send(err)
            else response.get(rows, res)
        })
    }
}

exports.get_article_byid = (req, res) => {
    conn.query("SELECT post.id, post.title, post.content, CONCAT('/media/post/', post.image_url) AS image_url, user.id AS author_id, user.name AS author_name, DATE_FORMAT(post.created_at, '%W, %e %M %Y') AS created_at, (SELECT COUNT(*) FROM post_like WHERE post_like.post_id = post.id) AS like_count, (SELECT IF(post_like.id IS NULL, 0, 1) FROM post_like WHERE post_like.post_id = post.id AND post_like.user_id = ?) AS liked FROM post INNER JOIN user ON user.id = post.user_id WHERE post.delete_at IS NULL AND post.active = '1' AND post.id = ? ORDER BY post.created_at DESC", [req.query.user_id, req.query.post_id], (err, rows, field) => {
        if (err) res.send(err)
        else response.get(rows, res)
    })
}


exports.get_article_following = (req, res) => {
    conn.query("SET @user_id = ?; SELECT DISTINCT post.id, post.title, post.content, CONCAT('/media/post/', post.image_url) AS image_url, user.id AS author_id, user.name AS author_name, DATE_FORMAT(post.created_at, '%W, %e %M %Y') AS created_at, (SELECT COUNT(*) FROM post_like WHERE post_like.post_id = post.id) AS like_count, (SELECT IF(post_like.id IS NULL, 0, 1) FROM post_like WHERE post_like.post_id = post.id AND post_like.user_id = @user_id LIMIT 1) AS liked FROM post INNER JOIN user ON user.id = post.user_id LEFT JOIN following_map ON following_map.following_id = post.user_id OR following_map.user_id = post.user_id WHERE (following_map.user_id = @user_id OR post.user_id = @user_id)AND post.delete_at IS NULL AND post.active = '1' ORDER BY post.created_at DESC", [req.query.id], (err, rows, field) => {
        if (err) res.send(err)
        else response.get(rows[1], res)
    })
}

exports.get_article_profile = (req, res) => {
    conn.query("SELECT post.id, post.title, post.content, CONCAT('/media/post/', post.image_url) AS image_url, post.user_id AS author_id, user.name AS author_name, DATE_FORMAT(post.created_at, '%W, %e %M %Y') AS created_at, (SELECT COUNT(*) FROM post_like WHERE post_like.post_id = post.id) AS like_count, (SELECT IF(post_like.id IS NULL, 0, 1) FROM post_like WHERE post_like.post_id = post.id AND post_like.user_id = ?) AS liked FROM post INNER JOIN user ON user.id = post.user_id WHERE post.user_id = ? AND post.delete_at IS NULL AND post.active = '1' ORDER BY post.created_at DESC", [req.query.id, [req.query.id]], (err, rows, field) => {
        if (err) res.send(err)
        else response.get(rows, res)
    })
}

exports.post_like = (req, res) => {
    conn.query('INSERT INTO post_like(user_id, post_id) VALUES(?, ?)', [req.body.user_id, req.body.post_id], (err, rows, fields) => {
        if (err) response.post(false, err.sqlMessage, res)
        else {
            conn.query("SELECT (SELECT COUNT(*) FROM post_like WHERE post_like.post_id = post.id) AS like_count FROM post WHERE id = ? LIMIT 1", [req.body.post_id], (err1, rows1, fields1) => {
                if (err1) response.post(false, err1.sqlMessage, res)
                else response.post(true, rows1[0], res)
            })
        }
    })
}

exports.delete_unlike = (req, res) => {
    conn.query('DELETE FROM post_like WHERE user_id = ? AND post_id = ?', [req.params.user_id, req.params.post_id], (err, rows, fields) => {
        if (err) response.post(false, err.sqlMessage, res)
        else {
            conn.query("SELECT (SELECT COUNT(*) FROM post_like WHERE post_like.post_id = post.id) AS like_count FROM post WHERE id = ? LIMIT 1", [req.params.post_id], (err1, rows1, fields1) => {
                if (err1) response.post(false, err1.sqlMessage, res)
                else response.post(true, rows1[0], res)
            })
        }
    })
}

exports.header_message = (req, res) => {
    conn.query("SET @user_id = ?; SELECT DM.id, DM.destination_id, D.name AS destination_name, CONCAT('/media/user/', D.image_url) AS image_url, DM.content, DM.created_at FROM dirrect_message DM INNER JOIN (SELECT destination_id, MAX(created_at) AS created_at FROM dirrect_message GROUP BY destination_id, user_id) DM2 ON DM.destination_id = DM2.destination_id AND DM.created_at = DM2.created_at INNER JOIN user D ON D.id = DM.destination_id WHERE DM.user_id = @user_id GROUP BY DM.destination_id, DM.user_id ORDER BY DM.created_at DESC", [req.query.id], (err, rows, field) => {
        if (err) res.send(err)
        else response.get(rows[1], res)
    })
}

exports.add_post = (req, res) => {
    var today = new Date();
    var imageName = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds() + '.jpg'

    conn.query("INSERT INTO post(user_id, category_id, title, content, image_url) VALUES(?, ?, ?, ?, ?)", [req.body.user_id, req.body.category_id, req.body.title, req.body.content, imageName], (err, rows, field) => {
        if (err) response.post(false, err.sqlMessage, res)
        else {
            fs.writeFile(process.cwd() + '/public/post/' + imageName, req.body.image, 'base64', function (err1) {
                if (err1) response.post(false, err1.message, res)
                else response.post(true, 'Insert Post Success', res)
            })
        }
    })
}

exports.get_following_list = (req, res) => {
    conn.query("SET @user_id = ?; SELECT FM.id, FM.following_id AS destination_id, D.name AS destination_name, D.bio AS content,CONCAT('/media/user/', D.image_url) AS image_url, FM.created_at FROM following_map FM INNER JOIN user D ON D.id = FM.following_id WHERE FM.user_id = @user_id AND D.name LIKE '%" + req.query.search + "%' ORDER BY D.name DESC", [req.query.user_id], (err, rows, field) => {
        if (err) res.send(err)
        else response.get(rows[1], res)
    })
}