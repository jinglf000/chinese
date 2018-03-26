/**
 * 控制层
 * @author jinglf000
 * ###### Sun Feb 11 16:21:54 CST 2018
 */
const dao = require('../dao');
const util = require('../utils');
const conf = require('../config');

/**
 * 获取总分类列表
 */
module.exports.getYearlist = async (ctx, next) => {
  const res = await dao.findYearList();
  ctx.body = res;
  next();
};
/**
 * 获取分类列表下所有的课文
 */
module.exports.getYearArts = async (ctx, next) => {
  const res = await dao.findYearArts(ctx.params.type);
  ctx.body = res;
  next();
};

/**
 * 获取文章详情内容
 */
module.exports.getArtsDetail = async (ctx, next) => {
  const res = await dao.findArtDetail(ctx.params.id);
  ctx.body = res;
  next();
};

let keysResultTotal = null;

/**
 * 关键字查询，total 总页数
 */
module.exports.getArtsByKeyWord = async (ctx, next) => {
  const key = ctx.query.key;
  const page = +ctx.query.page;
  let list = [];

  // 对相同key内容查询，缓存查询总条数，并且对象里最多只有一次
  if (keysResultTotal === null || keysResultTotal[key] === undefined) {
    const total = await dao.findArtByKeyWordCount(key);
    keysResultTotal = {
      [key]: Math.ceil(total / conf.FUZZY_SINGLE_QUERY_MAX)
    };
  }

  if (page <= keysResultTotal[key]) {
    // 分批次查询
    list = await dao.findArtByKeyWord({ key, page });
    list.forEach(item => {
      item.text = util.serizeSliceStr(item.text);
    });
  }
  ctx.body = {
    total: keysResultTotal[key],
    list
  };
  next();
};

/**
 * 关键字查询 测试
 */
module.exports.getTest = async (ctx, next) => {
  const res = await dao.findTest(ctx.params.key);
  ctx.body = res;
  next();
};

/**
 * nofound 找不到404处理
 */
module.exports.nofound = async (ctx, next) => {
  ctx.body = '<p style="text-align:center;font-size:24px">找不到页面啦~~</p>';
  next();
};

/**
 * sorry 错误500处理
 */
module.exports.sorry = async (ctx, next) => {
  ctx.body =
    '<p style="text-align:center;font-size:24px">服务起似乎不明白你的请求，请检查后在试。</p>';
};
