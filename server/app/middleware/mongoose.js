"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const conn = mongoose.connect();
let envLoader = (ctx, next) => {
};
exports.default = envLoader;
