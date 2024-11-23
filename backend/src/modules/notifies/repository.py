from beanie import PydanticObjectId

from src.storages.mongo.notifies import Notification


class NotificationRepository:
    async def create_notification(self, notification_data: Notification) -> PydanticObjectId:
        await notification_data.insert()
        return notification_data.id

    async def get_notification(self, notification_id: PydanticObjectId) -> Notification:
        return await Notification.get(notification_id)

    async def get_notification_by_user_id(self, user_id: PydanticObjectId) -> list[Notification]:
        return await Notification.find(Notification.user_id == user_id).to_list()

    async def list_all_valid_notifications(self) -> list[Notification]:
        return await Notification.find(Notification.sent is False).to_list()


notification_repository = NotificationRepository()
