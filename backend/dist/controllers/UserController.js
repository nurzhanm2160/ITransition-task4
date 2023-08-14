"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const UserModel = require('../models/UserModel');
class UserController {
    static registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const isUserExist = yield UserModel.getUserByEmail(email);
                console.log('isUserExist', isUserExist);
                if (isUserExist) {
                    res.status(400).json({ error: 'Email is already registered' });
                }
                else {
                    // Хэширование пароля перед сохранением
                    const hashedPassword = yield bcrypt.hash(req.body.password, 10);
                    const user = yield UserModel.createUser(Object.assign(Object.assign({}, req.body), { password: hashedPassword }));
                    res.status(201).json({ message: 'User registered successfully', user });
                }
            }
            catch (e) {
                res.status(500).json({ error: 'Error registering user' });
            }
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const user = yield UserModel.getUserByEmail(email);
                console.log(user);
                if (!user) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
                if (!user.active) {
                    return res.status(401).json({ error: 'User is not active' });
                }
                const passwordMatch = yield bcrypt.compare(password, user.password);
                console.log('passwordMatch', passwordMatch);
                if (!passwordMatch) {
                    return res.status(401).json({ error: 'Invalid email or password' });
                }
                const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
                    expiresIn: '1h'
                });
                res.json({ message: 'Login successful', token });
            }
            catch (e) {
                res.status(500).json({ error: 'Error logging in' });
            }
        });
    }
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserModel.getAllUsers();
                res.json({ users });
            }
            catch (e) {
                res.status(500).json({ error: 'Error getting users' });
            }
        });
    }
    static blockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                yield UserModel.blockUser(userId);
                res.json({ message: 'User blocked successfully' });
            }
            catch (e) {
                res.status(500).json({ error: 'Error blocking user' });
            }
        });
    }
    static unblockUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                yield UserModel.unblockUser(userId);
                res.json({ message: 'User unblocked successfully' });
            }
            catch (e) {
                res.status(500).json({ error: 'Error unblocking user' });
            }
        });
    }
    static deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.userId;
                yield UserModel.deleteUser(userId);
                res.json({ message: 'User deleted successfully' });
            }
            catch (e) {
                res.status(500).json({ error: 'Error deleting user' });
            }
        });
    }
}
module.exports = UserController;
