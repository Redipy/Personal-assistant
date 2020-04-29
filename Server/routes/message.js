var express = require('express');
var router = express.Router();

let db = require("../service/db")

router.post('/getByuserid', function (req, res, next) {
  console.log(req.body.user_id)
  let sql = "select * from message where message_userid = '" + req.body.user_id + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      console.log(data)
      res.json({
        status: 200,
        data: data
      })
    }
  })
});

router.post('/deletemessage', function (req, res, next) { // 删除消息
  let sql = "delete from message where message_id = '" + req.body.message_id + "'"
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
});

router.post('/invmessage', function (req, res, next) { // 邀请进群
  let a = "select * from `group` where instr (group_menberId," + "'" + req.body.toname + "')" + "and group_id = '" + req.body.group_id + "'"
  db.query(a, (err, a) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      console.log(a.length)
      if (a.length !== 0) {
        res.json({
          status: 200,
          index: 0
        })
      } else {
        let sql = "select user_id from user where user_name = '" + req.body.toname + "'"
        db.query(sql, (err, message_userid) => {
          if (err) {
            res.json({
              err: err
            })
          } else {
            // console.log(message_userid[0].user_id)
            let sq = "select group_name from `group` where group_id = '" + req.body.group_id + "'"
            db.query(sq, (err, group_name) => {
              if (err) {
                res.json({
                  err: err
                })
              } else {
                if (group_name[0].group_name) {
                  // console.log(group_name[0].group_name)
                  let info = '邀请进入' + group_name[0].group_name
                  let b = "select * from message where message_info = '" + info + "'"
                  db.query(b, (err, b) => {
                    if (err) {
                      res.json({
                        err: err
                      })
                    } else {
                      if (b.length === 0) {
                        let s = "insert into message(message_info,message_from,message_time,message_userid,message_type,message_groupid) values('" + info + "','" + req.body.user_id + "','" + req.body.time + "','" + message_userid[0].user_id + "','" + req.body.type + "','" + req.body.group_id + "')"
                        db.query(s, (err, data) => {
                          if (err) {
                            res.json({
                              err: err
                            })
                          } else {
                            res.json({
                              status: 200,
                              index: 1,
                              data: data
                            })
                          }
                        })
                      } else {
                        res.json({
                          status: 200,
                          index: 2
                        })
                      }
                    }
                  })
                } else {
                  res.json({
                    status: 200,
                    index: 3
                  })
                }
              }
            })
          }
        })
      }
    }
  })
});

router.post('/howmany', function (req, res, next) {
  let sql = "select count(*) from message where message_userid = '" + req.body.user_id + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      console.log(data[0]['count(*)'])
      res.json({
        status: 200,
        data: data[0]['count(*)']
      })
    }
  })
})

module.exports = router;