/*
 * 工具类
 */

/*
 * 设置数据到sessionStorage
 * 参数：1.key: 2.value
 */
function setItem(key, value) {
  if (!window.sessionStorage) {
    console.log("当前浏览器不支持sessionStorage");
    return;
  }
  window.sessionStorage.setItem(key, JSON.stringify(value));
}

/*
 * 从sessionStorage获取数据
 * 参数：key
 * return 获取到的数据
 */
function getItem(key) {
  if (!window.sessionStorage) {
    console.log("当前浏览器不支持sessionStorage");
    return;
  }
  return JSON.parse(window.sessionStorage.getItem(key));
}

export default {
  setItem,
  getItem
}
