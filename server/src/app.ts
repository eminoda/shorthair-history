import * as Koa from 'koa';
import router from './router';
import middleware from './middleware';

let app = new Koa();

app.use(middleware);

app.use(router.routes())
    .use(router.allowedMethods());

app.use(ctx => {
    ctx.body = 'start koa server';
})
export default app;