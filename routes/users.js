var express = require('express');
var router = express.Router();
var model = require('../model');
var db = require('../model/index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//客户注册接口
router.post('/register', function (req, res, next){
    console.log(req.body);
    var sql = "INSERT INTO test.customers (Uno,Upassword,Ucontact) "
            +"VALUES ('"+req.body.userName+"','"+req.body.password+"','"+req.body.contactInfo+"');";
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            res.writeHead(300,{
                "content-type":"text/plain"
            });
            res.end();
            return;
        }
        res.end();
    });
})

//管理员登录接口
router.post('/adminLogin', function (req, res, next){
    var sql = 'SELECT * FROM admin WHERE Ano = \''
        + req.body.userName + '\'';
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        console.log(rows);
        if(rows.length > 0){
            if(rows[0].Apassword == req.body.password){
                //登录成功，进行session会话存储
                req.session.userName = "admin-" + req.body.userName;
                res.send('/adminPage');
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

//客户登录接口
router.post('/customLogin', function (req, res, next){
    var sql = 'SELECT * FROM customers WHERE Uno = \''
        + req.body.userName + '\'';
    db.query(sql, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        if(rows.length > 0 && rows[0].Uno === req.body.userName){
            if(rows[0].Upassword === req.body.password){
                //登录成功，进行session会话存储
                req.session.userName = "custom-" + req.body.userName;
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

//用户退出登录接口
router.get('/logout', function(req, res, next) {
    req.session.userName = null;
    res.send('/login');
    console.log("success login!");
});

module.exports = router;