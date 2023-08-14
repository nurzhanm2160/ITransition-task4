const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.DB_DATABASE
});

connection.connect((error: any) => {
    if (error) {
        console.error('Error connecting to database:', error);
    } else {
        console.log('Connected to database');
        createUsersTable(); // Вызов функции для создания таблицы
    }
});

function createUsersTable() {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            active BOOLEAN DEFAULT true
        )
    `;

    connection.query(createTableQuery, (err: Error | null, result: any) => {
        if (err) {
            console.error('Error creating users table:', err);
        } else {
            console.log('Users table created');
        }
    });
}

module.exports = connection;