from pydantic import BaseModel

class ReorderRequest(BaseModel):
    tasks: list[int]
