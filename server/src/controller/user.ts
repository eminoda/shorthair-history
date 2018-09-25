import BaseController from './base';
import UserService from '../service/user';
export default class UserController extends BaseController {
    login(ctx) {
        const { username, password } = ctx.request.body;
        let exist = new UserService().login({ username, password });
        ctx.body = exist;
    }
}