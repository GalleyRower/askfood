// src/models/recipe.js
const sqlite3 = require('sqlite3').verbose();

class Recipe {
  constructor(id, title, description, ingredients, steps, images, authorId, createdAt) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.ingredients = ingredients;
    this.steps = steps;
    this.images = images;
    this.authorId = authorId;
    this.createdAt = createdAt;
  }

  static async findById(db, id) { // Принимаем db
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM recipes WHERE id = ?", [id], (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else if (row) {
          resolve(new Recipe(row.id, row.title, row.description, row.ingredients, row.steps, row.images, row.authorId, row.createdAt));
        } else {
          resolve(null);
        }
      });
    });
  }

  static async create(db, title, description, ingredients, steps, images, authorId) { // Принимаем db
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO recipes (title, description, ingredients, steps, images, authorId) VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, ingredients, steps, images, authorId],
        function (err) {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            Recipe.findById(db, this.lastID).then(recipe => resolve(recipe));  // Передаем db
          }
        });
    });
  }

  static async findAll(db) { // Принимаем db
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM recipes", [], (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          const recipes = rows.map(row => new Recipe(row.id, row.title, row.description, row.ingredients, row.steps, row.images, row.authorId, row.createdAt));
          resolve(recipes);
        }
      });
    });
  }
}

module.exports = Recipe;