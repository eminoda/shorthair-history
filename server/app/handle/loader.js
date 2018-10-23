"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const is = require('is-type-of');
const baseDir = path.resolve(__dirname, '../../');
exports.default = {
    loadFile(filepath, ...inject) {
        filepath = path.resolve(baseDir, filepath);
        if (!filepath || !fs.existsSync(filepath)) {
            return null;
        }
        let ret = this.requireFile(filepath);
        if (is.function(ret) && !is.class(ret)) {
            ret = ret(...inject);
        }
        console.log(ret);
        return ret;
    },
    requireFile(filepath) {
        try {
            // if not js module, just return content buffer
            const extname = path.extname(filepath);
            if (extname && !require.extensions[extname]) {
                return fs.readFileSync(filepath);
            }
            // require js module
            const obj = require(filepath);
            if (!obj)
                return obj;
            // it's es module
            if (obj.__esModule)
                return 'default' in obj ? obj.default : obj;
            return obj;
        }
        catch (err) {
            err.message = `[handle] load file: ${filepath}, error: ${err.message}`;
            throw err;
        }
    }
};
