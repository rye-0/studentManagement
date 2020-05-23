var express = require('express');
var router = express.Router();
var model = require('../model');
var db = require('../model/index.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//删除学生信息接口
router.post('/deleteInfo', function(req, res, next) {
    console.log(req.body.message);
    var deleteInfo = "DELETE FROM students WHERE Sno = '"+ req.body.message +"';";
    var deleteGrade = "DELETE FROM grade WHERE Sno = '"+ req.body.message +"';";
    db.query(deleteInfo, function(err, rows, fields){
        if (err) {
            console.log(err);
            res.writeHead(300,{
                "content-type":"text/plain"
            });
            res.end();
            return;
        }
        db.query(deleteGrade, function(err, rows, fields){
            if (err) {
                console.log(err);
                res.writeHead(300,{
                    "content-type":"text/plain"
                });
                res.end();
                return;
            }
            // console.log(rows);
            res.end();
        });
    });
});

//修改学生信息接口
router.post('/modifyInfo', function(req, res, next) {
    console.log(req.body);
    var updateInfo;
    var isUpdateName = false;
    var updataName = "UPDATE students " +
        "SET Sname= '"+ req.body.Sname+"' "+
        "WHERE Sno = '"+req.body.Sno+"';"
    if(req.body.Schinese){
        isUpdateName = true;
        updateInfo = "UPDATE grade "+
            "SET Sno= '"+ req.body.Sno+"',"+
            "Schinese= '"+ req.body.Schinese +"',"+
            "Smath= '"+ req.body.Schinese +"',"+
            "Senglish= '"+ req.body.Smath +"',"+
            "Sphysics= '"+ req.body.Sphysics +"',"+
            "Spolitics= '"+ req.body.Spolitics +"' "+
            "WHERE Sno = '"+ req.body.Sno +"'; ";

    }else{
        updateInfo = "UPDATE students "+
            "SET Sno= '"+ req.body.Sno+"',"+
            "Sname= '"+ req.body.Sname+"',"+
            "Ssex= '"+ req.body.Ssex+"',"+
            "Sclass= '"+ req.body.Sclass+"' "+
            "WHERE Sno = '"+req.body.Sno+"';";

    }
    db.query(updateInfo, function(err, rows, fields){
        if (err) {
            console.log(err);
            res.writeHead(300,{
                "content-type":"text/plain"
            });
            res.end();
            return;
        }
        if(isUpdateName){
            db.query(updataName, function(err, rows, fields){//修改成绩表顺带修改姓名
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
        }
        else{
            res.end();
        }
    });
});

module.exports = router;