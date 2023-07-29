from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship

from app.domicile.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)

    recipes = relationship("Recipe", back_populates="creator")
