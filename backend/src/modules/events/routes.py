from fastapi import APIRouter
from pydantic import BaseModel

from src.api.exceptions import IncorrectCredentialsException
from src.modules.events.repository import events_repository
from src.modules.events.schemas import DisciplineFilter, Filters, LocationFilter, Pagination, Sort
from src.storages.mongo.events import Event

router = APIRouter(
    prefix="/events",
    tags=["Events"],
    responses={
        **IncorrectCredentialsException.responses,
    },
)


@router.get("/", responses={200: {"description": "Info about all events"}})
async def get_all_events() -> list[Event]:
    """
    Get info about all events.
    """
    return await events_repository.read_all()


@router.post("/", responses={200: {"description": "Create many events"}})
async def create_many_events(events: list[Event]) -> bool:
    """
    Create multiple events.
    """
    return await events_repository.create_many(events)


class SearchEventsResponse(BaseModel):
    filters: Filters
    "Заданные фильтры"
    sort: Sort
    "Заданная сортировка"
    pagination: Pagination
    "Заданная пагинация"

    page: int
    "Текущая страница"
    pages_total: int
    "Всего страниц"

    events: list[Event]
    "Результат поиска"


@router.post("/search", responses={200: {"description": "Search events"}})
async def search_events(filters: Filters, sort: Sort, pagination: Pagination) -> SearchEventsResponse:
    """
    Search events.
    """
    events = await events_repository.read_all()
    return SearchEventsResponse(
        filters=filters,
        sort=sort,
        pagination=pagination,
        page=1,
        pages_total=1,
        events=events,
    )


@router.get("/search/filters/locations", responses={200: {"description": "All locations"}})
async def get_all_filters_locations() -> list[LocationFilter]:
    """
    Get all locations.
    """
    # From all 'location' fields of events, get unique values
    locations: list[LocationFilter] = list()
    for event in await events_repository.read_all():
        for location in event.location:
            if location not in locations:
                locations.append(LocationFilter(country=location.country, region=location.region, city=location.city))
    return list(locations)


@router.get("/search/filters/disciplines", responses={200: {"description": "All disciplines"}})
async def get_all_filters_disciplines() -> list[DisciplineFilter]:
    """
    Get all disciplines.
    """
    # From all 'sport' and 'disciplines' fields of events, get unique values
    disciplines: list[DisciplineFilter] = list()
    for event in await events_repository.read_all():
        for discipline in event.discipline:
            if discipline not in disciplines:
                disciplines.append(DisciplineFilter(sport=event.sport, discipline=discipline))
    return list(disciplines)
