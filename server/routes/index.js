/*
 * 项目路由
 */

const express = require('express');
const router = express.Router();
//body=parser
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

//引入模块
const users = require("../modules/users");

/********   登陆模块   ********/
router.post('/users/login', function(req, res, next) {
    users.login(req.body.account, req.body.password).then((result) => {
        res.send(result);
    }, err => {
        res.send(err);
    });
});

module.exports = router;