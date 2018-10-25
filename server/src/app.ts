import * as Koa from 'koa';
import router from './router';
import middleware from './middleware';
import ConfigLoader from './utils/loader/configLoader';
let app = new Koa();

new ConfigLoader().loadConfig();

app.use(middleware);

app.use(router.routes())
    .use(router.allowedMethods());

export default app;