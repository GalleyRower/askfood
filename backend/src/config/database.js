// src/config/database.js
const sqlite3 = require('sqlite3').verbose();

const dbName = 'askfood.db'; // Имя базы данных
const db = new sqlite3.Database(dbName, (err) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err.message);
  } else {
    console.log('Подключено к базе данных!');
  }
});

// Функция для создания таблиц
const createTables = () => {
  db.serialize(() => {
    // Создание таблицы users
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    )`, (err) => {
      if (err) {
        console.error('Ошибка при создании таблицы users:', err.message);
      } else {
        console.log('Таблица users успешно создана!');
      }
    });

    // Создание таблицы recipes
    db.run(`CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      ingredients TEXT,
      steps TEXT,
      images TEXT,
      authorId INTEGER,
      FOREIGN KEY (authorId) REFERENCES users(id)
    )`, (err) => {
      if (err) {
        console.error('Ошибка при создании таблицы recipes:', err.message);
      } else {
        console.log('Таблица recipes успешно создана!');
      }
    });

    // Создание таблицы favorites
    db.run(`CREATE TABLE IF NOT EXISTS favorites (
      userId INTEGER,
      recipeId INTEGER,
      PRIMARY KEY (userId, recipeId),
      FOREIGN KEY (userId) REFERENCES users(id),
      FOREIGN KEY (recipeId) REFERENCES recipes(id)
    )`, (err) => {
      if (err) {
        console.error('Ошибка при создании таблицы favorites:', err.message);
      } else {
        console.log('Таблица favorites успешно создана!');
      }
    });
  });
};

// Вызов функции для создания таблиц
createTables();

module.exports = db;