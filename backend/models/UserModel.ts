import {IUser} from "../types/IUser";
const bcrypt = require('bcrypt');

const connection = require('../dbConfig');

class UserModel {
    static async createUser(user: IUser) {
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';

        const values = [user.name, user.email, user.password];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (err: Error | null, result: any) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    }


    static getUserByEmail(email: string) {
        const query = 'SELECT * FROM users WHERE email = ?';
        const values = [email];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (err: Error | null, rows: any[]) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(rows[0])
                }
            })
        })
    }

    static getAllUsers() {
        const query = 'SELECT * FROM users';

        return new Promise((resolve, reject) => {
            connection.query(query, (err: Error | null, rows: any[]) => {
                if (err) {
                    reject(err);
                } else {
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

    static blockUser(userId: number) {
        const query = 'UPDATE users SET active = 0 WHERE id = ?';
        const values = [userId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (err: Error | null, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static unblockUser(userId: number) {
        const query = 'UPDATE users SET active = 1 WHERE id = ?';
        const values = [userId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (err: Error | null, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }

    static deleteUser(userId: number) {
        const query = 'DELETE FROM users WHERE id = ?';
        const values = [userId];

        return new Promise((resolve, reject) => {
            connection.query(query, values, (err: Error | null, result: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = UserModel;