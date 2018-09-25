import bodyParse from './bodyParser';
import * as compose from 'koa-compose';
let middleware = compose([
    bodyParse()
]);
export default middleware;