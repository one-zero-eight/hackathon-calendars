__all__ = ["Event", "EventSchema"]

import datetime

from src.modules.events.schemas import Gender
from src.pydantic_base import BaseSchema
from src.storages.mongo.__base__ import CustomDocument


class EventLocation(BaseSchema):
    country: str
    "Название страны"
    region: str | None = None
    "Название региона"
    city: str | None = None
    "Название города"


class EventSchema(BaseSchema):
    ekp_id: int
    "№ СМ в ЕКП"

    title: str
    "Наименование спортивного мероприятия"

    gender: Gender | None = None
    "Пол участников (None - любой)"

    age_min: int | None = None
    "Минимальный возраст участников"
    age_max: int | None = None
    "Максимальный возраст участников"

    sport: str
    "Название вида спорта"
    discipline: str | None = None
    "Название дисциплины"

    start_date: datetime.datetime | None = None
    "Дата начала"
    end_date: datetime.datetime | None = None
    "Дата конца"

    location: EventLocation
    "Место проведения"

    participant_count: int | None = None
    "Количество участников"


class Event(EventSchema, CustomDocument):
    class Settings:
        pass
