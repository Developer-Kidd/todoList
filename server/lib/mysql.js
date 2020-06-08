/*
 * 连接mysql
 */

const mysql = require("mysql");
const config = require("../config");

module.exports = {
    connect: function() {
        //单例模式
        if(!global.connection) {
            try {
                global.connection = mysql.createConnection(config.mySqlConfig);
                global.connection.connect();//连接数据库   
            } catch(e){
                console.log(e);
            }
        }
    }
}

