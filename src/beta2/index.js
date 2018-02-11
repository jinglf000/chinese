/**
 * main file
 * @author jinglf000
 * @description 主程序
 */
const utils = require('./utils');
const cheerio = require('cheerio');
const axios = require('axios');
const article = require('./article');
const fs = require('fs');

const ajax = utils.ajaxDecode;

// 本地抓包代理
axios.defaults.proxy = {
  host: '127.0.0.1',
  port: 8888
};

/**
 * 获取文章内容
 */
async function getArticleList() {
  try {
    const prevUrl = 'http://m.sbkk88.com/yuwenkewen/';
    const allTypes = (await ajax.get(prevUrl)).data;
    const list = article.serializeYear(allTypes);
    const duration = 6;
    let articleId = 1;
    
    for (let i = 0; i < list.length; i ++) {
      const current = list[i];
      current.id = `typeid${i}`;
      const yearList = (await ajax.get(current.url)).data;
      current.list = article.serializeList(yearList);

      for (let j = 0; j < current.list.length; j += duration) {
        let m = 0;
        let promiseAll = [];
        while (current.list[j + m] && m < duration) {
          const listnum = j + m;
          const currentArticle = current.list[listnum];
          promiseAll.push(ajax.get(currentArticle.url).then((res) => {
            currentArticle.text = article.serializeArticle(res.data);
            currentArticle.id = `${current.id}_${listnum}`;
            // const obj = Object.assign({}, currentArticle, { type: current.title, id: articleId ++ });
          }));
          m++;
        }
        await Promise.all(promiseAll); 
      }
    }
    return list;
  } catch(err) {
    console.log(err);
  }
}

console.time('time');
getArticleList().then(res => {
  utils.exportJsonFile('article.json', res);
  console.timeEnd('time');
});
