from typing import Literal

from beanie import PydanticObjectId
from pydantic import BaseModel, Field


class NotificationOption(BaseModel):
    class Keys(BaseModel):
        p256dh: str
        auth: str

    endpoint: str
    keys: Keys


class EventNotification(BaseModel):
    type: Literal["event"]
    id: PydanticObjectId


class SportNotification(BaseModel):
    type: Literal["sport"]
    id: PydanticObjectId


class NotificationCreateReq(BaseModel):
    notification_type: EventNotification | SportNotification = Field(discriminator="type")
    notification_options: NotificationOption


class Filter(BaseModel):
    user_id: PydanticObjectId = None
    sport_title: str = None
    event_title: list[str] = None
    existing: bool = True
