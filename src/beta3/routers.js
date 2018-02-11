/**
 * 路由表
 * @author jinglf000
 * ###### Sun Feb 11 22:41:06 CST 2018
 */

const Router = require('koa-router');
const controller = require('./controller');

const routers = new Router();

routers.use(function (ctx, next) {
  console.log('path?', ctx.path);
  next();
});

routers.get('/', controller.getYearlist);

routers.redirect('/getList', '/');

routers.get('/year/:type', controller.getYearArts);

routers.get('/detail/:id', controller.getArtsDetail);


module.exports.routers = routers;