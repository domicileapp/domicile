from typing import Optional

from pydantic import BaseModel


class RecipeBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


class RecipeCreate(RecipeBase):
    title: str


class RecipeUpdate(RecipeBase):
    pass


class RecipeInDBBase(RecipeBase):
    id: int
    title: str
    creator_id: int

    class Config:
        from_attributes = True


class Recipe(RecipeInDBBase):
    pass


class RecipeInDB(RecipeInDBBase):
    pass
