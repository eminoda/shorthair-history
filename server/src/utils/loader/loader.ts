import { LoaderOptions } from '../../interfaces/utils';
const debug = require('debug')('Loader');
const path = require('path');
const fs = require('fs');
const extend = require('extend2');
/**
 * 参考egg Loader
 * 加载各类文件，整合并使用其方法
 */
const loaders = [
    require('./mixin/config')
]
class Loader {
    baseDir;
    serverEnv;
    config;
    constructor(options: LoaderOptions = {}) {
        debug('init');
        this.baseDir = options.baseDir || process.cwd();
        this.serverEnv = this.getServerEnv();
    }
    // 加载 config 目录下配置文件
    getTypeFiles(filename) {
        const files = [`${filename}.default`];
        if (this.serverEnv === 'default') return files;
        files.push(`${filename}.${this.serverEnv}`);
        debug('getTypeFiles %j', files);
        return files;
    }
    getServerEnv() {
        let serverEnv = process.env.SERVER_ENV;
        if (process.env.NODE_ENV === 'production') {
            serverEnv = 'prod';
        } else {
            serverEnv = 'dev';
        }
        debug('serverEnv %j', serverEnv);
        return serverEnv;
    }
    resolveModule(filePath) {
        let fullPath;
        try {
            // skill
            fullPath = require.resolve(filePath);
        } catch (e) {
            return '';
        }
        return fullPath;
    }
    loadFile(filepath, ...inject) {
        if (!filepath || !fs.existsSync(filepath)) {
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
            if (!obj) return obj;
            // it's es module
            if (obj.__esModule) return 'default' in obj ? obj.default : obj;
            return obj;
        } catch (err) {
            err.message = `[handle] load file: ${filepath}, error: ${err.message}`;
            throw err;
        }
    }
}


for (const loader of loaders) {
    Object.assign(Loader.prototype, loader);
}

export default Loader;