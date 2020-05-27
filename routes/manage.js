var express = require('express');
var router = express.Router();
var model = require('../model');
var db = require('../model/index.js');

//显示学生基础信息接口
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

//显示学生成绩接口
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
        rows.splice(1,0,{COLUMN_NAME: "Sname"});
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

//模糊查询信息接口
router.post('/searchInfo', function(req, res, next) {
    var selCols = 'select COLUMN_NAME from information_schema.COLUMNS where table_name = \'grade\';';
    var searchInfo = "SELECT s.Sname,g.* " +
        " FROM students s,grade g" +
        " WHERE  s.Sno = g.Sno and s.Sno IN (" +
        " select Sno" +
        " FROM students" +
        " WHERE Sname LIKE '%" + req.body.key +
        "%');";
    var data = {};
    db.query(selCols, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        rows.splice(1,0,{COLUMN_NAME: "Sname"});
        data.cols = rows;
        db.query(searchInfo, function(err, rows, fields){
            if (err) {
                console.log(err);
                return;
            }
            if(!rows.length){
                res.writeHead(300,{
                    "content-type":"text/plain"
                });
                res.end();
                console.log("查不到！");
                return;
            }
            data.rows = rows;
            console.log(data);
            res.json(data);
        });
    });
});

//统计成绩接口
router.post('/statisticalScore', function(req, res, next) {
    var course = req.body.type;
    var passMark = req.body.passMark;
    var statisticalScore = "SELECT Sno,"+course+" as score FROM grade";
    var data = {};
    db.query(statisticalScore, function(err, rows, fields){
        if (err) {
            console.log(err);
            return;
        }
        var sum = 0;
        var max = 0;
        var min = 100;
        var passNumber = 0;
        var score_exce = 0;
        var score_fine = 0;
        var score_medi = 0;
        var score_fail = 0;
        for(var i = 0; i < rows.length; i ++){
            sum += rows[i].score;
            if(rows[i].score > max)
                max = rows[i].score;
            if(rows[i].score < min)
                min = rows[i].score;
            if(rows[i].score >= passMark)
                passNumber ++;
            if(rows[i].score > 90)
                score_exce ++;
            else if(rows[i].score > 80)
                score_fine ++;
            else if(rows[i].score > 60)
                score_medi ++;
            else
                score_fail ++;
        }
        data.average = sum / rows.length;
        data.max = max;
        data.min = min;
        data.passNumber = passNumber;
        data.score_exce = score_exce;
        data.score_fine = score_fine;
        data.score_medi = score_medi;
        data.score_fail = score_fail;
        res.json(data);
        console.log(data);
    });
});

module.exports = router;