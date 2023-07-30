# from typing import Optional

# from sqlalchemy.orm import Session

# from app import crud, models
# from app.schemas.recipe import RecipeCreate
# from app.tests.utils.user import create_random_user
# from app.tests.utils.utils import random_lower_string


# def create_random_recipe(
#     db: Session, *, creator_id: Optional[int] = None
# ) -> models.Recipe:
#     if creator_id is None:
#         user = create_random_user(db)
#         creator_id = user.id
#     title = random_lower_string()
#     description = random_lower_string()
#     recipe_in = RecipeCreate(title=title, description=description, id=id)
#     return crud.recipe.create_with_owner
