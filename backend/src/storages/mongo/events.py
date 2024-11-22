__all__ = ["Event", "EventSchema"]

from src.pydantic_base import BaseSchema
from src.storages.mongo.__base__ import CustomDocument


class EventSchema(BaseSchema):
    title: str
    description: str
    location: str
    date_start: str
    date_end: str


class Event(EventSchema, CustomDocument):
    class Settings:
        pass
