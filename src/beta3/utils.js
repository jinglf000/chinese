/**
 * 常用方法封装处理
 * @author jinglf000
 * ###### Mon Feb 12 10:55:59 CST 2018
 */


/**
 * exception 错误处理
 */
module.exports.exception = async (ctx, next) => {
  try {
    await next();
    const status = ctx.status || 404;
    if (status === 404) {
      ctx.throw(404);
    }
  } catch(err) {
    ctx.status = err.status || 500;
    if (ctx.status === 404) {
      ctx.response.redirect('/nofound');
    } else {
      ctx.response.redirect('/sorry');
    }
  }
}