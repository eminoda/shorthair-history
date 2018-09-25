import * as Router from 'koa-router';
import UserController from './controller/user';

let router = new Router();

router.post('/user/login', new UserController().login);

export default router;