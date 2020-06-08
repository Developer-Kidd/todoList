const express = require("express");
const app = express();

//数据库
const mysql = require("./lib/mysql");
mysql.connect();

app.listen(3000);