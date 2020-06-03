// var db = require('../data_base.js')
// var article = require('../article_base')
var fs = require('fs')
var express = require('express')
var User = require('../data_base')
var Article = require('../article_base')
var router = express.Router()

router.get('/',function (req,res) {
    Article.find(function (err,articles) {
        var data = JSON.stringify(articles)
        articles = JSON.parse(data)
        console.log(articles)
        res.render('index.html',{
            articles:articles
        })
    })

})
router.get('/login',function (req,res) {
    res.render('login.html')
})
router.post('/login',function (req,res) {
    user = req.body

    User.findOne({number: user.number},function (err,doc) {
        if (err){
            console.log(err)
            return res.json({
                code:500
            })
        }
        if (doc == null){
            console.log('账号未注册')
            return res.json({
                code:0
            })
        }
        if (doc.password == user.password){
            console.log('密码正确')
            return res.json({
                code:2,
                user:doc
            })
        }
        if (doc.password!=user.password){
            console.log('密码错误')
            return res.json({
                code:1
            })
        }else {
            return res.json({
                code:500
            })
        }
    })
})
router.get('/register',function (req,res) {
    res.render('register.html')
})
router.post('/register',async function (req,res) {
    console.log(req.body)
    user = req.body
    try {
        if (await User.findOne( {phone:user.phone} ) ) {
        return res.json({
            code:1
            })
        }
        if (await User.findOne( {number:user.number} ) ) {
            return res.json({
                code:2
            })
        }
        await new User(user).save()
        res.json({
            code:0,
            user:user
        })
    }catch (err) {
        return res.json({code:500})
    }


})
router.get('/send',function (req,res) {
    res.render('send.html')
})
router.post('/send',function (req,res) {
    console.log(req.body)
    var article = req.body
    new Article(article).save()
    res.json({
        code:20
    })
})
router.get('/me',function (req,res) {
    res.render('me.html')
})
router.get('/edit',function (req,res) {
    res.render('edit.html')
})
router.post('/edit',function (req,res) {
    var user = req.body
    var base64 = user.head.replace(/^data:image\/\w+;base64,/, "");
    delete user.head
    var dataBuffer = new Buffer(base64, 'base64'); //把base64码转成buffer对象，
    console.log('dataBuffer是否是Buffer对象：'+Buffer.isBuffer(dataBuffer));
    fs.writeFile('./public/head/'+user.number+'.jpg',dataBuffer,function(err){//用fs写入文件
        if(err){
            console.log(err);
        }else{
            console.log('写入成功！');
        }
    })
    User.update({number:user.number},user,function (err) {
        if (err){
            return res.json({
                code:10
            })
        }
        return res.json({
            code:11
        })
    })
})
router.get('/help',function (req,res) {
    res.render('help.html')
})
router.get('/delivery',function (req,res) {
    res.render('delivery.html')
})

module.exports = router