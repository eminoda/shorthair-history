import UserModel from '../model/user';

export default class UserService {
    login(user: UserModel) {
        return user ? true : false;
    }
}