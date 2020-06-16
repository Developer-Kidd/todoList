/**   
 * api接口统一管理
 */

import { get, post } from './config';

/** 登录 **/
export const login = (params) => {
    return post('/users/login', params);
};

/** 注册 **/
export const register = (params) => {
    return post('/users/reg', params);
};
