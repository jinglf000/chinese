/**
 * 路由表
 * @author jinglf000
 * ###### Sun Feb 11 22:41:06 CST 2018
 */

const Router = require('koa-router');
const controller = require('./controller');
const utils = require('./utils');

const routers = new Router();

/**
 * 404 500 错误处理
 */
// routers.use(utils.exception);

routers.get('/', controller.getYearlist);

routers.get('/api/getList', controller.getYearlist);

routers.get('/api/year/:type', controller.getYearArts);

routers.get('/api/detail/:id', controller.getArtsDetail);

// routers.get('/s', controller)

routers.get('/nofound', controller.nofound);

routers.get('/sorry', controller.sorry);

module.exports.routers = routers;