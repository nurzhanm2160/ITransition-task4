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
const bcrypt = require('bcrypt');
const connection = require('../dbConfig');
class UserModel {
    static createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
            const values = [user.name, user.email, user.password];
            return new Promise((resolve, reject) => {
                connection.query(query, values, (err, result) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(result);
                    }
                });
            });
        });
    }
    static getUserByEmail(email) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const values = [email];
        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(rows[0]);
                }
            });
        });
    }
    static getAllUsers() {
        const query = 'SELECT * FROM users';
        return new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    reject(err);
                }
                else {
                    const users = rows.map(row => {
                        // Извлекаем данные о пользователе и исключаем хешированный пароль
                        const { id, name, email, active } = row;
                        return { id, name, email, active };
                    });
                    resolve(users);
                }
            });
        });
    }
    static blockUser(userId) {
        const query = 'UPDATE users SET active = 0 WHERE id = ?';
        const values = [userId];
        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    static unblockUser(userId) {
        const query = 'UPDATE users SET active = 1 WHERE id = ?';
        const values = [userId];
        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
    static deleteUser(userId) {
        const query = 'DELETE FROM users WHERE id = ?';
        const values = [userId];
        return new Promise((resolve, reject) => {
            connection.query(query, values, (err, result) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(result);
                }
            });
        });
    }
}
module.exports = UserModel;
