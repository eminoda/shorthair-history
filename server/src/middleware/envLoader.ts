
const debug = require('debug')('envLoader');
let envLoader = (ctx, next) => {
    debug('db %j', ctx.state.db);
    // loader.loadFile('config/config.default.js', {
    //     aaa: 2
    // });
    // next();
    // console.log('end');
};

export default envLoader;