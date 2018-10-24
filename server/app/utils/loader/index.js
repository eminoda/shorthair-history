'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs');
const extend = require('extend2');
/**
 * 参考egg Loader
 * 加载各类文件，整合并使用其方法
 */
// TODO:如何定义index.d.ts
const loaders = [
    require('./mixin/config')
];
class Loader {
    constructor(options = {}) {
        this.baseDir = options.baseDir || process.cwd();
        for (const loader of loaders) {
            Object.assign(Loader.prototype, loader);
        }
    }
    resolveModule(filePath) {
        let fullPath;
        try {
            // skill
            fullPath = require.resolve(filePath);
        }
        catch (e) {
            return '';
        }
        return fullPath;
    }
    loadFile(filepath, ...inject) {
        if (!filepath || !fs.existsSync(filepath)) {
            console.log(2);
            return null;
        }
        let ret = this.requireFile(filepath);
        ret = extend(true, ret, ...inject);
        return ret;
    }
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
}
exports.default = Loader;
