from pydantic import BaseModel


class RecipeBase(BaseModel):
    title: str
    description: str | None = None
    ingredients: str
    instructions: str


class RecipeCreate(RecipeBase):
    pass


class Recipe(RecipeBase):
    id: int

    class Config:
        orm_mode = True
