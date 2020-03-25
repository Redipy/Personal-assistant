var express = require('express');
var router = express.Router();

let db = require("../service/db")

router.post('/getall', function (req, res, next) {
  console.log(req.body.user_id)
  // SELECT * FROM `group`where instr (group_menberId,'1')
  let sql = "select * from `group` where instr (group_menberId," + "'" + req.body.user_id + "')"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      if (data.length != 0) {
        res.json({
          status: 200,
          data: data
        })
      } else {
        res.json({
          status: 200,
          data: 0
        })
      }
    }
  })
});

router.post('/getleaderoradmin', function (req, res, next) {
  let sql = "select * from `group` where instr (group_adminId," + "'" + req.body.user_id + "')"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      let sq = "select * from `group` where group_leaderId = '" + req.body.user_id + "'"
      db.query(sq, (err, dat) => {
        if (err) {
          res.json({
            err: err
          })
        } else {
          for (let i = 0; i < dat.length; i++) {
            data.push(dat[i])
          }
          res.json({
            status: 200,
            data: data
          })
        }
      })
    }
  })
});

router.post('/getgrouptask', function (req, res, next) {
  console.log(req.body.group_id)
  // SELECT * FROM `group`where instr (group_menberId,'1')
  let sql = "select group_task from `group` where group_id = '" + req.body.group_id + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      if (data[0].group_task !== null) {
        res.json({
          status: 200,
          data: data[0].group_task
        })
      } else {
        res.json({
          status: 200,
          data: 0,
          message: '没有群任务'
        })
      }
    }
  })
});

router.post('/getgroupmenber', function (req, res, next) {
  // let re = {
  //   name: '',
  //   id: ''
  // }
  // console.log(req.body.group_id)
  // SELECT * FROM `group`where instr (group_menberId,'1')
  let sql = "select group_menberName from `group` where group_id = '" + req.body.group_id + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      // console.log(data[0].group_menberName)
      // let ser = "select group_menberId from `group` where group_id = '" + req.body.group_id + "'"
      // db.query(ser, (err, da) => {
      //   if (err) {
      //     res.json({
      //       err: 'chucuole'
      //     })
      //   } else {
      //     console.log(da[0].group_menberId)
      //     re.id = da[0].group_menberId
      //   }
      // })
      if (data[0].group_menberName !== null) {
        // re.name = data[0].group_menberName
        // console.log(re)
        res.json({
          status: 200,
          data: data[0].group_menberName
        })
      } else {
        res.json({
          status: 200,
          data: 0,
          message: '没有群员'
        })
      }
    }
  })
});

router.post('/searchadmin', function (req, res, next) {
  console.log(req.body.user_id)
  let sql = "select * from `group` where instr (group_adminId," + "'" + req.body.user_id + "')"
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

router.post('/searchleader', function (req, res, next) {
  console.log(req.body.user_id)
  let sql = "select * from `group` where group_leaderId = '" + req.body.user_id + "'"
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

router.post('/beadmin', function (req, res, next) {
  console.log(req.body.user_name)
  console.log(req.body.group_id)
  let first = "select user_id from user where user_name = '" + req.body.user_name + "'"
  db.query(first, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      let sql = "select group_adminId from `group` where group_id = '" + req.body.group_id + "'"
      db.query(sql, (err, rrr) => {
        if (err) {
          res.json({
            err: err
          })
        } else {
          // console.log(rrr[0].group_adminId)
          // console.log(rrr[0].group_adminId.split(','))
          let m = 0
          for (let i = 0; i < rrr[0].group_adminId.split(',').length; i++) {
            // console.log('1111111111111111')
            // console.log(rrr[0].group_adminId[i])
            // console.log(data[0].user_id)
            if (data[0].user_id == rrr[0].group_adminId[i]) {
              m++
            } else {
              break
            }
          }
          if (m < 1) {
            let a = rrr[0].group_adminId + ',' + data[0].user_id
            let up = "update `group` set group_adminId = '" + a + "' where group_id = '" + req.body.group_id + "'"
            db.query(up, (err, re) => {
              res.json({
                status: 200,
                data: re,
                message: '修改成功'
              })
            })
          } else {
            res.json({
              status: 200,
              message: '本来就是管理员'
            })
          }
        }
      })
    }
  })
});

router.post('/delegroup', function (req, res, next) {
  console.log(req.body.group_id)
  let sql = "delete from `group` where group_id = '" + req.body.group_id + "'"
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

router.post('/quitgroup', function (req, res, next) {
  let sql = "select group_menberId from `group` where group_id = '" + req.body.group_id + "'"
  db.query(sql, (err, data) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      let menberidlist = data[0].group_menberId.split(',')
      // console.log(menberidlist)
      for (let i = 0; i < menberidlist.length; i++) {
        if (req.body.user_id === menberidlist[i]) {
          menberidlist.splice(i, 1)
          i--
        }
      }
      // console.log(menberidlist)
      let a = ''
      for (let i = 0; i < menberidlist.length; i++) {
        if (i < menberidlist.length - 1) {
          a = a + menberidlist[i] + ','
        } else {
          a = a + menberidlist[i]
        }
      }
      let up = "update `group` set group_menberId = '" + a + "' where group_id = '" + req.body.group_id + "'"
      db.query(up, (err, dat) => {
        if (err) {
          res.json({
            err: err
          })
        } else {
          let ser = "select group_menberName from `group` where group_id = '" + req.body.group_id + "'"
          db.query(ser, (err, da) => {
            if (err) {
              res.json({
                err: err
              })
            } else {
              let list = da[0].group_menberName.split(',')
              for (let i = 0; i < list.length; i++) {
                if (req.body.user_name === list[i]) {
                  list.splice(i, 1)
                  i--
                }
              }
              let b = ''
              for (let i = 0; i < list.length; i++) {
                if (i < list.length - 1) {
                  b = b + list[i] + ','
                } else {
                  b = b + list[i]
                }
              }
              let u = "update `group` set group_menberName = '" + b + "' where group_id = '" + req.body.group_id + "'"
              db.query(u, (err, da) => {
                if (err) {
                  res.json({
                    err: err
                  })
                } else {
                  res.json({
                    status: 200,
                    message: 'sucess'
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

router.post('/goout', function (req, res, next) {
  let s = "select user_id from user where user_name = '" + req.body.user_name + "'"
  db.query(s, (err, id) => {
    if (err) {
      res.json({
        err: "chucuole"
      })
    } else {
      let i = "select group_leaderId from group where group_id = '" + req.body.group_id + "'"
      db.query(i, (err, f) => {
        if (err) {
          res.json({
            err: 'chucuole'
          })
        } else {
          if (id === f) {
            res.json({
              status: 200,
              message: '没有权限踢出该成员'
            })
          } else {
            let sql = "select group_menberId from `group` where group_id = '" + req.body.group_id + "'"
            db.query(sql, (err, data) => {
              if (err) {
                res.json({
                  err: "chucuole"
                })
              } else {
                let menberidlist = data[0].group_menberId.split(',')
                // console.log('11111111111111111111111')
                // console.log(id[0].user_id)
                // console.log(menberidlist)
                for (let i = 0; i < menberidlist.length; i++) {
                  console.log(typeof (menberidlist[i]))
                  if (id[0].user_id === Number(menberidlist[i])) {
                    // console.log('333333333333333333333')
                    // console.log(menberidlist[i])
                    menberidlist.splice(i, 1)
                    i--
                  }
                }
                // console.log(menberidlist)
                // console.log('22222222222222222222222222')
                let a = ''
                for (let i = 0; i < menberidlist.length; i++) {
                  if (i < menberidlist.length - 1) {
                    a = a + menberidlist[i] + ','
                  } else {
                    a = a + menberidlist[i]
                  }
                }
                let up = "update `group` set group_menberId = '" + a + "' where group_id = '" + req.body.group_id + "'"
                db.query(up, (err, dat) => {
                  if (err) {
                    res.json({
                      err: "chucuole"
                    })
                  } else {
                    let ser = "select group_menberName from `group` where group_id = '" + req.body.group_id + "'"
                    db.query(ser, (err, da) => {
                      if (err) {
                        res.json({
                          err: "chucuole"
                        })
                      } else {
                        let list = da[0].group_menberName.split(',')
                        for (let i = 0; i < list.length; i++) {
                          if (req.body.user_name === list[i]) {
                            list.splice(i, 1)
                            i--
                          }
                        }
                        let b = ''
                        for (let i = 0; i < list.length; i++) {
                          if (i < list.length - 1) {
                            b = b + list[i] + ','
                          } else {
                            b = b + list[i]
                          }
                        }
                        let u = "update `group` set group_menberName = '" + b + "' where group_id = '" + req.body.group_id + "'"
                        db.query(u, (err, da) => {
                          if (err) {
                            res.json({
                              err: "chucuole"
                            })
                          } else {
                            res.json({
                              status: 200,
                              message: '已踢出该团队'
                            })
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
          }
        }
      })
    }
  })
});

router.post('/joingroup', function (req, res, next) {
  let sql = "select group_menberId from `group` where group_id = '" + req.body.group_id + "'"
  db.query(sql, (err, menberlist) => {
    if (err) {
      res.json({
        err: err
      })
    } else {
      console.log(menberlist[0].group_menberId)
      let sq = "select group_menberName from `group` where group_id = '" + req.body.group_id + "'"
      db.query(sq, (err, menbernamelist) => {
        if (err) {
          res.json({
            err: err
          })
        } else {
          console.log(menbernamelist[0].group_menberName)
          let a = menberlist[0].group_menberId + ',' + req.body.user_id
          let b = menbernamelist[0].group_menberName + ',' + req.body.user_name
          let s = "update `group` set group_menberId = '" + a + "', group_menberName = '" + b + "' where group_id = '" + req.body.group_id + "'"
          db.query(s, (err, data) => {
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
        }
      })
    }
  })
})

module.exports = router;