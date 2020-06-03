var express = require('express')
var router = require('./router/login.js')
var bodyParser = require('body-parser')
var session = require('express-session')


var app = express()
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
}))

app.use('/node_modules/',express.static('./node_modules/'))
app.use('/public/',express.static('./public/'))

app.engine('html',require('express-art-template'))

// app.use(bodyParser.urlencoded({extended:false}))
// app.use(bodyParser.json({limit : "21000000000000kb"}));


app.use(bodyParser.urlencoded({ limit:'10mb',extended:true}));
app.use(bodyParser.json({limit:'10mb'}));


app.use(router)

app.listen(300,function () {
    console.log('启动成功')
})