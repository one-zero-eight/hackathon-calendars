__all__ = ["events_repository"]

from beanie import SortDirection
from beanie.odm.operators.find.comparison import In

from src.modules.events.schemas import Filters, Pagination, Sort
from src.storages.mongo.events import Event


# noinspection PyMethodMayBeStatic
class EventsRepository:
    async def read_one(self, id: str) -> Event | None:
        return await Event.get(id)

    async def read_all(self) -> list[Event] | None:
        return await Event.all().to_list()

    async def create_many(self, events: list[Event]) -> bool:
        res = await Event.insert_many(events)
        if not res.acknowledged:
            return False
        return True

    async def read_with_filters(self, filters: Filters, sort: Sort, pagination: Pagination) -> list[Event]:
        query = Event.all()

        # Apply filters
        if filters.age and filters.age.min is not None:
            query = query.find(Event.age_max >= filters.age.min)
        if filters.age and filters.age.max is not None:
            query = query.find(Event.age_min <= filters.age.max)
        if filters.participant_count and filters.participant_count.min is not None:
            query = query.find(Event.participant_count >= filters.participant_count.min)
        if filters.participant_count and filters.participant_count.max is not None:
            query = query.find(Event.participant_count <= filters.participant_count.max)
        if filters.gender is not None:
            query = query.find(Event.gender == filters.gender)
        if filters.date and filters.date.start_date is not None:
            query = query.find(Event.start_date >= filters.date.start_date)
        if filters.date and filters.date.end_date is not None:
            query = query.find(Event.end_date <= filters.date.end_date)
        if filters.discipline:
            # FIXME: Может работать неверно, если у указанных спортов есть одинаковые названия дисциплин
            query = query.find(In(Event.sport, [discipline.sport for discipline in filters.discipline]))
            if None not in [discipline.discipline for discipline in filters.discipline]:
                query = query.find(In(Event.discipline, [discipline.discipline for discipline in filters.discipline]))

        if filters.location:
            # TODO: Проверить
            query = query.find(In(Event.location, filters.location))
        if filters.query:
            query = query.find({"$text": {"$search": filters.query}})

        # Apply sorting
        if sort.date:
            query = query.sort(
                ("start_date", SortDirection.ASCENDING if sort.date == "asc" else SortDirection.DESCENDING)
            )
        if sort.participant_count:
            query = query.sort(
                (
                    "participant_count",
                    SortDirection.ASCENDING if sort.participant_count == "asc" else SortDirection.DESCENDING,
                )
            )
        if sort.age:
            query = query.sort(("age_min", SortDirection.ASCENDING if sort.age == "asc" else SortDirection.DESCENDING))

        # Apply pagination
        query = query.skip(pagination.page_size * (pagination.page_no - 1)).limit(pagination.page_size)

        # Return results
        return await query.to_list()


events_repository: EventsRepository = EventsRepository()
