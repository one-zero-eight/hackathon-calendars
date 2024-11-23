import datetime

from beanie import PydanticObjectId

from src.pydantic_base import BaseSchema
from src.storages.mongo.__base__ import CustomDocument


class NotifySchema(BaseSchema):
    event_title: str | None = None
    sport_title: str | None = None
    endpoint: str
    keys: dict
    target_date: datetime.datetime
    user_id: PydanticObjectId
    sent: bool = False


class Notification(NotifySchema, CustomDocument):
    pass
