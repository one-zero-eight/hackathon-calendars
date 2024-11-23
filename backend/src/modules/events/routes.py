from datetime import datetime

from fastapi import APIRouter
from pydantic import BaseModel

from src.api.exceptions import IncorrectCredentialsException
from src.modules.events.repository import events_repository
from src.modules.events.schemas import DateFilter, Filters, Pagination, Sort
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


@router.post("/search/count", responses={200: {"description": "Count events"}})
async def count_events(filters: Filters) -> int:
    """
    Count filtered events.
    """
    count = await events_repository.read_with_filters(filters, Sort(), Pagination(page_size=0, page_no=0), count=True)
    return count


@router.post("/search/count-by-month", responses={200: {"description": "Count events by months"}})
async def count_events_by_month(filters: Filters) -> dict[str, int]:
    """
    Count filtered events by months.
    """

    counts = {}
    current_year = datetime.now().year
    for i in range(1, 13):
        date_filter = DateFilter()
        date_filter.start_date = datetime(current_year, month=i, day=1)
        if i == 12:
            date_filter.end_date = datetime(current_year + 1, month=1, day=1)
        else:
            date_filter.end_date = datetime(current_year, month=i + 1, day=1)
        filters.date = date_filter
        count = await events_repository.read_with_filters(
            filters, Sort(), Pagination(page_size=0, page_no=0), count=True
        )
        counts[f"{current_year}-{i:02d}"] = count

    return counts


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
    countries: dict[str, dict[str, RegionsFilterVariants]] = {}
    unique_locs = set()
    _ = await events_repository.read_all_locations()
    for locations in _:
        for loc in locations:
            unique_locs.add((loc.get("country"), loc.get("region"), loc.get("city")))
    unique_locs = sorted(unique_locs, key=lambda x: (x[0], x[1] or "", x[2] or ""))

    for country, region, city in unique_locs:
        if region is None and city in (
            "городской округ",
            "деревня",
            "железнодорожной станции",
            "поселок",
            "поселок городского типа",
            "село",
        ):
            continue

        if country not in countries:
            countries[country] = {}
        if region not in countries[country]:
            countries[country][region] = RegionsFilterVariants(region=region, cities=[])
        if city not in countries[country][region].cities:
            countries[country][region].cities.append(city)

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
