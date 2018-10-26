
// import * as onError from 'koa-onerror';
// export default onError;
export default async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        // 404...
        ctx.status = err.status || 500;
        // header...
        ctx.body = {
            status: false,
            error: err.message
        };
        console.log(err);
    }
};