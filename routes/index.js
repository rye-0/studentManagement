var express = require('express');
var router = express.Router();
var model = require('../model')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


//渲染登录页面
router.get('/login', function(req, res, next){
  res.render('login',{})
})

//渲染管理页面
router.get('/management', function(req, res, next){
    var userName = req.session.userName;
    res.render('management',{userName : userName})
})
module.exports = router;
