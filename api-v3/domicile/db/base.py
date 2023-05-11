from domicile.db.meta import meta
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base for all models."""

    metadata = meta
