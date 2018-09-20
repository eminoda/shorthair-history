"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
let app = new Koa();
app.use(ctx => {
    ctx.body = 'start koa server';
});
exports.default = app;
