from datetime import datetime

from pydantic import BaseModel, PydanticObjectID


class NotificationCreate(BaseModel):
    event_title: str
    notification_options: dict
    target_date: datetime.datetime
    user_id: PydanticObjectID
    sent: bool = False


class NotificationResponse(BaseModel):
    id: int
    event_title: str
    notification_options: dict
    target_date: datetime.datetime
    user_id: PydanticObjectID
    sent: bool = False
