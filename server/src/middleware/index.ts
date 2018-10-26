import bodyParse from './bodyParser';
import onError from './onError';
import * as compose from 'koa-compose';
let middleware = compose([
    onError,
    bodyParse()
]);
export default middleware;