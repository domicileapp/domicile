from pydantic import BaseModel


class RecipeBase(BaseModel):
    title: str
    description: str | None = None


class RecipeCreate(RecipeBase):
    pass


class Recipe(RecipeBase):
    id: int
    created_by_id: int

    class Config:
        orm_mode = True


class UserBase(RecipeBase):
    email: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int
    is_active: bool
    recipes: list[Recipe] = []

    class Config:
        orm_mode = True
