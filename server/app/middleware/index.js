"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser_1 = require("./bodyParser");
const compose = require("koa-compose");
let middleware = compose([
    bodyParser_1.default()
]);
exports.default = middleware;
