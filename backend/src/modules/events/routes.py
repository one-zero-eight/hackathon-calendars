from fastapi import APIRouter
from pydantic import BaseModel

from src.api.exceptions import IncorrectCredentialsException
from src.modules.events.repository import events_repository
from src.modules.events.schemas import Filters, Pagination, Sort
from src.modules.sports.repository import sports_repository
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


@router.get("/{id}", responses={200: {"description": "Info about event"}})
async def get_event(id: str) -> Event:
    """
    Get info about one event.
    """
    return await events_repository.read_one(id)


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
    events = await events_repository.read_with_filters(filters, sort, pagination)
    return SearchEventsResponse(
        filters=filters,
        sort=sort,
        pagination=pagination,
        page=pagination.page_no,
        pages_total=1,
        events=events,
    )


class RegionsFilterVariants(BaseModel):
    region: str | None
    "Название региона"
    cities: list[str]
    "Названия городов"


class LocationsFilterVariants(BaseModel):
    country: str
    "Название страны"
    regions: list[RegionsFilterVariants]
    "Названия регионов"


@router.get("/search/filters/locations", responses={200: {"description": "All locations"}})
async def get_all_filters_locations() -> list[LocationsFilterVariants]:
    """
    Get all locations.
    """
    # From all 'location' fields of events, get unique values
    # TODO: Write Mongo request
    countries: dict[str, dict[str, RegionsFilterVariants]] = {}
    for event in await events_repository.read_all():
        for location in event.location:
            if location.country not in countries:
                countries[location.country] = {}
            if location.region not in countries[location.country]:
                countries[location.country][location.region] = RegionsFilterVariants(region=location.region, cities=[])
            if location.city not in countries[location.country][location.region].cities:
                countries[location.country][location.region].cities.append(location.city)
    return [
        LocationsFilterVariants(
            country=country,
            regions=list(regions.values()),
        )
        for country, regions in countries.items()
    ]


class DisciplinesFilterVariants(BaseModel):
    sport: str
    "Название вида спорта"
    disciplines: list[str]
    "Названия дисциплин"


@router.get("/search/filters/disciplines", responses={200: {"description": "All disciplines"}})
async def get_all_filters_disciplines() -> list[DisciplinesFilterVariants]:
    """
    Get all disciplines.
    """
    # From all 'sport' and 'disciplines' fields of events, get unique values
    sports = await sports_repository.read_all()
    return [
        DisciplinesFilterVariants(
            sport=sport.sport,
            disciplines=sport.disciplines,
        )
        for sport in sports
    ]
