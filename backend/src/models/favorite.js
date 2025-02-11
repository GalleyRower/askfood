// src/models/favorite.js
const sqlite3 = require('sqlite3').verbose();

class Favorite {
  constructor(userId, recipeId) {
    this.userId = userId;
    this.recipeId = recipeId;
  }

  static async findByUserIdAndRecipeId(db, userId, recipeId) { // Принимаем db
    return new Promise((resolve, reject) => {
      db.get("SELECT * FROM favorites WHERE userId = ? AND recipeId = ?", [userId, recipeId], (err, row) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else if (row) {
          resolve(new Favorite(row.userId, row.recipeId));
        } else {
          resolve(null);
        }
      });
    });
  }

  static async create(db, userId, recipeId) { // Принимаем db
    return new Promise((resolve, reject) => {
      db.run(`INSERT INTO favorites (userId, recipeId) VALUES (?, ?)`,
        [userId, recipeId],
        function (err) {
          if (err) {
            console.error(err.message);
            reject(err);
          } else {
            Favorite.findByUserIdAndRecipeId(db, userId, recipeId).then(fav => resolve(fav)); // Передаем db
          }
        });
    });
  }

  static async findAllByUserId(db, userId) {  // Принимаем db
    return new Promise((resolve, reject) => {
      db.all("SELECT * FROM favorites WHERE userId = ?", [userId], (err, rows) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          const favorites = rows.map(row => new Favorite(row.userId, row.recipeId));
          resolve(favorites);
        }
      });
    });
  }

  static async delete(db, userId, recipeId) {  // Принимаем db
    return new Promise((resolve, reject) => {
      db.run("DELETE FROM favorites WHERE userId = ? AND recipeId = ?", [userId, recipeId], (err) => {
        if (err) {
          console.error(err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}

module.exports = Favorite;