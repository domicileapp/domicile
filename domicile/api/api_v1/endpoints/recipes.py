from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from domicile import crud, models, schemas
from domicile.api import deps

router = APIRouter()


@router.get("/", response_model=List[schemas.Recipe])
def read_recipes(
    db: Session = Depends(deps.get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Retrieve recipes.
    """
    if crud.user.is_superuser(current_user):
        recipes = crud.recipe.get_multi(db, skip=skip, limit=limit)
    else:
        recipes = crud.recipe.get_multi_by_creator(
            db=db, creator_id=current_user.id, skip=skip, limit=limit
        )
    return recipes


@router.post("/", response_model=schemas.Recipe)
def create_recipe(
    *,
    db: Session = Depends(deps.get_db),
    recipe_in: schemas.RecipeCreate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Create new recipe.
    """
    recipe = crud.recipe.create_with_creator(
        db=db, obj_in=recipe_in, creator_id=current_user.id
    )
    return recipe


@router.put("/{id}", response_model=schemas.Recipe)
def update_recipe(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    recipe_in: schemas.RecipeUpdate,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Update an recipe.
    """
    recipe = crud.recipe.get(db=db, id=id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    if not crud.user.is_superuser(current_user) and (
        recipe.creator_id != current_user.id
    ):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    recipe = crud.recipe.update(db=db, db_obj=recipe, obj_in=recipe_in)
    return recipe


@router.get("/{id}", response_model=schemas.Recipe)
def read_recipe(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Get recipe by ID.
    """
    recipe = crud.recipe.get(db=db, id=id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    if not crud.user.is_superuser(current_user) and (
        recipe.creator_id != current_user.id
    ):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    return recipe


@router.delete("/{id}", response_model=schemas.Recipe)
def delete_recipe(
    *,
    db: Session = Depends(deps.get_db),
    id: int,
    current_user: models.User = Depends(deps.get_current_active_user),
) -> Any:
    """
    Delete an recipe.
    """
    recipe = crud.recipe.get(db=db, id=id)
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    if not crud.user.is_superuser(current_user) and (
        recipe.creator_id != current_user.id
    ):
        raise HTTPException(status_code=400, detail="Not enough permissions")
    recipe = crud.recipe.remove(db=db, id=id)
    return recipe
