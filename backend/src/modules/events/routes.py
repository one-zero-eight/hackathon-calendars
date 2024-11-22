from fastapi import APIRouter

from src.api.exceptions import IncorrectCredentialsException
from src.modules.events.repository import events_repository
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
