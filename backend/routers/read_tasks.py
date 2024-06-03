from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models import Task, get_db
from schemas.task import TaskResponse

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.get("/", response_model=list[TaskResponse])
def read_tasks(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    """
    Read tasks in descending order of creation date.

    This endpoint retrieves a list of tasks ordered by their creation date in descending order.

    Request:
      - Method: GET
      - URL: /tasks/
      - Query parameters: 'skip' (int) and 'limit' (int) for pagination.
        Example: /tasks/?skip=0&limit=10

    Database Operations:
      - Retrieves tasks from the database with pagination.

    Response:
      - Returns a list of tasks as JSON objects.
        Example: [{ "id": 1, "title": "Task 1", "completed": false, "createdAt": "2023-01-01T00:00:00Z" }, ...]
    """
    tasks = db.query(Task).order_by(Task.createdAt.desc()).offset(skip).limit(limit).all()
    return tasks
