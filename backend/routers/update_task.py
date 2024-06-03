from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import Task, get_db
from schemas.task import TaskUpdate, TaskResponse

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.put("/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, task: TaskUpdate, db: Session = Depends(get_db)):
    """
    Update an existing task.

    This endpoint updates the title and completion status of an existing task.

    Request:
      - Method: PUT
      - URL: /tasks/{task_id}
      - Body: JSON object with 'title' and 'completed' fields.
        Example: { "title": "Updated Task", "completed": true }

    Database Operations:
      - Updates the specified task in the database with the new title and completion status.

    Response:
      - Returns the updated task as a JSON object.
        Example: { "id": 1, "title": "Updated Task", "completed": true, "createdAt": "2023-01-01T00:00:00Z" }
    """
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db_task.title = task.title
    db_task.completed = task.completed
    db.commit()
    db.refresh(db_task)
    return db_task
