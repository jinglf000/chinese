/**
 * article Dao 层，数据库操作
 * @author jinglf000
 * ###### Fri Feb 9 18:05:01 CST 2018
 */

const mongoose = require('mongoose');

// 连接本地测试库
mongoose.connect('mongodb://localhost/test');

const Schema = mongoose.Schema;

const schemas = {};

// 年级 schema
schemas.yearList = new Schema({
  title: String,
  id: String,
  url: String
});

// 文章 schema
schemas.articleList = new Schema({
  title: String,
  id: String,
  url: String,
  text: String,
  type: String
});

const Year = mongoose.model('yearList', schemas.yearList);
const Article = mongoose.model('articleList', schemas.articleList);

module.exports.Year = Year;
module.exports.Article = Article;
