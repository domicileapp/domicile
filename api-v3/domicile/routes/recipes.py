from typing import Annotated

from fastapi import APIRouter, Query

router = APIRouter()


@router.get("/recipes/{recipe_id}")
async def read_recipe(recipe_id):
    return {"recipe_id": recipe_id}


@router.get("/recipes")
async def read_recipes(q: Annotated[str, Query(min_length=3, max_length=50)]):
    results = {"recipes": [{"recipe_id": "Foo"}, {"recipe_id": "Bar"}]}
    if q:
        results.update({"q": q})
    return results
