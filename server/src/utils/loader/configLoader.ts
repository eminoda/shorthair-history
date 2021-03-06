import Loader from "./loader";
const path = require('path');
const extend = require('extend2');
const debug = require('debug')('util-loader-config');

class ConfigLoader extends Loader {
    loadConfig(): any {
        const target = {};
        for (const filename of this.getTypeFiles('config')) {
            // 相同属性会覆盖
            const config = this._loadConfig(this.baseDir, filename, undefined);
            extend(true, target, config);
        }
        debug('loadConfig config %j', target);
        super.config = target;
        return target;
    }
    /**
     * 加载配置文件，返回配置数据
     * @param dirpath 路径
     * @param filename 配置文件名
     * @param extraInject 额外属性
     */
    _loadConfig(dirpath, filename, extraInject) {
        // server\config\config.default
        let filepath = super.resolveModule(path.join(dirpath, 'config', filename));
        return super.loadFile(filepath, extraInject);
    }
}
export default ConfigLoader;