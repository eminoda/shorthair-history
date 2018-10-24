"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser_1 = require("./bodyParser");
const onError_1 = require("./onError");
const compose = require("koa-compose");
let middleware = compose([
    // envLoader,
    onError_1.default,
    bodyParser_1.default()
]);
exports.default = middleware;
