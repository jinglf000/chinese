/**
 * 路由表
 * @author jinglf000
 */

const Router = require('koa-router');
const controller = require('./controller');

const routers = new Router();



routers.get('/', async (ctx, next) => {
  const res = await controller.getYearlist();
  ctx.body = res;
  next();
});

routers.redirect('/getList', '/');

routers.get('/year/:type', async (ctx, next) => {
  const res = await controller.getYearArts(ctx.params.type);
  ctx.body = res;
  next();
});

routers.get('/detail/:id', async (ctx, next) => {
  const res = await controller.getArtsDetail(ctx.params.id);
  ctx.body = res;
  next();
})

module.exports.routers = routers;