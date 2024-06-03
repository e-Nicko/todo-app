# 📝✅ "To-Do App" by Python, Fast API Postgre, React

[![Python](https://img.shields.io/badge/python-3.11.0-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/fastapi-0.111.0-green.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/react-18.2.66-61DAFB.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/typescript-7.2.0-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-5.2.11-A750FE.svg)](https://vitejs.dev/)

This "To-Do" application was developed as an educational project to demonstrate the interaction between a Python/FastAPI backend and a React/TypeScript frontend.
The project provide a simple, functional demo of a to-do application that allows users to add, delete, and mark tasks as complete. 
The frontend design is intentionally kept minimal with basic CSS styles to ensure clarity and ease of understanding for educational purposes.

<img src="https://github.com/e-Nicko/todo-app/assets/16775047/ff50bf1d-2ae5-4b99-bf6e-5aa0d290cb54" width="100%">

<hr>

- A detailed tutorial article on creating this To-Do application is available at: <br>
[https://webadventures.ru/todo-app-python-react/](https://webadventures.ru/todo-app-python-react/) (Russian language)
- Design mockups: <br>
[Figma - ToDo app](https://www.figma.com/design/82XLv7BujFtQfscglOLDju/ToDo-App?node-id=0-1&t=mzFv79mBFzUP2Job-0)


<br/>

## ⚙️ Technology Stack


### Backend

- **Python** - one of the most promising programming languages for building API services, ranking 1st by [TIOBE](https://www.tiobe.com/tiobe-index/) and [Google Trends](https://trends.google.com/trends/explore?date=now%201-d&geo=RU&q=python,C,Java,JavaScript,Go&hl=en).
- **FastAPI** - a modern, fast, and high-performance web framework for building APIs with Python.
- **uvicorn** - an asynchronous server for running FastAPI applications.
- **PostgreSQL** - a popular relational database.
- **SQLAlchemy** - a Python library for database interaction, providing an abstraction layer between the code and the database.

### Frontend

- **React** - a popular JavaScript library for building user interfaces.
- **TypeScript** - a statically-typed superset of JavaScript.
- **Vite** - a modern build tool for creating and developing web applications with hot-reloading and more.

## 📂 Project Structure

```markdown
    todo-app/
    │
    ├── backend/
    │   ├── __init__.py
    │   ├── main.py
    │   ├── models.py
    │   ├── initialize_db.py
    ├── routers/
    │   ├── create_task.py
    │   ├── delete_task.py
    │   ├── read_tasks.py
    │   ├── reorder.py
    │   ├── update_task.py
    │   └── __init__.py
    │   ├── schemas/
    │   │   ├── reorder_request.py
    │   │   └── task.py
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

<br/>

## 🗄️ Database table `tasks`

| Column      | Type                       | Collation | Nullable | Default                          |
|-------------|----------------------------|-----------|----------|----------------------------------|
| `id`        | integer                    |           | not null | nextval('tasks_id_seq'::regclass)|
| `title`     | character varying          |           |          |                                  |
| `completed` | boolean                    |           |          |                                  |
| `createdAt` | timestamp without time zone|           |          | CURRENT_TIMESTAMP                |



#### Indexes

- "tasks_pkey" PRIMARY KEY, btree (id)
- "ix_tasks_id" btree (id)
- "ix_tasks_title" btree (title)



<br/>

## ▶️ Running the Project

### Running the Backend

1.    Create database in [PostgreSQL](https://www.postgresql.org/) and make `.env` file in `backend` directory with your database connection constants:
        ```bash
        DB_HOST=localhost
        DB_USER=todo_user
        DB_PASSWORD=123
        DB_NAME=todo_db
        ```
        *This constants will be used in `models.py` file for connecting to database.*
        *You simply rename template `.env.example` to `.env`

3.    Activate the Python virtual environment (if used):
        ```bash
        .\venv\Scripts\activate   # Windows
        source venv/bin/activate  # Unix/macOS
        ```
        *When you finish the development session, you can deactivate the virtual environment using the `deactivate` command in the terminal where the environment was activated. This will return you to the global Python environment.*

2.    Start the server:
        ```bash
            uvicorn main:app --reload
        ```
      *The backend will be running and available at: http://127.0.0.1:8000/*

### Running the Frontend

1. Install dependencies:

        npm install

2. Start the local development server:

        npm run dev

    Or use the command for Vite::

        npx vite

        
    The frontend will be running and available at: http://127.0.0.1:5173

<br/>

<hr>

<br/>

## TO-DO
**Future Enhancements** 🌟 <br/>
The following features are planned for upcomming releases:

* [x] <s>onDelete: add spinner loading.</s>
* [x] Ruff: Integrate a linter to maintain code quality.
* [ ] Mypy: Add static type checking to ensure code reliability and correctness.
* [ ] Docker: Set up CI/CD.
* [ ] New Design: Update the UI to a more advanced version with animation.
* [ ] Edit Task: Allow users to edit the description of existing tasks.
* [ ] Reorder Tasks: Enable users to change the order of tasks in the list.


<br/>


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
