from typing import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.domicile.core.config import settings
from app.domicile.db.session import SessionLocal
from app.domicile.main import app
from app.domicile.tests.utils.user import authentication_token_from_email
from app.domicile.tests.utils.utils import get_admin_user_token_headers


@pytest.fixture(scope="session")
def db() -> Generator:
    yield SessionLocal()


@pytest.fixture(scope="module")
def client() -> Generator:
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="module")
def admin_user_token_headers(client: TestClient) -> dict[str, str]:
    return get_admin_user_token_headers(client)


@pytest.fixture(scope="module")
def normal_user_token_headers(client: TestClient, db: Session) -> dict[str, str]:
    return authentication_token_from_email(
        client=client, email=settings.FIRST_SUPERUSER, db=db
    )
