__all__ = ["app"]

import re

from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi_swagger import patch_fastapi
from starlette.middleware.cors import CORSMiddleware

import src.logging_  # noqa: F401
from src.api.lifespan import lifespan
from src.config import settings


def generate_unique_operation_id(route: APIRoute) -> str:
    # Better names for operationId in OpenAPI schema.
    # It is needed because clients generate code based on these names.
    # Requires pair (tag name + function name) to be unique.
    # See fastapi.utils:generate_unique_id (default implementation).
    if route.tags:
        operation_id = f"{route.tags[0]}_{route.name}".lower()
    else:
        operation_id = route.name.lower()
    operation_id = re.sub(r"\W+", "_", operation_id)
    return operation_id


# App definition
app = FastAPI(
    title="login pass",
    version="0.1.0",
    contact={
        "name": "one-zero-eight (Telegram)",
        "url": "https://t.me/one_zero_eight",
    },
    license_info={
        "name": "MIT License",
        "identifier": "MIT",
    },
    servers=[
        {"url": settings.app_root_path, "description": "Current"},
    ],
    root_path=settings.app_root_path,
    root_path_in_servers=False,
    generate_unique_id_function=generate_unique_operation_id,
    lifespan=lifespan,
    docs_url=None,
    redoc_url=None,
    swagger_ui_oauth2_redirect_url=None,
)
patch_fastapi(app)

# CORS settings
app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=settings.cors_allow_origin_regex,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from starlette.middleware.sessions import SessionMiddleware  # noqa: E402

from src.config_schema import Environment  # noqa: E402

session_cookie = "__Secure-session" if settings.environment == Environment.PRODUCTION else "session"
app.add_middleware(
    SessionMiddleware,
    secret_key=settings.session_secret_key.get_secret_value(),
    session_cookie=session_cookie,
    max_age=14 * 24 * 60 * 60,  # 14 days, in seconds
    path=settings.app_root_path or "/",
    same_site="lax",
    https_only=True if settings.environment == Environment.PRODUCTION else False,
    domain=None,
)

from src.modules.users.routes import router as router_users  # noqa: E402

app.include_router(router_users)
