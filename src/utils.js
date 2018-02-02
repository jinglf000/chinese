/**
 * 常用方法封装
 */

const iconv = require('iconv-lite');
const request = require('request');
const fs = require('fs');

/**
 * 配合async await 使程序等待指定的时间
 * @param {Number} time 毫秒
 * @returns {Promise}
 */
module.exports.sleep = (time) => {
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
      const result = iconv.decode(data, 'gb2312');
      resolve({
        response,
        data: result
      });
    })
  })
}


/**
 * 写入Obj到article.json文件
 * @param {Object} obj 
 */
module.exports.exportJsonFile = (obj) => {
  const writeStream = fs.createWriteStream('article.json');

  writeStream.write(typeof obj === 'object' ? JSON.stringify(obj) : obj, 'UTF8');

  writeStream.end();

  writeStream.on('finish', () => {
    console.log('写入完成');
  });
}