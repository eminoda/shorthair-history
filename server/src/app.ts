import * as Koa from 'koa';
import router from './router';
import middleware from './middleware';
import { handle } from './utils/handle';
import { AppKoa } from './interfaces/appKoa';

let app = <AppKoa>new Koa();

handle.getAppConfig(app);
handle.connectDB(app);

app.use(middleware);

app.use(router.routes())
    .use(router.allowedMethods());

export default app;