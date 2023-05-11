from fastapi.routing import APIRouter
from domicile.web.api import echo
from domicile.web.api import dummy
from domicile.web.api import rabbit
from domicile.web.api import kafka
from domicile.web.api import docs
from domicile.web.api import monitoring

api_router = APIRouter()
api_router.include_router(monitoring.router)
api_router.include_router(docs.router)
api_router.include_router(echo.router, prefix="/echo", tags=["echo"])
api_router.include_router(dummy.router, prefix="/dummy", tags=["dummy"])
api_router.include_router(rabbit.router, prefix="/rabbit", tags=["rabbit"])
api_router.include_router(kafka.router, prefix="/kafka", tags=["kafka"])
