
const debug = require('debug')('envLoader');
let envLoader = (ctx, next) => {
    debug('db %j', ctx.db);
    next();
    // loader.loadFile('config/config.default.js', {
    //     aaa: 2
    // });
    // next();
};

export default envLoader;