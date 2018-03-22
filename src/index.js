/**
 * main
 * @author jinglf000
 * ###### Sun Feb 11 16:53:23 CST 2018
 */

const Koa = require('koa');
const Logger = require('koa-logger');
const static = require('koa-static');
const shell = require('shelljs');
const compress = require('koa-compress');
const path = require('path');

const routerConf = require('./routers');
const utils = require('./utils');

const routers = routerConf.routers;
const app = new Koa();
const port = 80;

// app.use(compress({ threshold: 2048 }));
app.use(new Logger());
app.use(utils.exception);
app.use(utils.daoDataException);
app.use(static(path.resolve(__dirname, './static')));

app.use(routers.routes()).use(routers.allowedMethods());

app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
  // shell.exec('start http://localhost:3000');
});
