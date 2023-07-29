from typing import Optional

from pydantic import BaseModel, EmailStr


class UserBase(BaseModel):
    email: str
    is_active: Optional[bool] = True
    is_admin: bool = False
    first_name: str
    last_name: str


class UserCreate(UserBase):
    email: EmailStr
    password: str


class UserUpdate(UserBase):
    password: Optional[str] = None


class UserInDBBase(UserBase):
    id: Optional[int] = None

    class Config:
        from_attributes = True


class User(UserInDBBase):
    pass


class UserInDB(UserInDBBase):
    hashed_password: str
