/**
 * main file
 * @author jinglf000
 * @description 主程序
 */
const utils = require('./utils');
const cheerio = require('cheerio');
const axios = require('axios');
const article = require('./article');

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

    for (let i = 0; i < list.length; i ++) {
      const current = list[i];
      const yearList = (await ajax.get(current.url)).data;
      current.list = article.serializeList(yearList);
      for (let j = 0; j < current.list.length; j ++) {
        const currentArticle = current.list[j];
        currentArticle.text = (await ajax.get(currentArticle.url)).data
      }
    }

    return list;
  } catch(err) {
    console.log(err);
  }
}

getArticleList().then(res => {
  // console.log(JSON.stringify(res));
  utils.exportJsonFile(res);
});
