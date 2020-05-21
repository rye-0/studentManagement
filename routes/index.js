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

//渲染管理员页面
router.get('/adminPage', function(req, res, next){
    var userName = req.session.userName;
    res.render('adminPage',{userName : userName})
})

module.exports = router;
