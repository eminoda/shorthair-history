import * as Koa from 'koa';
import router from './router';
import middleware from './middleware';
import Loader from './utils/loader';

let app = new Koa();

new Loader().loadConfig()

app.use(middleware);

app.use(router.routes())
    .use(router.allowedMethods());

export default app;