from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import router as tasks_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to the To-Do App API",
        "version": "v0.1.2-beta",
        "endpoints": {
            "/tasks": "Retrieve all tasks",
            "/tasks/{id}": "Retrieve, update, or delete a specific task by ID",
            "/tasks/reorder": "Reorder tasks"
        },
        "documentation": "https://github.com/e-Nicko/todo-app"
    }