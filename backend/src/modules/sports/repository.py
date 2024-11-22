__all__ = ["sports_repository"]

from src.storages.mongo.sports import Sport


# noinspection PyMethodMayBeStatic
class SportsRepository:
    async def read_one(self, id: str) -> Sport | None:
        return await Sport.get(id)

    async def read_all(self) -> list[Sport] | None:
        return await Sport.all().to_list()

    async def create_many(self, events: list[Sport]) -> bool:
        res = await Sport.insert_many(events)
        return res.acknowledged


sports_repository: SportsRepository = SportsRepository()
