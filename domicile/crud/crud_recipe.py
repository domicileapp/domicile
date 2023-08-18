from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

from domicile.crud.base import CRUDBase
from domicile.models.recipe import Recipe
from domicile.schemas.recipe import RecipeCreate, RecipeUpdate


class CRUDRecipe(CRUDBase[Recipe, RecipeCreate, RecipeUpdate]):
    def create_with_creator(
        self, db: Session, *, obj_in: RecipeCreate, creator_id: int
    ) -> Recipe:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data, creator_id=creator_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_multi_by_creator(
        self, db: Session, *, creator_id: int, skip: int = 0, limit: int = 100
    ) -> list[Recipe]:
        return (
            db.query(self.model)
            .filter(Recipe.creator_id == creator_id)
            .offset(skip)
            .limit(limit)
            .all()
        )


recipe = CRUDRecipe(Recipe)
