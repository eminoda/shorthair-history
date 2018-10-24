"use strict";
const path = require('path');
const fs = require('fs');
const extend = require('extend2');
const baseDir = '';
module.exports = {
    loadConfig() {
        const defaultConfig = this._preloadConfig();
        console.log(defaultConfig);
    },
    _preloadConfig() {
        // TODO:通过环境配置，加载额外config配置
        const names = [
            'config.default'
            // `config.xxx`
        ];
        const target = {};
        for (const filename of names) {
            const config = this._loadConfig(this.baseDir, filename, undefined);
            extend(true, target, config);
        }
        return target;
    },
    /**
     * 加载配置文件，返回配置数据
     * @param dirpath 路径
     * @param filename 配置文件名
     * @param extraInject 额外属性
     */
    _loadConfig(dirpath, filename, extraInject) {
        // server\config\config.default
        let filepath = this.resolveModule(path.join(dirpath, 'config', filename));
        return this.loadFile(filepath, extraInject);
    }
};
