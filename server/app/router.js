"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const user_1 = require("./controller/user");
let router = new Router();
router.get('/user/login', new user_1.default().login);
exports.default = router;
