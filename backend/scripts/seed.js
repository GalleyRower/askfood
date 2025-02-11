// backend/scripts/seed.js
const User = require('../src/models/user');
const Recipe = require('../src/models/recipe');
const Favorite = require('../src/models/favorite');
const createDatabase = require('../src/config/database'); // Импортируем функцию

async function seedDatabase() {
  try {
    console.log('Начинаем заполнение базы данных...');

    // Получаем объект db
    const db = await createDatabase(); // Получаем объект db

    // Создаем пользователей
    console.log('Создаем пользователей...');
    const user1 = await User.create(db, 'john.doe'); // Передаем db
    const user2 = await User.create(db, 'jane.smith'); // Передаем db
    console.log('Пользователи созданы:', user1, user2);

    // Создаем рецепты
    console.log('Создаем рецепты...');
    const recipe1 = await Recipe.create(db,  // Передаем db
      'Паста карбонара',
      'Классический итальянский рецепт',
      'Спагетти, яйца, панчетта, пармезан, черный перец',
      'Отварите спагетти. Смешайте яйца, пармезан и перец. Обжарьте панчетту. Смешайте все ингредиенты.',
      'url_image1',
      user1.id
    );

    const recipe2 = await Recipe.create(db,  // Передаем db
      'Салат Цезарь',
      'Популярный салат с курицей',
      'Салат ромейн, курица, крутоны, пармезан, соус Цезарь',
      'Обжарьте курицу. Смешайте салат, курицу, крутоны и пармезан. Заправьте соусом Цезарь.',
      'url_image2',
      user2.id
    );
    console.log('Рецепты созданы:', recipe1, recipe2);

    // Создаем избранное
    console.log('Создаем избранное...');
    const favorite1 = await Favorite.create(db, user1.id, recipe1.id); // Передаем db
    const favorite2 = await Favorite.create(db, user1.id, recipe2.id); // Передаем db
    const favorite3 = await Favorite.create(db, user2.id, recipe2.id); // Передаем db
    console.log('Избранное создано:', favorite1, favorite2, favorite3);

    console.log('База данных успешно заполнена тестовыми данными!');

    db.close();  // Закрываем соединение после использования
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
  }
}

seedDatabase();