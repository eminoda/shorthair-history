import bodyParse from './bodyParser';
import onError from './onError';
import envLoader from './envLoader';
import * as compose from 'koa-compose';
let middleware = compose([
    // envLoader,
    onError,
    bodyParse()
]);
export default middleware;