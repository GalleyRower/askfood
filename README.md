# AskFood Backend

Backend-сервер для приложения AskFood, предоставляющего API для управления рецептами, пользователями и избранным.

## Описание

Этот backend написан на Node.js с использованием Express.js и хранит данные в базе данных SQLite. Он предоставляет RESTful API для следующих операций:

*   **Аутентификация:** Регистрация и вход пользователей с использованием JWT (JSON Web Tokens).
*   **Рецепты:** Создание, чтение, обновление и удаление рецептов.
*   **Пользователи:** Управление пользовательскими профилями.
*   **Избранное:** Добавление, удаление и получение списка избранных рецептов пользователей.

## Технологии

*   [Node.js](https://nodejs.org/) - JavaScript runtime
*   [Express.js](https://expressjs.com/) - Web framework для Node.js
*   [SQLite](https://www.sqlite.org/index.html) - Легковесная база данных
*   [JSON Web Tokens (JWT)](https://jwt.io/) - Для аутентификации пользователей
*   [bcryptjs](https://www.npmjs.com/package/bcryptjs) - Для хеширования паролей
*   [cors](https://www.npmjs.com/package/cors) - Middleware для обработки CORS
*   [dotenv](https://www.npmjs.com/package/dotenv) - Для загрузки переменных окружения из файла `.env` (если используется)

## Установка

1.  **Клонируйте репозиторий:**

    ```bash
    git clone <your_repository_url>
    cd backend
    ```

    Замените `<your_repository_url>` на URL вашего репозитория на GitHub.

2.  **Установите зависимости:**

    ```bash
    npm install
    ```

3.  **Настройте переменные окружения (необязательно):**

    Если вы используете переменные окружения (например, для секретного ключа JWT), создайте файл `.env` в корневой директории проекта и добавьте в него необходимые переменные:

    ```
    JWT_SECRET=your_secret_key
    ```

    Замените `your_secret_key` на ваш собственный секретный ключ.

4.  **Запустите сервер:**

    ```bash
    npm start
    ```

    Сервер запустится по адресу `http://localhost:3000`.

## API Endpoints

### Аутентификация

*   `POST /auth/register` - Регистрация нового пользователя.

    *   Request body:

        ```json
        {
          "username": "newuser",
          "password": "password123"
        }
        ```

    *   Response:

        ```json
        {
          "token": "JWT token"
        }
        ```

*   `POST /auth/login` - Вход существующего пользователя.

    *   Request body:

        ```json
        {
          "username": "existinguser",
          "password": "password123"
        }
        ```

    *   Response:

        ```json
        {
          "token": "JWT token"
        }
        ```

### Рецепты

*   `GET /recipes` - Получение списка всех рецептов (не требует аутентификации).
*   `POST /recipes` - Создание нового рецепта (требуется аутентификация).

    *   Request body:

        ```json
        {
          "title": "Название рецепта",
          "description": "Описание рецепта",
          "ingredients": "Ингредиенты",
          "steps": "Шаги приготовления",
          "images": "URL изображения"
        }
        ```

    *   Headers:
        `Authorization: Bearer <JWT token>`

*   `GET /recipes/:id` - Получение рецепта по ID (не требует аутентификации).
*   `PUT /recipes/:id` - Обновление рецепта по ID (требуется аутентификация).
*   `DELETE /recipes/:id` - Удаление рецепта по ID (требуется аутентификация).

### Избранное

*   `GET /favorites` - Получение списка избранных рецептов пользователя (требуется аутентификация).

    *   Headers:
        `Authorization: Bearer <JWT token>`

*   `POST /favorites` - Добавление рецепта в избранное (требуется аутентификация).

    *   Request body:

        ```json
        {
          "recipeId": 123
        }
        ```

    *   Headers:
        `Authorization: Bearer <JWT token>`

*   `DELETE /favorites/:recipeId` - Удаление рецепта из избранного (требуется аутентификация).

    *   Headers:
        `Authorization: Bearer <JWT token>`

## Аутентификация

Для доступа к защищенным API endpoints необходимо предоставить JWT токен в заголовке `Authorization` в формате `Bearer <JWT token>`. Получить JWT токен можно после успешной регистрации или входа пользователя.

## Структура проекта

askfood-backend/
├── node_modules/        # Зависимости Node.js
├── src/                # Исходный код приложения
│   ├── app.js            # Главный файл приложения (Express server)
│   ├── routes/         # Маршруты API
│   │   ├── auth.js       # Маршруты аутентификации (register, login)
│   │   ├── recipes.js    # Маршруты рецептов (CRUD)
│   │   ├── favorites.js  # Маршруты избранного (add, remove, list)
│   │   └── users.js      # Маршруты пользователей (если есть, profile, update)
│   ├── models/         # Модели данных (определения схем и взаимодействия с БД)
│   │   ├── user.js       # Модель пользователя (схема, методы работы с пользователями)
│   │   └── recipe.js     # Модель рецепта (схема, методы работы с рецептами)
│   ├── middleware/     # Middleware functions
│   │   └── authMiddleware.js # Middleware для проверки JWT токенов и авторизации
│   └── config/         # Файлы конфигурации
│       └── database.js   # Конфигурация подключения к базе данных (SQLite)
├── .gitignore           # Список файлов и папок, исключенных из контроля версий Git
├── package.json         # Файл с метаданными проекта и зависимостями npm
├── package-lock.json    # Файл с зафиксированными версиями зависимостей (для воспроизводимости)
└── README.md            # Файл с информацией о проекте (описание, установка, использование)
## Развертывание

Инструкции по развертыванию backend-сервера на облачной платформе (например, Heroku, Render, AWS, Google Cloud) будут добавлены позже.
