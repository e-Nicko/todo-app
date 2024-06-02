from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import reorder
from routers.tasks import router as tasks_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks_router)
app.include_router(reorder.router)