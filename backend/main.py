from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from models import Task, SessionLocal
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Setup Cross-Origin Resource Sharing (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow requests from any origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Pydantic models for request and response bodies
class TaskCreate(BaseModel):
    title: str  
    completed: bool = False  

class TaskUpdate(BaseModel):
    title: str
    completed: bool  

class TaskResponse(BaseModel):
    id: int  #
    title: str  
    completed: bool  
    createdAt: datetime 

# Dependency to get the database session
def get_db():
    db = SessionLocal()  
    try:
        yield db  # Yield the database session to be used in the request
    finally:
        db.close()  # Close the database session

# Create a new task
@app.post("/tasks/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = Task(
        title=task.title,
        completed=task.completed,
        createdAt=datetime.utcnow()  # Set the current UTC time as createdAt
    )
    db.add(db_task)  # Add the new task to the session
    db.commit()  # Commit the transaction
    db.refresh(db_task)  # Refresh the task instance with the latest data from the database
    return db_task  # Return the created task

# Read tasks in descending order of createdAt
@app.get("/tasks/", response_model=list[TaskResponse])
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    tasks = db.query(Task).order_by(Task.createdAt.desc()).offset(skip).limit(limit).all()
    return tasks  # Return the list of tasks

# Update an existing task
@app.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()  # Get the task by ID
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")  # Raise 404 if task is not found
    db_task.title = task.title  # Update the title
    db_task.completed = task.completed  # Update the completion status
    db.commit()  # Commit the transaction
    db.refresh(db_task)  # Refresh the task instance with the latest data from the database
    return db_task  # Return the updated task

# Delete a task
@app.delete("/tasks/{task_id}")
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    db_task = db.query(Task).filter(Task.id == task_id).first()  # Get the task by ID
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")  # Raise 404 if task is not found
    db.delete(db_task)  # Delete the task from the session
    db.commit()  # Commit the transaction
    return {"ok": True}  # Return a success message
