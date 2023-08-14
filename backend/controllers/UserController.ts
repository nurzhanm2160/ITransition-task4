const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const UserModel = require('../models/UserModel');

import { Request, Response } from 'express';

class UserController {
    static async registerUser(req: Request, res: Response) {
        try {
            const { email } = req.body;
            const isUserExist = await UserModel.getUserByEmail(email);
            console.log('isUserExist', isUserExist)

            if(isUserExist) {
                res.status(400).json({error: 'Email is already registered'});
            } else {
                // Хэширование пароля перед сохранением
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const user = await UserModel.createUser({ ...req.body, password: hashedPassword });
                res.status(201).json({ message: 'User registered successfully', user });
            }
        } catch (e) {
            res.status(500).json({ error: 'Error registering user' });
        }
    }

    static async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await UserModel.getUserByEmail(email);

            console.log(user)
            if (!user) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            if (!user.active) {
                return res.status(401).json({ error: 'User is not active' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            console.log('passwordMatch', passwordMatch)

            if (!passwordMatch) {
                return res.status(401).json({ error: 'Invalid email or password' });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
                expiresIn: '1h'
            });

            res.json({ message: 'Login successful', token });
        } catch (e) {
            res.status(500).json({ error: 'Error logging in' });
        }
    }

    static async getUsers(req: Request, res: Response) {
        try {
            const users = await UserModel.getAllUsers();
            res.json({users});
        } catch (e) {
            res.status(500).json({error: 'Error getting users'});
        }
    }

    static async blockUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            await UserModel.blockUser(userId);
            res.json({message: 'User blocked successfully'});
        } catch (e) {
            res.status(500).json({error: 'Error blocking user'});
        }
    }

    static async unblockUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            await UserModel.unblockUser(userId);
            res.json({message: 'User unblocked successfully'});
        } catch (e) {
            res.status(500).json({error: 'Error unblocking user'});
        }
    }

    static async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            await UserModel.deleteUser(userId);
            res.json({message: 'User deleted successfully'});
        } catch (e) {
            res.status(500).json({error: 'Error deleting user'});
        }
    }
}

module.exports = UserController;