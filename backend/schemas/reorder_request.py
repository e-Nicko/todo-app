from pydantic import BaseModel

class ReorderTask(BaseModel):
    id: int
    position: int

class ReorderRequest(BaseModel):
    tasks: list[ReorderTask]