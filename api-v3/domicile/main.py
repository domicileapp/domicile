from domicile.database.database import SessionLocal, engine
from domicile.routes import recipes
from fastapi import FastAPI

app = FastAPI(title="Domicile")

app.include_router(recipes.router, tags=["recipe"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
