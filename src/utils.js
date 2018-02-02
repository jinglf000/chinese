/**
 * 常用方法封装
 */

const iconv = require('iconv-lite');
const request = require('request');


/**
 * 配合async await 使程序等待指定的时间
 * @param {Number} time 毫秒
 * @returns {Promise}
 */
function sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}


/**
 * 基于request的异步请求
 * @param {Object} obj 
 */
module.exports.ajax = (obj) => {
  return new Promise((resolve, reject) => {
    const param = Object.assign({}, {
      encoding: null
    }, obj);
    request(param, (err, response, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(response, iconv.decode(data, 'gb2312'));
    })
  })
}

module.exports.sleep = sleep;