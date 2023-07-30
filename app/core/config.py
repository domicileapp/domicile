import secrets

from pydantic import AnyHttpUrl
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    # 60 minutes * 24 hours * 7 days = 7 days
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7
    SERVER_NAME: str = "domicile"
    SERVER_HOST: AnyHttpUrl = "http://localhost:8000"
    PROJECT_NAME: str = "domicile"
    FIRST_SUPERUSER: str = "admin@admin.com"
    FIRST_SUPERUSER_PASSWORD: str = "P@ssw0rd"
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./domicile_dev.db"

    class Config:
        case_sensitive = True


settings = Settings()
