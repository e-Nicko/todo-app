from pydantic import BaseModel
from datetime import datetime

class TaskCreate(BaseModel):
    title: str
    completed: bool = False

class TaskUpdate(BaseModel):
    title: str
    completed: bool

class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool
    createdAt: datetime
