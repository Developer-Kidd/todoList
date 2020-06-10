const express = require("express");
const app = express();

//数据库
const mysql = require("./lib/mysql");
mysql.connect();

//路由
const router=require('./routes/index');
app.use('/',router);

app.listen(3000);