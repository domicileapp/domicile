from core.fastapi.dependencies.authentication import AuthenticationRequired
from fastapi import APIRouter, Depends

from api.v1.tasks.tasks import task_router

tasks_router = APIRouter()
tasks_router.include_router(
    task_router,
    tags=["Tasks"],
    dependencies=[Depends(AuthenticationRequired)],
)

__all__ = ["tasks_router"]
