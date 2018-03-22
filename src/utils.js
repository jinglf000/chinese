/**
 * 常用方法封装处理
 * @author jinglf000
 * ###### Mon Feb 12 10:55:59 CST 2018
 */

const conf = require('./config');

/**
 * @desc exception 错误处理
 */
module.exports.exception = async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch (err) {
    ctx.status = err.status || 500;
    if (ctx.status === 404) {
      ctx.response.redirect('/nofound');
    } else {
      ctx.response.redirect('/sorry');
    }
  }
};

/**
 * @desc Dao Exception and interface return value
 */
module.exports.daoDataException = async (ctx, next) => {
  try {
    await next();
    ctx.body = {
      code: conf.SUCCESS,
      msg: conf.SUCCESS_MSG,
      data: ctx.body
    };
  } catch (err) {
    ctx.body = {
      code: conf.FAIL,
      msg: err,
      data: ctx.body
    };
  }
};

/**
 * 对输入的html字符串进行过滤标签，
 * 并截取SUMMERY_MAX_LENGTH的最大长度
 * @param {String} str 输入字符串
 * @return 字符串
 */
module.exports.serizeSliceStr = str => {
  const reg = /(<[^><]+>)|(\\n)|(\\r)/g;
  const normalStr = str.replace(reg, '');
  return normalStr.length > conf.SUMMERY_MAX_LENGTH
    ? `${normalStr.substr(0, conf.SUMMERY_MAX_LENGTH)}...`
    : normalStr;
};
