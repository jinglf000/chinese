/**
 * @author jinglf000
 * @description 文章相关处理
 * ###### Mon Feb 5 22:22:37 CST 2018
 */

const cheerio = require('cheerio');

/**
 * 文章上下册学年分类
 */
class ArticleYear {
  /**
   * 文章册
   * @param {String} title 标题
   * @param {String} url url地址
   * @param {Array} list 文章列表
   */
  constructor(title, url, list = []) {
    this.title = title;
    this.url = url;
    this.list = list;
  }
}

/**
 * 文章内容类
 */
class Article {
  /**
   * 文章内容
   * @param {Stirng} title 文章标题
   * @param {String} url 文章url地址
   * @param {String} text 文章正文
   */
  constructor(title, url, text) {
    this.title = title;
    this.url = url;
    this.text = text;
  }
}

const baseUrl = 'http://m.sbkk88.com';
const coreUrl = 'm.sbkk88.com';

/**
 * 获取总类别
 * @param {String} data
 * @return {Array} list返回ArticleeYear的集合
 */
module.exports.serializeYear = (data) => {
  const list = [];
  const $ = cheerio.load(data);
  $('.index_list1 a').each((index, ele) => {
    const obj = getUrlTitle(ele, $);
    list.push(new ArticleYear(obj.title, obj.url))
  });
  return list;
}

/**
 * 获取课文列表和url
 * @param {String} data
 * @return {Array} 返回article的集合
 */
module.exports.serializeList = (data) => {
  const list = [];
  const $ = cheerio.load(data);
  $('.index_list a').each((index, ele) => {
    const obj = getUrlTitle(ele, $);
    list.push(new Article(obj.title, obj.url))
  });
  return list;
}

/**
 * 获取文章内容
 * @param {String} data htmlStr
 */
module.exports.serializeArticle = (data) => {
  const $ = cheerio.load(data);
  return $('.articleContent').html();
}

/**
 * 解析列表返回title和url
 * @param {jQuery} ele 
 * @return {Object} title url
 */
function getUrlTitle(ele, $) {
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





