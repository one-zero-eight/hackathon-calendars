from src.modules.notifies.scheams import NotificationCreate
from src.storages.mongo.notifies import Notification


class NotificationRepository:
    async def create_notification(self, notification_data: NotificationCreate) -> Notification:
        notification = Notification(**notification_data.model_dump())
        await notification.insert()
        return notification.id

    async def get_notification(self, notification_id: int) -> Notification:
        return await Notification.get(notification_id)


notification_repository = NotificationRepository()
