// src/app.js
const express = require('express');
const cors = require('cors');
const db = require('./config/database'); //  Импортируем напрямую объект db
const usersRoute = require('./routes/users');
const recipesRoute = require('./routes/recipes');
const favoritesRoute = require('./routes/favorites');
const authRoute = require('./routes/auth'); // Добавляем
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());


app.set('db', db); // Сохраняем объект db в приложении Express

app.use('/users', usersRoute);
app.use('/recipes', recipesRoute);
app.use('/favorites', favoritesRoute);
app.use('/auth', authRoute); // Добавляем

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
