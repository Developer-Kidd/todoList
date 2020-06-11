/*
 * 用户模块
 */

const mysql = require("../lib/mysql");
const utils = require("../lib/utils");
const jwt = require("../lib/token");

module.exports = {
    login: function(account,password) {
        return new Promise((reslove,reject) => {
            if(!account || !password) {
                const msg = !account ? '请输入用户账号!' : '请输入用户密码!';
                reject(utils.handleResponse(0, null, msg));
            }
            const _sql = `select id,name,account from users where account=? and password=?`;
            mysql.query(_sql, [account, password], (res) => {
                //没有查询到数据
                if(res.length < 1) {
                    reject(utils.handleResponse(0, null, '账号或密码不正确！'));
                }
                //成功登陆
                const resultData = res[0];
                resultData.token = jwt.generateToken({account: res.account, id: res.id}); //生成token
                reslove(utils.handleResponse(1, resultData, null));
            }, (err) => {
                reject(utils.handleResponse(0, null, err));
            });
        });
    }
 }