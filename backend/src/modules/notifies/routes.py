from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from src.api.exceptions import IncorrectCredentialsException
from src.modules.notifies.repository import notification_repository
from src.modules.notifies.scheams import NotificationCreate

router = APIRouter(
    prefix="/notify",
    tags=["Notifies"],
    responses={
        **IncorrectCredentialsException.responses,
    },
)


@router.post("/")
async def create_notification(notification_create: NotificationCreate) -> PydanticObjectId:
    return await notification_repository.create_notification(notification_create)


@router.get("/{notification_id}")
async def get_notification(notification_id: PydanticObjectId):
    notification = await notification_repository.get_notificationч(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification
