var express = require('express');
var router = express.Router();

let db = require("../service/db")

router.post('/login', function (req, res, next) {
  let sql = "select * from user where user_name = '" + req.body.user_name + "' and user_password = '" + req.body.password + "'"
  db.query(sql, (err, rows) => {
    if (err) {
      res.json({
        err: "chucuole"
      })
    } else {
      if (rows.length != 0) {
        res.json({
          status: 200,
          data: 0,
          info: rows[0],
          message: '登录成功'
        })
      } else {
        res.json({
          status: 200,
          data: 1,
          message: '用户名或密码错误'
        })
      }
    }
  })
});

router.post('/reg', function (req, res, next) {
  let first = "select * from user where user_name = '" + req.body.user_name + "'"
  let sql = "insert into user(user_name,user_password) values('" + req.body.user_name + "','" + req.body.password + "')"
  console.log(first)
  console.log(sql)
  db.query(first, (err, rows) => {
    if (err) {
      res.json({
        err: "chucuole"
      })
    } else {
      if (rows.length != 0) {
        res.json({
          status: 200,
          data: 0
        })
      } else {
        db.query(sql, (err, rows) => {
          if (err) {
            res.json({
              err: "chucuole"
            })
          } else {
            res.json({
              status: 200,
              data: 1
            })
          }
        })
      }
    }
  })
});

router.post('/getnameByid', function (req, res, next) {
  let sql = "select user_name from user where user_id = '" + req.body.user_id + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      console.log(data)
      res.json({
        status: 200,
        data: data[0].user_name
      })
    }
  })
})

router.post('/update', function (req, res, next) {
  let sql = "select user_password from user where user_id = '" + req.body.user_id + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      if (req.body.pass === data[0].user_password) {
        let sq = "update user set user_password = '" + req.body.npass + "' where user_id = '" + req.body.user_id + "'"
        db.query(sq, (err, dat) => {
          if (err) {
            res.json({
              err: err
            })
          } else {
            res.json({
              status: 200,
              message: '密码修改成功',
              data: 1
            })
          }
        })
      } else {
        res.json({
          status: 200,
          message: '旧密码输入错误',
          data: 0
        })
      }
      // console.log(data)
      // res.json({
      //   status: 200,
      //   data: data[0].user_name
      // })
    }
  })
})

module.exports = router;