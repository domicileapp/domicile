from pydantic import BaseModel


class RecipeBase(BaseModel):
    title: str
    description: str | None = None


class RecipeCreate(RecipeBase):
    pass


class Recipe(RecipeBase):
    id: int

    class Config:
        orm_mode = True
