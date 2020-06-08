import axios from 'axios';
import qs from 'qs';

//全局配置
axios.defaults.timeout = 10000;
//根据环境配置baseUrl
axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? '/test' : '';

//请求拦截
axios.interceptors.request.use(config => {
    return config;
}, error => {
    console.log(error); // for debug
    Promise.reject(error);
});

//响应拦截
axios.interceptors.response.use(response => {
    return response;
}, error => {
    //处理错误码
    Promise.reject(error);
});

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, { params: params }).then(res => {
          resolve(res.data);
        }).catch(err =>{
            reject(err.data)        
        })    
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, qs.stringify(params)).then(res => {
          resolve(res.data);
        }).catch(err =>{
          reject(err.data)
        })
    });
}

