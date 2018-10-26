import * as Koa from 'koa';
import router from './router';
import middleware from './middleware';
import ConfigLoader from './utils/loader/configLoader';
import { AppKoa } from './interfaces/appKoa';
let app = new Koa() as AppKoa;

let gobalConfig = new ConfigLoader().loadConfig();
app.context.db = gobalConfig.mongo;

console.log(app.context.db);
app.use(middleware);

app.use(router.routes())
    .use(router.allowedMethods());

export default app;