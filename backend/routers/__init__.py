from fastapi import APIRouter
from .create_task import router as create_task_router
from .read_tasks import router as read_tasks_router
from .update_task import router as update_task_router
from .delete_task import router as delete_task_router
from .reorder import router as reorder_router

router = APIRouter()
router.include_router(create_task_router)
router.include_router(read_tasks_router)
router.include_router(update_task_router)
router.include_router(delete_task_router)
router.include_router(reorder_router)
