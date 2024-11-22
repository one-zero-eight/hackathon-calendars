/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as SearchImport } from "./routes/search";
import { Route as IndexImport } from "./routes/index";
import { Route as SportsSportIdImport } from "./routes/sports/$sportId";
import { Route as EventsEventIdImport } from "./routes/events/$eventId";
import { Route as AuthLoginImport } from "./routes/auth/login";

// Create/Update Routes

const SearchRoute = SearchImport.update({
  id: "/search",
  path: "/search",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

const SportsSportIdRoute = SportsSportIdImport.update({
  id: "/sports/$sportId",
  path: "/sports/$sportId",
  getParentRoute: () => rootRoute,
} as any);

const EventsEventIdRoute = EventsEventIdImport.update({
  id: "/events/$eventId",
  path: "/events/$eventId",
  getParentRoute: () => rootRoute,
} as any);

const AuthLoginRoute = AuthLoginImport.update({
  id: "/auth/login",
  path: "/auth/login",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/search": {
      id: "/search";
      path: "/search";
      fullPath: "/search";
      preLoaderRoute: typeof SearchImport;
      parentRoute: typeof rootRoute;
    };
    "/auth/login": {
      id: "/auth/login";
      path: "/auth/login";
      fullPath: "/auth/login";
      preLoaderRoute: typeof AuthLoginImport;
      parentRoute: typeof rootRoute;
    };
    "/events/$eventId": {
      id: "/events/$eventId";
      path: "/events/$eventId";
      fullPath: "/events/$eventId";
      preLoaderRoute: typeof EventsEventIdImport;
      parentRoute: typeof rootRoute;
    };
    "/sports/$sportId": {
      id: "/sports/$sportId";
      path: "/sports/$sportId";
      fullPath: "/sports/$sportId";
      preLoaderRoute: typeof SportsSportIdImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/search": typeof SearchRoute;
  "/auth/login": typeof AuthLoginRoute;
  "/events/$eventId": typeof EventsEventIdRoute;
  "/sports/$sportId": typeof SportsSportIdRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/search": typeof SearchRoute;
  "/auth/login": typeof AuthLoginRoute;
  "/events/$eventId": typeof EventsEventIdRoute;
  "/sports/$sportId": typeof SportsSportIdRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/search": typeof SearchRoute;
  "/auth/login": typeof AuthLoginRoute;
  "/events/$eventId": typeof EventsEventIdRoute;
  "/sports/$sportId": typeof SportsSportIdRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths:
    | "/"
    | "/search"
    | "/auth/login"
    | "/events/$eventId"
    | "/sports/$sportId";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/search" | "/auth/login" | "/events/$eventId" | "/sports/$sportId";
  id:
    | "__root__"
    | "/"
    | "/search"
    | "/auth/login"
    | "/events/$eventId"
    | "/sports/$sportId";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  SearchRoute: typeof SearchRoute;
  AuthLoginRoute: typeof AuthLoginRoute;
  EventsEventIdRoute: typeof EventsEventIdRoute;
  SportsSportIdRoute: typeof SportsSportIdRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  SearchRoute: SearchRoute,
  AuthLoginRoute: AuthLoginRoute,
  EventsEventIdRoute: EventsEventIdRoute,
  SportsSportIdRoute: SportsSportIdRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/search",
        "/auth/login",
        "/events/$eventId",
        "/sports/$sportId"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/search": {
      "filePath": "search.tsx"
    },
    "/auth/login": {
      "filePath": "auth/login.tsx"
    },
    "/events/$eventId": {
      "filePath": "events/$eventId.tsx"
    },
    "/sports/$sportId": {
      "filePath": "sports/$sportId.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
