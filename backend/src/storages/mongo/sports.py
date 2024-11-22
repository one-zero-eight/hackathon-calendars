__all__ = ["Sport", "SportSchema"]

from src.pydantic_base import BaseSchema
from src.storages.mongo.__base__ import CustomDocument


class SportSchema(BaseSchema):
    sport: str
    "Название вида спорта"
    disciplines: list[str]
    "Названия дисциплин"


class Sport(SportSchema, CustomDocument):
    class Settings:
        pass
