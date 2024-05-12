from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from models import Task, SessionLocal, Base, engine
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Setup CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Список разрешенных источников
    allow_credentials=True,
    allow_methods=["*"],  # Разрешение всех методов
    allow_headers=["*"],  # Разрешение всех заголовков
)

# Pydantic models for Request Body
class TaskCreate(BaseModel):
    title: str  # Используйте str вместо String
    completed: bool = False  # Используйте bool вместо Boolean

class TaskUpdate(BaseModel):
    title: str  # Используйте str вместо String
    completed: bool  # Используйте bool вместо Boolean

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/tasks/", response_model=TaskCreate)
async def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = Task(title=task.title, completed=task.completed)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/", response_model=list[TaskCreate])
async def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    tasks = db.query(Task).offset(skip).limit(limit).all()
    return tasks

@app.put("/tasks/{task_id}", response_model=TaskCreate)
async def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = task.title
    db_task.completed = task.completed
    db.commit()
    return db_task

@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"ok": True}