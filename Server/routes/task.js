var express = require('express');
var router = express.Router();

let db = require("../service/db")

router.post('/findList', function (req, res, next) {
  // console.log(req.body.user_id)
  // console.log(req.body.date)
  // console.log(req.body.pageno)
  // console.log(req.body.pagesize)
  let l = (req.body.pageno - 1) * req.body.pagesize
  let first = "select count(*) from task where task_userid = '" + req.body.user_id + "'"
  let sql = "select * from task where task_userid = '" + req.body.user_id + "' limit " + l + "," + req.body.pagesize
  db.query(first, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      if (data[0]['count(*)'] == 0) {
        res.json({
          status: 200,
          data: 0,
          length: 0,
          message: '无数据'
        })
      } else {
        db.query(sql, (err, rows) => {
          if (err) {
            res.json({
              err: err
            })
          } else {
            // console.log(data[0]['count(*)'])
            // console.log(rows)
            if (rows.length != 0) {
              res.json({
                status: 200,
                data: rows,
                length: data[0]
              })
            } else {
              res.json({
                status: 200,
                data: 0
              })
            }
          }
        })
      }
    }
  })
});

router.post('/update', function (req, res, next) {
  // console.log(req.body.task_id)
  // console.log(req.body.task_name)
  // console.log(req.body.task_detail)
  // console.log(req.body.task_date)
  let startdate = ''
  let enddate = ''
  let sql = ''
  if (req.body.task_date === '') {
    startdate = null
    enddate = null
    sql = "update task set task_name = '" + req.body.task_name + "',task_detail = '" + req.body.task_detail + "',task_startdate = " + startdate + ",task_enddate = " + enddate + " where task_id = '" + req.body.task_id + "'"
  } else {
    startdate = req.body.task_date.split(' 至 ')[0]
    enddate = req.body.task_date.split(' 至 ')[1]
    sql = "update task set task_name = '" + req.body.task_name + "',task_detail = '" + req.body.task_detail + "',task_startdate = '" + startdate + "',task_enddate = '" + enddate + "' where task_id = '" + req.body.task_id + "'"
  }
  // if (startdate === null) {
  //   let sql = "update task set task_name = '" + req.body.task_name + "',task_detail = '" + req.body.task_detail + "',task_startdate = " + startdate + ",task_enddate = " + enddate + " where task_id = '" + req.body.task_id + "'"
  // } else {
  //   let sql = "update task set task_name = '" + req.body.task_name + "',task_detail = '" + req.body.task_detail + "',task_startdate = '" + startdate + "',task_enddate = '" + enddate + "' where task_id = '" + req.body.task_id + "'"
  // }

  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      res.json({
        status: 200,
        data: data,
        message: '修改成功'
      })
    }
  })
});

router.post('/overTask', function (req, res, next) {
  // console.log(req.body.task_id)
  let sql = "delete from task where task_id = '" + req.body.task_id + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      res.json({
        status: 200,
        data: data,
        message: '任务已完成'
      })
    }
  })
});

router.post('/addTask', function (req, res, next) {
  console.log(req.body.task_name)
  console.log(req.body.task_detail)
  console.log(req.body.task_userid)
  console.log(req.body.task_date)
  let startdate = ''
  let enddate = ''
  let sql = ''
  if (req.body.task_date === '') {
    startdate = null
    enddate = null
    sql = "insert into task (task_name, task_detail, task_startdate, task_enddate, task_userid, task_type) values ('" + req.body.task_name + "','" + req.body.task_detail + "'," + startdate + "," + enddate + ",'" + req.body.task_userid + "',0)"
  } else {
    startdate = req.body.task_date.split(' 至 ')[0]
    enddate = req.body.task_date.split(' 至 ')[1]
    sql = "insert into task (task_name, task_detail, task_startdate, task_enddate, task_userid, task_type) values ('" + req.body.task_name + "','" + req.body.task_detail + "','" + startdate + "','" + enddate + "','" + req.body.task_userid + "',0)"
  }
  console.log(startdate)
  console.log(enddate)
  // if (startdate === null) {
  //   let sql = "insert into task (task_name, task_detail, task_startdate, task_enddate, task_userid, task_type) values ('" + req.body.task_name + "','" + req.body.task_detail + "'," + startdate + "," + enddate + ",'" + req.body.task_userid + "',0)"
  // } else {
  //   let sql = "insert into task (task_name, task_detail, task_startdate, task_enddate, task_userid, task_type) values ('" + req.body.task_name + "','" + req.body.task_detail + "','" + startdate + "','" + enddate + "','" + req.body.task_userid + "',0)"
  // }
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      res.json({
        status: 200,
        data: data,
        message: '任务已新增'
      })
    }
  })
});

router.post('/addgroupTask', function (req, res, next) {
  // console.log(req.body.task_name)
  // console.log(req.body.task_detail)
  // console.log(req.body.task_userid)
  console.log(req.body.task_date)
  // console.log(req.body.group_id)
  let startdate = ''
  let enddate = ''
  let sql = ''
  if (req.body.task_date === '') {
    startdate = null
    enddate = null
    sql = "insert into task (task_name, task_detail, task_startdate, task_enddate, task_userid, task_type) values ('" + req.body.task_name + "','" + req.body.task_detail + "'," + startdate + "," + enddate + ",'" + req.body.task_userid + "',1)"
  } else {
    startdate = req.body.task_date.split(' 至 ')[0]
    enddate = req.body.task_date.split(' 至 ')[1]
    sql = "insert into task (task_name, task_detail, task_startdate, task_enddate, task_userid, task_type) values ('" + req.body.task_name + "','" + req.body.task_detail + "','" + startdate + "','" + enddate + "','" + req.body.task_userid + "',1)"
  }
  // console.log(startdate)
  // console.log(enddate)
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      console.log('111111')
      // "update task set task_name = '" + req.body.task_name + "' where task_id = '" + req.body.task_id + "'"
      let a = "select group_task from `group` where group_id = '" + req.body.group_id + "'"
      db.query(a, (err, gti) => {
        if (err) {
          res.json({
            err: err
          })
        } else {
          console.log('222222')
          let b = "select group_taskName from `group` where group_id = '" + req.body.group_id + "'"
          db.query(b, (err, gtn) => {
            if (err) {
              res.json({
                err: err
              })
            } else {
              // console.log('3333333')
              // console.log(data.insertId)
              // console.log(gti[0].group_task)
              // console.log(gtn[0].group_taskName)
              let ti = gti[0].group_task + "," + data.insertId
              let tn = gtn[0].group_taskName + "," + req.body.task_name
              let c = "update `group` set group_task = '" + ti + "',group_taskName = '" + tn + "' where group_id = '" + req.body.group_id + "'"
              db.query(c, (err, c) => {
                if (err) {
                  res.json({
                    err: err
                  })
                } else {
                  res.json({
                    status: 200,
                    message: '任务已新增'
                  })
                }
              })
            }
          })
        }
      })
    }
  })
});

router.post('/findByid', function (req, res, next) {
  let sql = "select * from task where task_id = '" + req.body.task_id + "'"
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

router.post('/findByfilter', async function (req, res, next) {
  let l = (req.body.pageno - 1) * req.body.pagesize
  let first = ''
  // let sql = "select * from task where task_userid = '" + req.body.user_id + "' limit " + l + "," + req.body.pagesize
  let sql = ''
  console.log(req.body.type)
  if (req.body.type === '2') {
    first = "select count(*) from task where task_userid = " + req.body.user_id + " and task_type = 0"
    sql = "select * from task where task_userid = " + req.body.user_id + " and task_type = 0 limit " + l + "," + req.body.pagesize
    db.query(first, (err, data) => {
      if (err) {
        res.json({
          err: err
        })
      } else {
        if (data[0]['count(*)'] == 0) {
          res.json({
            status: 200,
            data: 0,
            length: 0,
            message: '无数据'
          })
        } else {
          db.query(sql, (err, rows) => {
            if (err) {
              res.json({
                err: err
              })
            } else {
              if (rows.length != 0) {
                res.json({
                  status: 200,
                  data: rows,
                  length: data[0]
                })
              } else {
                res.json({
                  status: 200,
                  data: 0
                })
              }
            }
          })
        }
      }
    })
  } else {
    if (req.body.name === '') {
      console.log('没name')
      first = "select count(*) from task where task_userid = " + req.body.user_id + " and task_type = 1"
      sql = "select * from task where task_userid = " + req.body.user_id + " and task_type = 1 limit " + l + "," + req.body.pagesize
      db.query(first, (err, data) => {
        if (err) {
          res.json({
            err: err
          })
        } else {
          if (data[0]['count(*)'] == 0) {
            res.json({
              status: 200,
              data: 0,
              length: 0,
              message: '无数据'
            })
          } else {
            db.query(sql, (err, rows) => {
              if (err) {
                res.json({
                  err: err
                })
              } else {
                if (rows.length != 0) {
                  res.json({
                    status: 200,
                    data: rows,
                    length: data[0]
                  })
                } else {
                  res.json({
                    status: 200,
                    data: 0
                  })
                }
              }
            })
          }
        }
      })
    } else {
      console.log('有name')
      first = "select group_task from `group` where group_id = '" + req.body.name + "'"
      db.query(first, (err, data) => {
        if (err) {
          res.json({
            err: err
          })
        } else {
          // console.log(data[0].group_task)
          if (data[0].group_task === null) {
            res.json({
              status: 200,
              data: 0,
              length: 0,
              message: '无数据'
            })
          } else {
            let list = data[0].group_task.split(',')
            res.json({
              status: 200,
              data: list
            })

            // console.log(list)

            // function recurTest(j, length) {
            //   setTimeout(function () {
            //     console.log("第" + (j + 1) + "次循环");
            //     if (++j < length) {
            //       recurTest(j, length);
            //     }
            //   }, Math.random() * 3000);
            // }
            // recurTest(0, 5)

            // (function a(i) {
            //   sql = "select * from task where task_id = " + list[i]
            //   db.query(sql, (err, rows) => {
            //     // console.log(rows[0])
            //     console.log('1111111')
            //     r.push(rows[0])
            //     i++
            //     if (i < list.length) {
            //       a(i)
            //     } else {
            //       return
            //     }
            //   })
            // })(0)

            // for (let i = 0; i < list.length; i++) {
            //   sql = "select * from task where task_id = " + list[i]
            //   db.query(sql, (err, rows) => {
            //     // console.log(rows[0])
            //     console.log('1111111')
            //     r.push(rows[0])
            //   })
            //   if (i === list.length - 1) {
            //     console.log('22222222222')
            //     console.log(r)
            //   }
            // }

            // let i = 0
            // sql = "select * from task where task_id = " + list[0]
            // db.query(sql, (err, rows) => {
            //   if (err) {
            //     res.json({
            //       err: err
            //     })
            //   } else {
            //     req.push(rows[0])
            //     i++
            //     if (i < list.length) {

            //     }
            //   }
            // })
          }

        }
      })
    }
  }
})

module.exports = router;