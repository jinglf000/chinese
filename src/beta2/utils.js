/**
 * @author jinglf000
 * @description 常用方法封装
 * ###### Mon Feb 5 22:24:44 CST 2018
 */

const axios = require('axios');
const iconv = require('iconv-lite');
const fs = require('fs');
const chalk = require('chalk');

/**
 * 对axios的进一步封装，能够解码gb2312文件
 * @return {Promise}
 */
module.exports.ajaxDecode = axios.create({
  responseType: 'arraybuffer',
  transformResponse: [(data) => iconv.decode(data, 'gb2312')]
});

// axios options的优先级 axios.get(options) > axios.create options > axios.defaults

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
 * @param {String} file 文件名
 * @param {Object} obj 文件内容
 */
module.exports.exportJsonFile = (file, obj) => {
  const writeStream = fs.createWriteStream(file);

  writeStream.write(typeof obj === 'object' ? JSON.stringify(obj) : obj, 'UTF8');

  writeStream.end();
  
  writeStream.on('finish', () => {
    console.log('写入完成');
  });
}

/**
 * 打印带有时间戳的成功日志
 * @param {String} msg 
 */
module.exports.logSuccess = (msg) => {
  console.log(chalk.green(`${dateNow()} ====>`) + msg);
}

/**
 * 打印出带有时间戳的错误日志
 * @param {String} msg 
 */
module.exports.logError = (msg) => {
  console.log(chalk.red(`${dateNow()} ====>`) + msg);
}

/**
 * 返回格式化的当前时间
 * @returns {String} '2017-08'
 */
function dateNow() {
  const now = new Date();
  const date = `${now.getFullYear()}-${serizeZero(now.getMonth() + 1)}-${serizeZero(now.getDate())}`;
  const hours = `${serizeZero(now.getHours())}:${serizeZero(now.getMinutes())} ${serizeZero(now.getSeconds())}`;
  return `${date} ${hours}`;
}

/**
 * 为字符串补零
 * @param {String|Number} str 输入数字或字符串
 * @return {String} 
 */
function serizeZero(str) {
  let res = '';
  let input = str.toString();
  if (input.length > 1) {
    res = input;
  } else {
    res = `0${input}`;
  }
  return res;
}