/**
 * 通过这个案例，让我有以下几点收获
 * 1. 明白了文件上传常用的前后台解决方案：
 *      前台使用ajax或者form来向服务器提交multipart/form-data类型的数据，其中可用html5提供的一个新的api，即FormData
 *      后台可以使用multer、busboy等npm包来对收到的数据进行处理
 * 2. pug中的data，可以在app.locals中指定，并且明白了在pug中写原生js的方法，以及在js使用传入data的的途径
 * 3. pug中注意插值时候的转义问题
 */
const express = require('express');
const path = require('path');
const fs = require('fs');
const request = require('request');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const app = express();

app.use(express.static(path.join(__dirname, 'uploads')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.locals.request = request;

app.get('/', (req, res) => {
    res.render('upload', {
        title: '上传图片和视频'
    });
});

app.post('/upload', upload.single('avatar'), (req, res) => {
    console.log(req.file);
    res.end(req.file.path);
});

app.listen(4000, (err) => {
    if (err) {
        return console.error(err.stack);
    }
    console.log(`Server ✈ is running on: http://localhost:4000`);
});