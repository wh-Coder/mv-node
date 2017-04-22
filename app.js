/**
 * Created by busyrat on 2017/4/19.
 * 应用程序的启动
 */
// 加载express
var express = require('express');
// 加载模板
var swig = require('swig');
// 创建APP => http.createServer()
var app = express();

var User = require('./models/user');

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

var Cookies = require('cookies');

// 静态文件托管
app.use('/public', express.static(__dirname + '/public'));

app.use(function (req,res,next) {

    // 相当于客户端请求服务器之后，服务器端首先把请求的内容包装了一下
    req.cookies = new Cookies(req,res);

    req.userInfo = {};
    if( req.cookies.get('userInfo')){
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));

            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        }catch (e){
            console.log(e);
        }
    }else{
        next();
    }

});

app.engine('html', swig.renderFile);
// 定义模板根目录
app.set('views', './views');

app.set('view engine', 'html');

// 开发过程中取消模板缓存
swig.setDefaults({cache: false});

// 使用body-parser中间键
app.use(bodyParser.urlencoded({extended: true}));

// 根据不同功能划分模块
app.use('/admin', require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/main', require('./routers/main'));

// 监听请求
mongoose.connect('mongodb://localhost:27017/blog', function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');

        app.listen(8081);
        console.log('localhost:8081');
    }
});

