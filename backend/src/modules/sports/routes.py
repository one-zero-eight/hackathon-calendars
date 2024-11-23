from fastapi import APIRouter

from src.api.exceptions import IncorrectCredentialsException
from src.modules.sports.repository import sports_repository
from src.storages.mongo import Sport

router = APIRouter(
    prefix="/sports",
    tags=["Sports"],
    responses={
        **IncorrectCredentialsException.responses,
    },
)


@router.get("/", responses={200: {"description": "Info about all sports"}})
async def get_all_sports() -> list[Sport]:
    """
    Get info about all sports.
    """
    return await sports_repository.read_all()


@router.get("/{id}", responses={200: {"description": "Info about sport"}})
async def get_sport(id: str) -> Sport:
    """
    Get info about one sport.
    """
    return await sports_repository.read_one(id)


@router.post("/", responses={200: {"description": "Create many sports"}})
async def create_many_sports(sports: list[Sport]) -> bool:
    """
    Create multiple sports.
    """
    return await sports_repository.create_many(sports)


@router.post("/update_descriptions", responses={200: {"description": "Update descriptions"}})
async def update_descriptions(name_x_descriptions: dict[str, str]) -> None:
    """
    Update descriptions of sports.
    """
    await sports_repository.update_decriptions(name_x_descriptions)
