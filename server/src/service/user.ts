import * as mongoose from 'mongoose';
import { userSchema } from '../schema/user';
import UserModel from '../model/user';
// const mongoose = require('mongoose');
export default class UserService {
    async login(user: UserModel) {
        // return user ? true : false;
        var UserModal = mongoose.model('user', userSchema)
        return UserModal.find();
    }
}