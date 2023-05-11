from sqlalchemy.orm import Session

from domicile import models, schemas


def get_recipe(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.recipe.Recipe).offset(skip).limit(limit).all()
