"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 参考egg Loader
 * 加载各类文件，整合并使用其方法
 */
const loaders = [
    require('./mixin/config')
];
class Loader {
    constructor() {
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
        return filePath;
    }
}
for (const loader of loaders) {
    Object.assign(Loader.prototype, loader);
}
exports.default = Loader;
