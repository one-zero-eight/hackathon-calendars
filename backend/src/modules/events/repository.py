__all__ = ["events_repository"]

from src.storages.mongo.events import Event


# noinspection PyMethodMayBeStatic
class EventsRepository:
    async def read_all(self) -> list[Event] | None:
        return await Event.all().to_list()

    async def create_many(self, events: list[Event]) -> bool:
        res = await Event.insert_many(events)
        if not res.acknowledged:
            return False
        return True


events_repository: EventsRepository = EventsRepository()
