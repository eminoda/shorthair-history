"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const middleware_1 = require("./middleware");
const configLoader_1 = require("./utils/loader/configLoader");
let app = new Koa();
app.context.db = new configLoader_1.default().loadConfig();
console.log(app.context.db);
app.use(middleware_1.default);
app.use(router_1.default.routes())
    .use(router_1.default.allowedMethods());
exports.default = app;
