import datetime

from src.pydantic_base import BaseSchema
from src.storages.mongo.__base__ import CustomDocument


class NotifySchema(BaseSchema):
    event_title: str
    notification_options: dict
    target_date: datetime.datetime
    user_id: int
    sent: bool = False


class Notification(NotifySchema, CustomDocument):
    pass
