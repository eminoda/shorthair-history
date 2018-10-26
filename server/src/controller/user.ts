import BaseController from './base';
import UserService from '../service/user';
export default class UserController extends BaseController {
    async login(ctx) {
        const { username, password } = ctx.request.body;
        let user = await new UserService().login({ username, password });
        ctx.body = user;
    }
}