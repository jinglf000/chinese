const Koa = require('koa');
const axios = require('axios');
const cheerio = require('cheerio');
const Logger = require('koa-logger');
const url = require('url');
const chalk = require('chalk');
const iconv = require('iconv-lite');


const utils = require('./utils');
const serize = require('./serizeArticle');

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
    const pageYear = await utils.ajax({uri: baseUrl, method: 'get'});
    const yuwen = serize.getArticleYear(pageYear.data);
    // 获取文章名和url
    const duration = 15;
    for (let i = 0; i < yuwen.length; i++) {
      const cur = yuwen[i];
      const article = await utils.ajax({ uri: cur.url, method: 'get'});
      cur.list = serize.getArticleYearList(article.data);
      for (let j = 0; j < cur.list.length; j ++) {
        const curArticle = cur.list[j];
        const articleHtml = await utils.ajax({ uri: curArticle.url, method: 'get'});
        const $ = cheerio.load(articleHtml.data, {
          decodeEntities: false
        });
        console.log(articleHtml.data);
        curArticle.text = $('.articleContent').html();
        console.log(curArticle.text);
      }
    }
    // 获取文章内容
    const resultArticle = JSON.stringify(yuwen);
    ctx.body = 'ok 抓取成功';
    utils.exportJsonFile(resultArticle);
  } catch (err) {
    console.log(err);
  }
});


app.listen(9999);
console.log('server is runing at 9999');