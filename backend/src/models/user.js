// src/models/user.js
const bcrypt = require('bcryptjs');

const User = {
    create: async (db, username, password) => {
        const hashedPassword = await bcrypt.hash(password, 10); // Хешируем пароль
        const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
        const params = [username, hashedPassword];
        const result = await db.run(sql, params);
        return { id: result.lastID, username };
    },

    findByUsername: async (db, username) => {
        const sql = `SELECT * FROM users WHERE username = ?`;
        const params = [username];
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
    findById: async (db, id) => {
        const sql = `SELECT * FROM users WHERE id = ?`;
        const params = [id];
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    },
    findAll: async (db) => {
        const sql = `SELECT * FROM users`;
        return new Promise((resolve, reject) => {
            db.all(sql, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
};

module.exports = User;