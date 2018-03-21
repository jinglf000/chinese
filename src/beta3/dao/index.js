/**
 * 数据库查询
 * @author jinglf000
 * ###### Sun Feb 11 16:21:48 CST 2018
 */
const article = require('./articleDao');
const conf = require('../config');

/**
 * 查询全部分类
 * @desc 返回{title,id}格式的类别数组
 * @return {Promise}
 */
const findYearList = function() {
  return article.Year.find(null, { title: 1, id: 1, _id: 0 });
};

/**
 * 查询当前分类下所有的文章
 * @param {String} type 类型
 * @desc 根据文章类别查询所有，同类型的文章，返回{title，id}
 * @return {Promise}
 */
const findYearArts = function(type) {
  return article.Article.find({ type }, { title: 1, id: 1, _id: 0 });
};

/**
 * 查询文章详情
 * @param {String} id 文章id
 * @desc 根据文章id查询文章内容，返回{id, text}
 * @return {Promise}
 */
const findArtDetail = function(id) {
  return article.Article.find({ id }, { id: 1, title: 1, text: 1, _id: 0 });
};

/**
 * 关键字查询
 * @param {String} key 关键字
 * @desc 根据关键字，查询所有的文章标题或者是内容，返回{title,id}
 * @return {Promise}
 */
const findArtByKeyWord = function(key) {
  const regexp = new RegExp(key);
  return article.Article.find(null, { title: 1, id: 1, _id: 0, text: 1 })
    .or([{ title: regexp }, { text: regexp }])
    .limit(conf.FUZZY_QUERY_MAX);
};

/**
 * 查询测试，对文章的正文内容进行查询
 * @param {String} key 关键字
 */
const findTest = function(key) {
  const regexp = new RegExp(key);
  return article.Article.find().where('text', regexp);
};

module.exports.findYearList = findYearList;
module.exports.findYearArts = findYearArts;
module.exports.findArtDetail = findArtDetail;
module.exports.findArtByKeyWord = findArtByKeyWord;
module.exports.findTest = findTest;
