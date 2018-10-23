import * as Router from 'koa-router';
import UserController from './controller/user';

let router = new Router();

router.get('/user/login', new UserController().login);

export default router;