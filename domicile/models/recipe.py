from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from domicile.db.base_class import Base

if TYPE_CHECKING:
    from .user import User


class Recipe(Base):
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    creator_id = Column(Integer, ForeignKey("user.id"))
    creator = relationship("User", back_populates="recipes")
