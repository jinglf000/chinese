/**
 * @author jinglf000
 * @description 常用方法封装
 * ###### Mon Feb 5 22:24:44 CST 2018
 */

const axios = require('axios');
const iconv = require('iconv-lite');
const fs = require('fs');

/**
 * 对axios的进一步封装，能够解码gb2312文件
 * @return {Promise}
 */
module.exports.ajaxDecode = axios.create({
  responseType: 'arraybuffer',
  transformResponse: [(data) => iconv.decode(data, 'gb2312')]
});


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