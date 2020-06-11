/*
 * token 模块
 */

const fs = require("fs");
const path = require("path");
const jwt = require('jsonwebtoken');

const token = {
    //生成token
    generateToken: function (data) {
        const createdTime = Math.floor(Date.now() / 1000); //创建时间
        const cert = fs.readFileSync(path.join(__dirname, '../cert/rsa_private_key.pem')); //私钥
        const token = jwt.sign({
            data,
            exp: createdTime + 60 * 30,
        }, cert, {
            algorithm: 'RS256'
        });
        return token;
    },
    //验证token
    verifyToken: function(token) {
        const cert = fs.readFileSync(path.join(__dirname, '../cert/rsa_public_key.pem')); //公钥
        let res = null;
        try {
            const result = jwt.verify(token, cert, {algorithms: ['RS256']}) || {};
            const {exp = 0} = result, current = Math.floor(Date.now() / 1000);
            if (current <= exp) {
                res = result.data || {};
            }
        } catch (e) {
            res = 'err';
        }
        return res;
    }
}

module.exports = token;