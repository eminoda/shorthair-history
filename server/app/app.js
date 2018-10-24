"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const router_1 = require("./router");
const middleware_1 = require("./middleware");
const loader_1 = require("./utils/loader");
let app = new Koa();
new loader_1.default().loadConfig();
app.use(middleware_1.default);
app.use(router_1.default.routes())
    .use(router_1.default.allowedMethods());
exports.default = app;
