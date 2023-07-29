from typing import Optional, Union

from sqlalchemy.orm import Session

from app.domicile.core.security import get_password_hash, verify_password
from app.domicile.crud.crud_base import CRUDBase
from app.domicile.models import User
from app.domicile.schemas import UserCreate, UserUpdate


class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    def get_by_email(self, db: Session, *, email: str) -> Optional[User]:
        return db.query(User).filter(User.email == email).first()

    def create(self, db: Session, *, obj_in: UserCreate) -> User:
        db_obj = User(
            email=obj_in.email,
            hashed_password=get_password_hash(obj_in.password),
            first_name=obj_in.first_name,
            last_name=obj_in.last_name,
            is_admin=obj_in.is_admin,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, db_obj: User, obj_in: Union[UserUpdate, dict[str, any]]
    ) -> User:
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        if update_data["password"]:
            hashed_password = get_password_hash(update_data["password"])
            del update_data["password"]
            update_data["hashed_password"] = hashed_password
        return super().update(db, db_obj=db_obj, obj_in=update_data)

    def authenticate(self, db: Session, *, email: str, password: str) -> Optional[User]:
        i_user = self.get_by_email(db, email=email)
        if not i_user:
            return None
        if not verify_password(password, i_user.hashed_password):
            return None
        return i_user

    def is_active(self, i_user: User) -> bool:
        return i_user.is_active

    def is_admin(self, i_user: User) -> bool:
        return i_user.is_admin


user = CRUDUser(User)
