var express = require('express');
var router = express.Router();

let db = require("../service/db")

router.post('/getinfo', function (req, res, next) {
  // console.log(req.body.user_id)
  // console.log(req.body.noforget_time)
  let sql = "select * from noforget where noforget_userid = '" + req.body.user_id + "' and noforget_time = '" + req.body.noforget_time + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      console.log(data)
      if (data.length == 0) {
        // console.log('0')
        res.json({
          status: 200,
          index: 0
        })
      } else {
        // console.log('1')
        res.json({
          status: 200,
          index: 1,
          data: data[0]
        })
      }
    }
  })
});

router.post('/insertinfo', function (req, res, next) {
  // console.log(req.body.user_id)
  // console.log(req.body.noforget_info)
  // console.log(req.body.noforget_time)
  // console.log(req.body.insert)
  let sql = "insert into noforget (noforget_info, noforget_time, noforget_userid) values ('" + req.body.noforget_info + "','" + req.body.noforget_time + "','" + req.body.user_id + "')"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      res.json({
        status: 200,
        data: data
      })
    }
  })
})

router.post('/updateinfo', function (req, res, next) {
  // console.log(req.body.user_id)
  // console.log(req.body.noforget_info)
  // console.log(req.body.noforget_time)
  // console.log(req.body.insert)
  let sql = "update noforget set noforget_info = '" + req.body.noforget_info + "' where noforget_id = '" + req.body.id + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      res.json({
        status: 200,
        data: data
      })
    }
  })
})

module.exports = router;