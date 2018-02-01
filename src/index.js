const Koa = require('koa');
const axios = require('axios');
// const cheerio = require('cheerio');
const Logger = require('koa-logger');
const url = require('url');
const chalk = require('chalk');
const iconv = require('iconv-lite');

const utils = require('./utils');
const getChinese = require('./getChinese');

// 配置axios 代理用于抓包
axios.defaults.proxy = {
  host: '127.0.0.1',
  port: 8888
}

axios.interceptors.response.use(function (response) {
  var ctype = response.headers["content-type"];
  response.data = ctype.includes("charset=GB2312") ?
    iconv.decode(response.data, 'gb2312') :
    iconv.decode(response.data, 'utf-8');
  return response;
})

const app = new Koa();

app.use(new Logger());

app.use(async (ctx, next) => {
  try {
    const baseUrl = 'http://m.sbkk88.com/yuwenkewen/';
    const pageYear = await axios.get(baseUrl, {
      headers: {
        'content-type': 'text/html;charset=GB2312'
      }
    });
    const yuwen = getChinese.getArticleYear(pageYear.data);

    const duration = 6;
    for (let i = 0; i < yuwen.length; i ++) {
      console.log(yuwen[i]);
    }

  } catch (err) {
    console.log(err);
  }
});


app.listen(3001);