/*
 * 连接mysql
 */

const mysql = require("mysql");
const config = require("../config");

module.exports = {
    //创建连接池
    connect: function() {
        if(!global.pool) {
            try {
                global.pool = mysql.createPool(config.mySqlConfig);
            } catch(e){
                console.log(e);
            }
        }
    },
    //封装查询
    query: function(sql,params,successCB,errorCB) {
        global.pool.getConnection(function(err, connection) {
            connection.query(sql, params, function(err, result) {
                if(err) {
                    errorCB && errorCB.call(this,err);
                }else{
                    successCB && successCB.call(this,result); 
                }
                // 释放连接 
                connection.release();
            });
        });
    }
}

