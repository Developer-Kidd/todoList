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
            mysql.exec(_sql, [account, password], (res) => {
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
    },
    reg: function(account, password) {
        return new Promise((reslove,reject) => {
            if(!account || !password) {
                const msg = !account ? '请输入用户账号!' : '请输入用户密码!';
                reject(utils.handleResponse(0, null, msg));
            }
            const _sql = `insert into users(name,account,password) VALUES(?,?,?)`;
            mysql.exec(_sql, [account, account, password], res => {
                //注册成功
                if(res && res.insertId) {
                    reslove(utils.handleResponse(1, res.insertId, null));
                }
            }, err => {
                let errMsg = err.sqlMessage;
                //错误处理
                switch(err.errno) {
                    case 1062:
                        errMsg = '账号已存在，请直接登陆!'; 
                        break;
                    default:
                        break;    
                }
                reject(utils.handleResponse(0, null, errMsg));
            });
        });
    },
    
 }