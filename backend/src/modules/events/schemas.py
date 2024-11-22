import datetime
from enum import StrEnum

from beanie import PydanticObjectId
from pydantic import BaseModel


class DateFilter(BaseModel):
    start_date: datetime.datetime | None = None
    "Не раньше даты"
    end_date: datetime.datetime | None = None
    "Не позже даты"


class DisciplineFilter(BaseModel):
    sport_id: PydanticObjectId
    "Идентификатор вида спорта"
    discipline_id: PydanticObjectId | None = None
    "Идентификатор дисциплины"


class LocationFilter(BaseModel):
    country_id: PydanticObjectId
    "Идентификатор страны"
    city_id: PydanticObjectId | None = None
    "Идентификатор города"


class MinMaxFilter(BaseModel):
    min: int | None = None
    "Не менее"
    max: int | None = None
    "Не более"


class Gender(StrEnum):
    male = "male"
    "Мужской пол"
    female = "female"
    "Женский пол"


class Filters(BaseModel):
    """Список фильтров, которые применяются через И"""

    query: str | None = None
    "Текстовый запрос, чтобы фильтровать по любому полю"
    date: DateFilter | None = None
    "Фильтр по дате"
    discipline: list[DisciplineFilter] | None = None
    "Фильтр по спортивным дисциплинам (применяется через ИЛИ)"
    location: list[LocationFilter] | None = None
    "Фильтр по локации (применяется через ИЛИ)"
    gender: Gender | None = None
    "Фильтр по полу участников"
    age: MinMaxFilter | None = None
    "Фильтр по возрасту участников"
    participant_count: MinMaxFilter | None = None
    "Фильтр по количеству участников соревнования"


class Order(StrEnum):
    asc = "asc"
    "По возрастанию"
    desc = "desc"
    "По убыванию"


class Sort(BaseModel):
    date: Order | None = None
    "Сортировка по дате"
    age: Order | None = None
    "Сортировка по возрасту"
    participant_count: Order | None = None
    "Сортировка по количеству участников"


class Pagination(BaseModel):
    page_size: int
    "Количество элементов на странице"
    page_no: int
    "Номер страницы"