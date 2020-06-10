/*
 * 用户模块
 */

const mysql = require("../lib/mysql");
const utils = require("../lib/utils");

module.exports = {
    login: function(userName,password) {
        return new Promise((reslove,reject) => {
            if(!userName || !password) {
                const msg = !userName ? '请输入用户账号!' : '请输入用户密码!';
                reject(utils.handleResponse(0, null, msg));
            }
            const _sql = `select * from users where name=? and password=?`;
            mysql.query(_sql, [userName, password], (res) => {
                //没有查询到数据
                if(res.length < 1) {
                    reject(utils.handleResponse(0, null, '账号或密码不正确，请检查后重新登陆！'));
                }
                //正常返回
                reslove(utils.handleResponse(1, res, null));
            }, (err) => {
                reject(utils.handleResponse(0, null, err));
            });
        });
    }
 }