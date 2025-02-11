// src/routes/recipes.js
const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');
const authMiddleware = require('../middleware/authMiddleware');

// GET /recipes - Получить все рецепты
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.findAll(req.app.get('db'));
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET /recipes/:id - Получить рецепт по ID
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.app.get('db'), req.params.id);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST /recipes - Создать новый рецепт
router.post('/', authMiddleware, async (req, res) => {
  try {
      const { title, description, ingredients, steps, images } = req.body;
      const authorId = req.userId; // Получаем ID пользователя из токена
      const recipe = await Recipe.create(req.app.get('db'), title, description, ingredients, steps, images, authorId);
      res.status(201).json(recipe);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
  }
});

module.exports = router;