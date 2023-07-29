from sqlalchemy.orm import Session

from app.domicile import crud, schemas
from app.domicile.core.config import settings
from app.domicile.db import base


def init_db(db: Session) -> None:
    user = crud.user.get_by_email(db, email=settings.FIRST_SUPERUSER)
    if not user:
        user_in = schemas.UserCreate(
            email=settings.FIRST_SUPERUSER,
            password=settings.FIRST_SUPERUSER_PASSWORD,
            first_name="Admin",
            last_name="user",
            is_admin=True,
        )
        user = crud.user.create(db, obj_in=user_in)
