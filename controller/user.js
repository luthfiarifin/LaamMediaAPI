const conn = require('../utils/mysql-connection')
const response = require('../utils/response')
const joi = require('joi')
const fs = require('fs')

exports.post_login = (req, res) => {
    conn.query("SELECT user.id, user.email, user.password, user.name, CONCAT('/media/user/', user.image_url) AS image_url, job_category.name AS job_category, user.job_id, user.bio, (SELECT COUNT(*) FROM post WHERE post.user_id = user.id) AS post_count, (SELECT COUNT(*) FROM following_map WHERE following_map.following_id = user.id) AS follower_count, (SELECT COUNT(*) FROM following_map WHERE following_map.user_id = user.id) AS following_count, 0 AS following FROM user INNER JOIN job_category ON job_category.id = user.job_id WHERE user.email = ? AND user.password = ? AND user.active = '1' LIMIT 1", [req.body.email, req.body.pass], (err, rows, field) => {
        if (err) response.login(false, err.sqlMessage, null, res)
        else if (rows[0] == null) response.login(false, "Wrong sername or password", null, res)
        else response.login(true, "Login Success", rows[0], res)
    })
}

exports.post_register = (req, res) => {
    var today = new Date();
    var imageName = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds() + '.jpg'

    var user = {
        "job_id": req.body.job_id,
        "email": req.body.email,
        "password": req.body.password,
        "name": req.body.name,
        "bio": req.body.bio,
        "image_url": imageName
    }

    conn.query("SELECT id FROM user WHERE email = ?", [user.email], (err, rows, field) => {
        if (err) {
            response.post(false, err.sqlMessage, res)
            return
        }
        else if (rows[0] != null) {
            response.post(false, "Email has been used", res)
            return
        } else {
            conn.query("INSERT INTO user SET ?", user, (err1, rows1, field1) => {
                if (err1) response.post(false, err1.sqlMessage, res)
                else {
                    fs.writeFile(process.cwd() + '/public/user/' + imageName, req.body.image_url, 'base64', function (err2) {
                        if (err2) response.post(false, err2.message, res)
                        response.post(true, "Register success", res)
                    })
                }
            })
        }
    })
}

exports.put_update_profile = (req, res) => {
    var today = new Date();
    var imageName = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate() + '' + today.getHours() + '' + today.getMinutes() + '' + today.getSeconds() + '.jpg'

    if (req.body.image_url != null) {
        var user = {
            "job_id": req.body.job_id,
            "email": req.body.email,
            "password": req.body.password,
            "name": req.body.name,
            "bio": req.body.bio,
            "image_url": imageName
        }

        fs.writeFile(process.cwd() + '/public/user/' + imageName, req.body.image_url, 'base64', function (err2) {
            if (err2) response.post(false, err2.message, res)
        })
    } else {
        var user = {
            "job_id": req.body.job_id,
            "email": req.body.email,
            "password": req.body.password,
            "name": req.body.name,
            "bio": req.body.bio
        }
    }

    conn.query("UPDATE user SET ? WHERE id = " + req.body.id, user, (err1, rows1, field1) => {
        if (err1) response.post(false, err1.sqlMessage, res)
        else response.post(true, "Edit profile success", res)
    })
}

exports.get_user_by_id = (req, res) => {
    conn.query("SET @user_id = ?; SET @post_user_id = ?; SELECT user.id, user.email, user.password, user.name, CONCAT('/media/user/', user.image_url) AS image_url, job_category.name AS job_category, user.job_id, user.bio, (SELECT COUNT(*) FROM post WHERE post.user_id = user.id) AS post_count, (SELECT COUNT(*) FROM following_map WHERE following_map.following_id = user.id) AS follower_count, (SELECT COUNT(*) FROM following_map WHERE following_map.user_id = user.id) AS following_count, (SELECT IF(following_map.id, 1, 0) FROM following_map WHERE following_map.user_id = @user_id AND following_map.following_id = @post_user_id) AS following FROM user INNER JOIN job_category ON job_category.id = user.job_id WHERE user.id = @post_user_id AND user.active = '1' LIMIT 1", [req.query.user_id, req.query.post_user_id], (err, rows, field) => {
        if (err) res.send(err)
        else response.get(rows[2][0], res)
    })
}

exports.post_following = (req, res) => {
    conn.query("INSERT INTO following_map(user_id, following_id) VALUES(?, ?)", [req.body.user_id, req.body.following_id], (err, rows, field) => {
        if (err) response.post(false, err.sqlMessage, res)
        else response.post(true, "Following success", res)
    })
}

exports.delete_following = (req, res) => {
    conn.query("DELETE FROM following_map WHERE user_id = ? AND following_id = ?", [req.params.user_id, req.params.following_id], (err, rows, field) => {
        if (err) response.post(false, err.sqlMessage, res)
        else response.post(true, "UnFollowing success", res)
    })
}

exports.get_job = (req, res) => {
    conn.query("SELECT id, name FROM job_category WHERE active = '1'", (err, rows, field) => {
        if (err) res.send(err)
        else response.get(rows, res)
    })
}