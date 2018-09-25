"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./base");
const user_1 = require("../service/user");
class UserController extends base_1.default {
    login(ctx) {
        const { username, password } = ctx.request.body;
        let exist = new user_1.default().login({ username, password });
        ctx.body = exist;
    }
}
exports.default = UserController;
