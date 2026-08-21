from __future__ import annotations

import json
from typing import Any

import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from recipe_scrapers import scrape_html
from recipe_scrapers._exceptions import (
    NoSchemaFoundInWildMode,
    WebsiteNotImplementedError,
)

app = FastAPI(title="recipe-scraper")


class ScrapeRequest(BaseModel):
    url: str
    html: str


class Recipe(BaseModel):
    title: str | None = None
    description: str | None = None
    images: list[str] = []
    authors: list[str] = []
    ingredients: list[str] = []
    steps: list[str] = []
    source_url: str
    servings: str | None = None
    prep_time: str | None = None
    cook_time: str | None = None
    notes: str | None = None
    nutrition: str | None = None


class ScrapeResponse(BaseModel):
    recipe: Recipe | None = None
    error: str | None = None


@app.post("/scrape", response_model=ScrapeResponse)
def scrape(req: ScrapeRequest) -> ScrapeResponse:
    try:
        scraper = scrape_html(html=req.html, org_url=req.url, wild_mode=True)
    except (WebsiteNotImplementedError, NoSchemaFoundInWildMode) as exc:
        return ScrapeResponse(error=str(exc))
    except Exception as exc:  # noqa: BLE001
        return ScrapeResponse(error=f"failed to parse recipe: {exc}")

    data: dict[str, Any] = scraper.to_json()

    recipe = Recipe(
        title=data.get("title"),
        description=data.get("description", ""),
        images=_as_list(data.get("image")),
        authors=_as_list(data.get("author")),
        ingredients=data.get("ingredients") or [],
        steps=steps(scraper, data),  # type: ignore
        source_url=req.url,
        servings=_str_or_none(data.get("yields")),
        prep_time=_str_or_none(data.get("prep_time")),
        cook_time=_str_or_none(data.get("cook_time")),
        notes=None,
        nutrition=_nutrition_str(data.get("nutrients")),
    )

    return ScrapeResponse(recipe=recipe)


def _as_list(value: Any) -> list[str]:
    if value is None:
        return []
    if isinstance(value, list):
        return [str(v) for v in value if v]
    return [str(value)]


def _str_or_none(value: Any) -> str | None:
    if value is None:
        return None
    s = str(value).strip()
    return s if s else None


def _nutrition_str(nutrients: Any) -> str | None:
    if nutrients is None:
        return None
    if isinstance(nutrients, dict):
        # recipe-scrapers returns e.g. {"calories": "120 calories"}
        if "calories" in nutrients and nutrients["calories"]:
            return str(nutrients["calories"])
        if not nutrients:
            return None
        return json.dumps(nutrients)
    s = str(nutrients).strip()
    return s if s else None


def steps(scraper: Any, data: dict[str, Any]) -> object:
    instructions_list = getattr(scraper, "instructions_list", None)
    if callable(instructions_list):
        try:
            steps = instructions_list()
            if steps:
                return steps
        except Exception:  # noqa: BLE001, S110
            pass

    instructions = data.get("instructions") or ""
    return [line.strip() for line in instructions.split("\n") if line.strip()]


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
