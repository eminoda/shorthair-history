"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const middleware_1 = require("./middleware");
let app = new Koa();
app.use(middleware_1.default);
app.use(router_1.default.routes())
    .use(router_1.default.allowedMethods());
app.use(ctx => {
    ctx.body = 'start koa server';
});
exports.default = app;
