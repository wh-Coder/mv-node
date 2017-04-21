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

var mongoose = require('mongoose');

var bodyParser = require('body-parser');

// 静态文件托管
app.use('/public', express.static(__dirname + '/public'));


app.engine('html', swig.renderFile);
// 定义模板根目录
app.set('views', './views');

app.set('view engine', 'html');

// 开发过程中取消模板缓存
swig.setDefaults({cache: false});

// // 首页
// app.get('/', (req, res, next) => {
//     // res.send('欢迎光临我的博客');
//     res.render('index');
// });

// app.get('/main.css',(req, res, next)=>{
//     res.setHeader('content-type','text/css');
//     res.send('body {background: red;}');
// });

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

