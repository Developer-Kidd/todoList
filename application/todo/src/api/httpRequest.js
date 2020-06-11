/**   
 * api接口统一管理
 */

import { get, post } from './config';

/** 基础请求 **/
export const login = (params) => {
    return post('/users/login', params);
};