from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from models import Task, get_db

router = APIRouter(prefix="/tasks", tags=["tasks"])

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    """
    Delete a task.

    This endpoint deletes a task by its ID.

    Request:
      - Method: DELETE
      - URL: /tasks/{task_id}

    Database Operations:
      - Deletes the specified task from the database.

    Response:
      - Returns a JSON object indicating the result of the operation.
        Example: { "ok": True }
    """
    db_task = db.query(Task).filter(Task.id == task_id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(db_task)
    db.commit()
    return {"ok": True}
