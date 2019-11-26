var express = require('express');
var router = express.Router();


let db=require("../service/db")

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express11' });
  res.json('a')
});

router.get('/first',(req,res,next)=>{
  let sql="select * from admin"
  db.query(sql,(err,rows)=>{
    if(err){
      res.json({err:"chucuole"})
    }
    else{
      res.json({list:rows})
    }
  })
})

module.exports = router;
