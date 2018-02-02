/* 
 * 获取课文文字内容
 * 
 */

const cheerio = require('cheerio');
const article = require('./article');
const iconv = require('iconv-lite');


const baseUrl = 'http://m.sbkk88.com';
const coreUrl = 'm.sbkk88.com';

/**
 * 获取学年分类
 * @param {String} data 页面
 * @return {Array} list返回ArticleYear的集合
 */
module.exports.getArticleYear = (data) => {
  const list = [];
  const $ = cheerio.load(data, {
    decodeEntities: false
  });
  $('.index_list1 a').each((index, ele) => {
    const obj = serizeList(ele, $);
    list.push(new article.ArticlYear(obj.title, obj.url))
  });
  return list;
}

/**
 * 获取课文类
 * @param {String} data 页面
 * @return {Array} 返回article的集合
 */
module.exports.getArticleYearList = (data) => {
  const list = [];
  const dataUtf8 = iconv.decode(data, 'gb2312')
  const $ = cheerio.load(dataUtf8);
  $('.index_list a').each((index, ele) => {
    const obj = serizeList(ele, $);
    list.push(new article.Artical(obj.title, obj.url))
  });
  return list;
}


/**
 * 解析列表
 * @param {jQuery} ele 
 * @return {Object} title url
 */
function serizeList(ele, $) {
  const $ele = $(ele);
  let title = $ele.text();
  title = title.substring(0, title.length - 1);
  let url = $ele.attr('href');
  if (url.indexOf(coreUrl) < 0) {
    url = baseUrl + url;
  }
  return {
    url,
    title
  };
}