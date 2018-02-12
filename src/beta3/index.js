/**
 * main
 * @author jinglf000
 * ###### Sun Feb 11 16:53:23 CST 2018
 */

const Koa = require('koa');
const Logger = require('koa-logger');
const static = require('koa-static');
const shell = require('shelljs');

const routerConf = require('./routers');
const utils = require('./utils');

const routers = routerConf.routers;
const app = new Koa();

app.use(new Logger());
app.use(utils.exception);
app.use(static('./static'));

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(3000, () => {
  shell.exec('start http://localhost:3000');
});


