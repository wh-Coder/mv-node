# 总结：

## 目录：

```
│  .gitignore                       // git忽略的文件
│  app.js                           // 入口
│  package.json                     // npm 包
│  README.md                        // 总结
│
├─public                            // 静态页相关
│  │  main.css
│  │
│  ├─css
│  │      bootstrap-theme.min.css
│  │      bootstrap.min.css
│  │      main.css
│  │
│  ├─fontAwesome
│  │  │  HELP-US-OUT.txt
│  │  │
│  │  ├─css
│  │  │      font-awesome.css
│  │  │      font-awesome.min.css
│  │  │
│  │  ├─fonts
│  │  │      fontawesome-webfont.eot
│  │  │      fontawesome-webfont.svg
│  │  │      fontawesome-webfont.ttf
│  │  │      fontawesome-webfont.woff
│  │  │      fontawesome-webfont.woff2
│  │  │      FontAwesome.otf
│  │  │
│  │  ├─less
│  │  │      animated.less
│  │  │      bordered-pulled.less
│  │  │      core.less
│  │  │      fixed-width.less
│  │  │      font-awesome.less
│  │  │      icons.less
│  │  │      larger.less
│  │  │      list.less
│  │  │      mixins.less
│  │  │      path.less
│  │  │      rotated-flipped.less
│  │  │      stacked.less
│  │  │      variables.less
│  │  │
│  │  └─scss
│  │          font-awesome.scss
│  │          _animated.scss
│  │          _bordered-pulled.scss
│  │          _core.scss
│  │          _fixed-width.scss
│  │          _icons.scss
│  │          _larger.scss
│  │          _list.scss
│  │          _mixins.scss
│  │          _path.scss
│  │          _rotated-flipped.scss
│  │          _stacked.scss
│  │          _variables.scss
│  │
│  ├─fonts
│  │      glyphicons-halflings-regular.eot
│  │      glyphicons-halflings-regular.svg
│  │      glyphicons-halflings-regular.ttf
│  │      glyphicons-halflings-regular.woff
│  │      glyphicons-halflings-regular.woff2
│  │
│  ├─images
│  │      00002637.jpg
│  │      00002637.png
│  │      00002968.jpg
│  │      close.png
│  │      IMG_0292.jpg
│  │      IMG_0293.jpg
│  │
│  └─js
│          bootstrap.min.js
│          comment.js                // 评论的交互
│          index.js                  // 静态页的交互
│          jquery-1.12.4.min.js
│
├─routers                            // 路由,从app.js分支过来
│      admin.js                      // 管理
│      api.js                        // 登录接口
│      main.js                       // 用户
│
├─schemas                           // 数据表模型
│      categories.js                 // 分类栏
│      contents.js                   // 文章
│      users.js                      // 用户
│
└─views                             // 静态页
    ├─admin                         // 管理页
    │      category_add.html
    │      category_edit.html
    │      category_index.html
    │      content_add.html
    │      content_edit.html
    │      content_index.html
    │      error.html
    │      index.html
    │      layout.html
    │      page.html
    │      success.html
    │      user_index.html
    │
    └─main                           // 用户页
            index.html
            layout.html
            view.html
```

## 重点

#### express 三步走

一个学习教程：http://www.w3cschool.cn/expressapi/expressapi-helloworld.html

```
/app.js

// 1. 基础骨架

// 引入
var express = require('express');

// 创建
var app = express();

// 监听
app.listen(8081);

// 2. 相关中间键

// 静态文件托管
app.use('/public', express.static(__dirname + '/public'));

// 使用body-parser中间键，
// bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据
app.use(bodyParser.urlencoded({extended: true}));

// 3. 路由
app.use('/admin', require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/main', require('./routers/main'));

```

#### mongoose

```
// 连接mongodb
mongoose.connect('mongodb://localhost:27017/blog',callback);

// 定义模型
var usersSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {
        type: Boolean,
        default: false
    }
});

// 创建模型
var User = mongoose.model('User', usersSchema);

// 应用
new User();         // 创建一条数据（document）
User.findOne();     // 查找一个数据
User.find();        // 查找一组数据
User.findById();    // 通过_id查找
// 其他辅助
.sort({_id: -1}).limit(limit).skip(skip).populate('category')

```






















