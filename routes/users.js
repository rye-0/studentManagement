var express = require('express');
var router = express.Router();
var model = require('../model');
var db = require('../model/index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//客户登录接口
router.post('/login', function (req, res, next){
    var sql = 'SELECT * FROM customers WHERE Uno = \''
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
//用户退出登录接口
router.get('/logout', function(req, res, next) {
    req.session.userName = null;
    res.send('/login');
    console.log("success login!");
});

//查询学生基础信息接口
router.get('/getBasicInfo', function(req, res, next) {
    var selCols = 'select COLUMN_NAME from information_schema.COLUMNS where table_name = \'students\';';
    var selRows = 'SELECT * FROM students';

    var data = {};
    db.query(selCols, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        data.cols = rows;
        db.query(selRows, function(err, rows, fields){
            if (err) {
                console.log(err);
                return;
            }
            data.rows = rows;
            res.json(data);
        });
    });
});

//查询学生成绩接口
router.get('/getGradeInfo', function(req, res, next) {
    var selCols = 'select COLUMN_NAME from information_schema.COLUMNS where table_name = \'grade\';';
    var selRows = 'SELECT s.Sname,g.* ' +
        '       FROM students s INNER JOIN grade g' +
        '       ON  s.Sno = g.Sno;';

    var data = {};
    db.query(selCols, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        rows.unshift({COLUMN_NAME: "Sname"});
        data.cols = rows;
        db.query(selRows, function(err, rows, fields){
            if (err) {
                console.log(err);
                return;
            }
            data.rows = rows;
            console.log(data);
            res.json(data);
        });
    });
});

module.exports = router;