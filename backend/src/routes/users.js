// src/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');

// GET /users - Получить всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll(req.app.get('db'));
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET /users/:id - Получить пользователя по ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.app.get('db'), req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// POST /users - Создать нового пользователя
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.app.get('db'), req.body.username);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;