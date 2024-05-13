# To-Do App with Python/React

[![Python](https://img.shields.io/badge/python-3.11.0-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.111.0-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/react-18.2.66-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-7.2.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-5.2.11-A750FE.svg)](https://vitejs.dev/)

Это приложение "To-Do" было разработано в качестве методической образовательной задачи для демонстрации взаимодействия между бекендом на Python/FastAPI и фронтендом на React/TypeScript.

Подробная статья-урок по созданию данного приложения To-Do доступно по адресу: [https://webadventures.ru/toda-app-python-react/](https://webadventures.ru/toda-app-python-react/)


## Технологический стек

### Бекенд

- **Python** - популярный язык программирования
- **FastAPI** - современный, быстрый и высокопроизводительный веб-фреймворк для создания API на Python
- **uvicorn** - асинхронный сервер для запуска FastAPI приложений
- **PostgreSQL** - популярная реляционная база данных
- **SQLAlchemy** - библиотека Python для работы с базами данных, обеспечивающая слой абстракции между кодом и базой данных

### Фронтенд

- **React** - популярная JavaScript библиотека для создания пользовательских интерфейсов
- **TypeScript** - statically-typed superset of JavaScript
- **Vite** - современный инструмент для создания и разработки веб-приложений с горячей перезагрузкой и многим другим

### Структура проекта

```markdown
    todo-app/
    │
    ├── backend/
    │   ├── __init__.py
    │   ├── main.py
    │   ├── models.py
    │   ├── initialize_db.py
    │   └── requirements.txt
    │
    ├── frontend/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── App.tsx
    │   │   ├── main.tsx
    │   │   └── ...
    │   ├── index.html
    │   ├── package.json
    │   ├── vite.config.ts
    │   └── ...
    │
    └── README.md
```


## Запуск проекта

### Запуск бекенда

1.   Активируйте виртуальное окружение Python (если используется):
        ```bash
        .\venv\Scripts\activate   # Windows
        source venv/bin/activate  # Unix/macOS
        ```


2.       uvicorn main:app --reload

    Бекенд будет запущен и доступен по адресу: [http://127.0.0.1:8000/](http://127.0.0.1:8000/)

### Запуск фронтенда

1. Установите зависимости:

        npm install

2. Запустите локальный сервер разработки:

        npm run dev

    Или используйте команду для Vite:

        npx vite

        
    Фронтенд будет запущен и доступен по адресу: http://127.0.0.1:517