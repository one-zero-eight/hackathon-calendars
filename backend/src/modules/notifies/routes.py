from beanie import PydanticObjectId
from fastapi import APIRouter, HTTPException

from src.api.dependencies import USER_AUTH
from src.api.exceptions import IncorrectCredentialsException
from src.modules.events.repository import events_repository
from src.modules.notifies.repository import Notification, notification_repository
from src.modules.notifies.scheams import NotificationCreateReq
from src.modules.sports.repository import sports_repository

router = APIRouter(
    prefix="/notify",
    tags=["Notifies"],
    responses={
        **IncorrectCredentialsException.responses,
    },
)


@router.post("/")
async def create_notification(notification_create: NotificationCreateReq, auth: USER_AUTH) -> PydanticObjectId:
    user_id = auth.user_id
    notification_to_insert: Notification
    notification_create = notification_create.model_dump()
    print(notification_create["notification_type"])
    if notification_create["notification_type"]["type"] == "event":
        event = await events_repository.read_one(notification_create["notification_type"]["id"])
        if event is None:
            raise HTTPException(status_code=404)
        notification_to_insert = Notification(
            event_title=event.title,
            target_date=notification_create["notification_options"]["expiration_time"],
            user_id=user_id,
            endpoint=notification_create["notification_options"]["endpoint"],
            keys=notification_create["notification_options"]["keys"],
        )
    else:
        sport = await sports_repository.read_one(str(notification_create["notification_type"]["id"]))
        if sport.sport is None:
            raise HTTPException(status_code=404)
        notification_to_insert = Notification(
            sport_title=sport.sport,
            target_date=notification_create["notification_options"]["expiration_time"],
            user_id=user_id,
            endpoint=notification_create["notification_options"]["endpoint"],
            keys=notification_create["notification_options"]["keys"],
        )

    return await notification_repository.create_notification(notification_to_insert)


@router.get("/{notification_id}")
async def get_notification(notification_id: PydanticObjectId):
    notification = await notification_repository.get_notification(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification
