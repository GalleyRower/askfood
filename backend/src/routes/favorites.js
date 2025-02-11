// src/routes/favorites.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

// Добавление рецепта в избранное
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { recipeId } = req.body;
        const userId = req.userId; // ID пользователя из middleware

        // Проверка, существует ли уже запись
        const sqlCheck = `SELECT * FROM favorites WHERE userId = ? AND recipeId = ?`;
        const paramsCheck = [userId, recipeId];

        req.app.get('db').get(sqlCheck, paramsCheck, (err, row) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }

            if (row) {
                return res.status(400).json({ message: 'This recipe is already in favorites' });
            }

            // Если записи нет, добавляем
            const sqlInsert = `INSERT INTO favorites (userId, recipeId) VALUES (?, ?)`;
            const paramsInsert = [userId, recipeId];

            req.app.get('db').run(sqlInsert, paramsInsert, function(err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: err.message });
                }
                res.status(201).json({ message: 'Recipe added to favorites' });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Удаление рецепта из избранного
router.delete('/:recipeId', authMiddleware, async (req, res) => {
    try {
        const { recipeId } = req.params;
        const userId = req.userId;

        const sql = `DELETE FROM favorites WHERE userId = ? AND recipeId = ?`;
        const params = [userId, recipeId];

        req.app.get('db').run(sql, params, function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: 'Favorite not found' });
            }
            res.json({ message: 'Recipe removed from favorites' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Получение списка избранных рецептов пользователя
router.get('/', authMiddleware, async (req, res) => {
    try {
        const userId = req.userId;

        const sql = `
            SELECT recipes.* FROM favorites
            INNER JOIN recipes ON favorites.recipeId = recipes.id
            WHERE favorites.userId = ?
        `;
        const params = [userId];

        req.app.get('db').all(sql, params, (err, rows) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: err.message });
            }
            res.json(rows);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;