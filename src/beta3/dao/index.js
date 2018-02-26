/**
 * 数据库查询
 * @author jinglf000
 * ###### Sun Feb 11 16:21:48 CST 2018
 */
const article = require('./articleDao');

/**
 * 查询全部分类
 * @return {Promise}
 */
const findYearList = function () {
  return article.Year.find();
};

/**
 * 查询当前分类下所有的文章
 * @param {String} type 类型
 * @return {Promise}
 */
const findYearArts = function (type) {
  return article.Article.find({ type});
}

/**
 * 查询文章详情
 * @param {String} id 文章id
 * @return {Promise}
 */
const findArtDetail = function (id) {
  return article.Article.find({ id });
}

/**
 * 关键字查询
 * @param {String} key 关键字
 * @return {Promise}
 */
const findArtByKeyWord = function (key) {
  const regexp = new RegExp(key);
  return article.Article.find().or([{ title: regexp }, { text: regexp }]);
}

/**
 * 查询测试，对文章的正文内容进行查询
 * @param {String} key 关键字
 */
const findTest = function (key) {
  const regexp = new RegExp(key);
  return article.Article.find().where('text', regexp);
}

module.exports.findYearList = findYearList;
module.exports.findYearArts = findYearArts;
module.exports.findArtDetail = findArtDetail;
module.exports.findArtByKeyWord = findArtByKeyWord;
module.exports.findTest = findTest;