const Koa = require('koa');
const axios = require('axios');
// const cheerio = require('cheerio');
const Logger = require('koa-logger');
const url = require('url');
const chalk = require('chalk');
const iconv = require('iconv-lite');
const ajax = require('./ajax');

const utils = require('./utils');
const getChinese = require('./getChinese');

// 配置axios 代理用于抓包
axios.defaults.proxy = {
  host: '127.0.0.1',
  port: 8888
}
// 接口编码处理
// axios.interceptors.response.use(function (response) {
//   const ctype = response.headers['content-type'];
//   // response.data = ctype.includes('charset=GB2312') ? 
//   //   iconv.decode(response.data, 'gb2312') :
//   //   iconv.decode(response.data, 'utf-8');
//   console.log( '原始值： ',response.data);
//   response.data = iconv.decode(response.data, 'utf-8');

//   console.log('gb2312 后的值', response.data);
//   return response;
// });


const app = new Koa();

app.use(new Logger());

app.use(async (ctx, next) => {
  try {
    const baseUrl = 'http://m.sbkk88.com/yuwenkewen/';
    const pageYear = ajax
    const pageYear = await axios.get(baseUrl);
    const yuwen = getChinese.getArticleYear(pageYear.data);

    const duration = 6;
    for (let i = 0; i < yuwen.length; i++) {
      // console.log(yuwen[i]);
    }

  } catch (err) {
    console.log(err);
  }
});


app.listen(9999);
console.log('server is runing at 9999');