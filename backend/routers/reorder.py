from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Task, get_db
from schemas.reorder_request import ReorderRequest

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.post("/reorder")
def reorder_tasks(request: ReorderRequest, db: Session = Depends(get_db)):
    """
    Reorder tasks by their IDs.

    This endpoint receives a request containing a list of task IDs in the desired order.
    It updates the 'position' field of each task in the database to reflect the new order.

    Request:
      - Method: POST
      - URL: /tasks/reorder
      - Body: JSON object with a 'tasks' field, which is a list of task IDs in the new order.
        Example: { "tasks": [ { "id": 3, "position": 0 }, { "id": 1, "position": 1 }, { "id": 2, "position": 2 } ] }

    Database Operations:
      - For each task ID in the received list, it updates the 'position' field in the database.
      - The 'position' field is set to the index of the task ID in the list.
      - This ensures that all tasks are reordered according to the provided list.

    Response:
      - Returns a JSON object with a message indicating the success of the operation.
        Example: { "message": "Tasks reordered successfully" }
    """
    for task_data in request.tasks:
        db_task = db.query(Task).filter(Task.id == task_data.id).first()
        if not db_task:
            raise HTTPException(status_code=404, detail=f"Task with id {task_data.id} not found")
        db_task.position = task_data.position
    db.commit()
    return {"message": "Tasks reordered successfully"}
