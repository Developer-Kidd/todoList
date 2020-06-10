/*
 * 常用工具类
 */

 module.exports = {
    /*
    * 统一处理响应
    * isSuccess: 是否成功响应， 0：失败响应，00.成功响应 
    * data: 成功响应返回数据
    * errMsg: 错误的信息
    */
    handleResponse: function(isSuccess = 0, data, errMsg = '') {
        const result = {};
        result.stausCode = !isSuccess ? '0' : '00';
        if(isSuccess) {
            result.data = data;
        } else {
            result.msg = errMsg;
        }
        return result;
    }
 }