from datetime import datetime

from pydantic import BaseModel


class NotificationCreate(BaseModel):
    event_title: str
    notification_options: dict
    target_date: datetime.datetime
    user_id: int
    sent: bool = False


class NotificationResponse(BaseModel):
    id: int
    event_title: str
    notification_options: dict
    target_date: datetime.datetime
    user_id: int
    sent: bool = False
