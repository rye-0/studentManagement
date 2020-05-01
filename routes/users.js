var express = require('express');
var router = express.Router();
var model = require('../model');
var db = require('../model/index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//用户登录接口
router.post('/login', function (req, res, next){
    var sql = 'SELECT * FROM users WHERE Uno = \''
        + req.body.userName + '\'';
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        if(rows.length > 0){
            if(rows[0].Upassword == req.body.password){
                //登录成功，进行session会话存储
                req.session.userName = req.body.userName;
                res.send('/management');
                console.log("success login!");
                return;
            }
        }
        res.writeHead(300,{
            "content-type":"text/plain"
        });
        res.end();
        console.log("faild login");
    });
})
//用户退出登录
router.get('/logout', function(req, res, next) {
    req.session.userName = null;
    res.send('/login');
    console.log("success login!");
});

module.exports = router;