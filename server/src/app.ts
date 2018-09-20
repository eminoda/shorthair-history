import * as Koa from 'koa';
let app = new Koa();
app.use(ctx => {
    ctx.body = 'start koa server';
})
export default app;