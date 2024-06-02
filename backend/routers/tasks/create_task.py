from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from models import Task, get_db
from schemas.task import TaskCreate, TaskResponse

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/", response_model=TaskResponse)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    """
    Create a new task.

    This endpoint creates a new task with the provided title and completion status.

    Request:
      - Method: POST
      - URL: /tasks/
      - Body: JSON object with 'title' and 'completed' fields.
        Example: { "title": "New Task", "completed": false }

    Database Operations:
      - Adds the new task to the database with the current UTC time as 'createdAt'.

    Response:
      - Returns the created task as a JSON object.
        Example: { "id": 1, "title": "New Task", "completed": false, "createdAt": "2023-01-01T00:00:00Z" }
    """
    db_task = Task(
        title=task.title,
        completed=task.completed,
        createdAt=datetime.utcnow()
    )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task