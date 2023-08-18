from typing import Optional

from pydantic import BaseModel


# Shared properties
class RecipeBase(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None


# Properties to receive on item creation
class RecipeCreate(RecipeBase):
    title: str


# Properties to receive on item update
class RecipeUpdate(RecipeBase):
    pass


# Properties shared by models stored in DB
class RecipeInDBBase(RecipeBase):
    id: int
    title: str
    creator_id: int

    class Config:
        from_attributes = True


# Properties to return to client
class Recipe(RecipeInDBBase):
    pass


# Properties properties stored in DB
class RecipeInDB(RecipeInDBBase):
    pass
