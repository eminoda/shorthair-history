"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loader_1 = require("../handle/loader");
let envLoader = (ctx, next) => {
    loader_1.default.loadFile('config/config.default.js', {
        aaa: 2
    });
    next();
    console.log('end');
};
exports.default = envLoader;
