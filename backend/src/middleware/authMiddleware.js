// src/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey'); // Замените 'secretkey' на ваш секретный ключ

        //  Достаем пользователя из базы данных по ID, чтобы убедиться, что он существует
        const user = await User.findById(req.app.get('db'), decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.userId = decoded.userId;  //  Сохраняем ID пользователя в объекте запроса
        next();
    } catch (e) {
        res.status(400).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;