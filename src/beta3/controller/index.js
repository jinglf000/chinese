/**
 * 控制层
 * @author jinglf000
 * ###### Sun Feb 11 16:21:54 CST 2018
 */
const dao = require('../dao');

/**
 * 获取总分类列表
 * @param {Object} ctx 
 * @param {Function} next 
 */
module.exports.getYearlist = async (ctx, next) => {
  const res = await dao.findYearList();
  ctx.body = res;
  next();
}
/**
 * 获取分类列表下所有的课文
 * @param {Object} ctx 
 * @param {Function} next 
 */
module.exports.getYearArts = async (ctx, next) => {
  const res = await dao.findYearArts(ctx.params.type);
  ctx.body = res;
  next();
}

/**
 * 获取文章详情内容
 * @param {Object} ctx 
 * @param {Function} next 
 */
module.exports.getArtsDetail = async (ctx, next) => {
  const res = await dao.findArtDetail(ctx.params.id);
  ctx.body = res;
  next();
}

/**
 * 关键字查询
 * @param {Object} ctx 
 * @param {Function} next 
 */
module.exports.getArtsByKeyWord = async (ctx, next) => {
  const res = await dao.findArtByKeyWord(ctx.params.key);
  ctx.body = res;
  next();
}

/**
 * 关键字查询
 * @param {Object} ctx 
 * @param {Function} next 
 */
module.exports.getTest = async (ctx, next) => {
  const res = await dao.findTest(ctx.params.key);
  ctx.body = res;
  next();
}

/**
 * nofound 找不到404处理 
 * @param {Object} ctx 
 * @param {Function} next 
 */
module.exports.nofound = async (ctx, next) => {
  ctx.body = '<p style="text-align:center;font-size:24px">找不到页面啦~~</p>'
  next();
}

/**
 * sorry 错误500处理
 * @param {Object} ctx 
 * @param {Function} next 
 */
module.exports.sorry = async (ctx, next) => {
  ctx.body = '<p style="text-align:center;font-size:24px">服务起似乎不明白你的请求，请检查后在试。</p>'
}