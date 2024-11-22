from fastapi import APIRouter, HTTPException

from src.api.exceptions import IncorrectCredentialsException
from src.modules.notifies.repository import notification_repository
from src.modules.notifies.scheams import NotificationCreate, NotificationResponse

router = APIRouter(
    prefix="/notify",
    tags=["Notifies"],
    responses={
        **IncorrectCredentialsException.responses,
    },
)


@router.post("/")
async def create_notification(notification_create: NotificationCreate, response_model=int):
    return await notification_repository.create_notification(notification_create)


@router.get("/{notification_id}", response_model=NotificationResponse)
async def get_notification(notification_id: int):
    notification = await notification_repository.get(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification
