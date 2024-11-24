__all__ = ["User", "UserRole"]

from enum import StrEnum

from pymongo import IndexModel

from beanie import PydanticObjectId
from src.pydantic_base import BaseSchema
from src.storages.mongo.__base__ import CustomDocument


class UserRole(StrEnum):
    DEFAULT = "default"
    ADMIN = "admin"


class UserSchema(BaseSchema):
    login: str
    password_hash: str
    favorites: list[PydanticObjectId]
    role: UserRole = UserRole.DEFAULT


class User(UserSchema, CustomDocument):
    class Settings:
        indexes = [
            IndexModel("login", unique=True),
        ]
