/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/users/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get Me
         * @description Get current user info if authenticated
         */
        get: operations["users_get_me"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Register By Credentials
         * @description Register using credentials
         */
        post: operations["users_register_by_credentials"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Login By Credentials
         * @description Login using credentials
         */
        post: operations["users_login_by_credentials"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Logout
         * @description Logout (clear session)
         */
        post: operations["users_logout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/events/": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get All Events
         * @description Get info about all events.
         */
        get: operations["events_get_all_events"];
        put?: never;
        /**
         * Create Many Events
         * @description Create multiple events.
         */
        post: operations["events_create_many_events"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/events/search": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Search Events
         * @description Search events.
         */
        post: operations["events_search_events"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        /** Body_events_search_events */
        Body_events_search_events: {
            filters: components["schemas"]["Filters"];
            sort: components["schemas"]["Sort"];
            pagination: components["schemas"]["Pagination"];
        };
        /** DateFilter */
        DateFilter: {
            /** Start Date */
            start_date?: string | null;
            /** End Date */
            end_date?: string | null;
        };
        /** DisciplineFilter */
        DisciplineFilter: {
            /**
             * Sport Id
             * @example 5eb7cf5a86d9755df3a6c593
             */
            sport_id: string;
            /** Discipline Id */
            discipline_id?: string | null;
        };
        /** Event */
        "Event-Input": {
            /**
             * Id
             * @description MongoDB document ObjectID
             * @example 5eb7cf5a86d9755df3a6c593
             */
            _id?: string;
            /** Title */
            title: string;
            /** Description */
            description: string;
            /** Location */
            location: string;
            /** Date Start */
            date_start: string;
            /** Date End */
            date_end: string;
        };
        /** Event */
        "Event-Output": {
            /**
             * Id
             * Format: objectid
             * @description MongoDB document ObjectID
             * @default None
             * @example 5eb7cf5a86d9755df3a6c593
             */
            id: string;
            /** Title */
            title: string;
            /** Description */
            description: string;
            /** Location */
            location: string;
            /** Date Start */
            date_start: string;
            /** Date End */
            date_end: string;
        };
        /**
         * Filters
         * @description Список фильтров, которые применяются через И
         */
        Filters: {
            /** Query */
            query?: string | null;
            date?: components["schemas"]["DateFilter"] | null;
            /** Discipline */
            discipline?: components["schemas"]["DisciplineFilter"][] | null;
            /** Location */
            location?: components["schemas"]["LocationFilter"][] | null;
            gender?: components["schemas"]["Gender"] | null;
            age?: components["schemas"]["MinMaxFilter"] | null;
            participant_count?: components["schemas"]["MinMaxFilter"] | null;
        };
        /**
         * Gender
         * @enum {string}
         */
        Gender: "male" | "female";
        /** HTTPValidationError */
        HTTPValidationError: {
            /** Detail */
            detail?: components["schemas"]["ValidationError"][];
        };
        /** LocationFilter */
        LocationFilter: {
            /**
             * Country Id
             * @example 5eb7cf5a86d9755df3a6c593
             */
            country_id: string;
            /** City Id */
            city_id?: string | null;
        };
        /** MinMaxFilter */
        MinMaxFilter: {
            /** Min */
            min?: number | null;
            /** Max */
            max?: number | null;
        };
        /**
         * Order
         * @enum {string}
         */
        Order: "asc" | "desc";
        /** Pagination */
        Pagination: {
            /** Page Size */
            page_size: number;
            /** Page No */
            page_no: number;
        };
        /** SearchEventsResponse */
        SearchEventsResponse: {
            filters: components["schemas"]["Filters"];
            sort: components["schemas"]["Sort"];
            pagination: components["schemas"]["Pagination"];
            /** Page */
            page: number;
            /** Pages Total */
            pages_total: number;
            /** Events */
            events: components["schemas"]["Event-Output"][];
        };
        /** Sort */
        Sort: {
            date?: components["schemas"]["Order"] | null;
            age?: components["schemas"]["Order"] | null;
            participant_count?: components["schemas"]["Order"] | null;
        };
        /** ValidationError */
        ValidationError: {
            /** Location */
            loc: (string | number)[];
            /** Message */
            msg: string;
            /** Error Type */
            type: string;
        };
        /** ViewUser */
        ViewUser: {
            /**
             * Id
             * @example 5eb7cf5a86d9755df3a6c593
             */
            id: string;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type SchemaBodyEventsSearchEvents = components['schemas']['Body_events_search_events'];
export type SchemaDateFilter = components['schemas']['DateFilter'];
export type SchemaDisciplineFilter = components['schemas']['DisciplineFilter'];
export type SchemaEventInput = components['schemas']['Event-Input'];
export type SchemaEventOutput = components['schemas']['Event-Output'];
export type SchemaFilters = components['schemas']['Filters'];
export type SchemaGender = components['schemas']['Gender'];
export type SchemaHttpValidationError = components['schemas']['HTTPValidationError'];
export type SchemaLocationFilter = components['schemas']['LocationFilter'];
export type SchemaMinMaxFilter = components['schemas']['MinMaxFilter'];
export type SchemaOrder = components['schemas']['Order'];
export type SchemaPagination = components['schemas']['Pagination'];
export type SchemaSearchEventsResponse = components['schemas']['SearchEventsResponse'];
export type SchemaSort = components['schemas']['Sort'];
export type SchemaValidationError = components['schemas']['ValidationError'];
export type SchemaViewUser = components['schemas']['ViewUser'];
export type $defs = Record<string, never>;
export interface operations {
    users_get_me: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Current user info */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ViewUser"];
                };
            };
            /** @description Unable to verify credentials OR Credentials not provided */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    users_register_by_credentials: {
        parameters: {
            query: {
                login: string;
                password: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully registered */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Unable to verify credentials OR Credentials not provided */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    users_login_by_credentials: {
        parameters: {
            query: {
                login: string;
                password: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully logged in (session updated) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Unable to verify credentials OR Credentials not provided */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    users_logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully logged out (session cleared) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": unknown;
                };
            };
            /** @description Unable to verify credentials OR Credentials not provided */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    events_get_all_events: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Info about all events */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Event-Output"][];
                };
            };
            /** @description Unable to verify credentials OR Credentials not provided */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    events_create_many_events: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Event-Input"][];
            };
        };
        responses: {
            /** @description Create many events */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": boolean;
                };
            };
            /** @description Unable to verify credentials OR Credentials not provided */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
    events_search_events: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["Body_events_search_events"];
            };
        };
        responses: {
            /** @description Search events */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["SearchEventsResponse"];
                };
            };
            /** @description Unable to verify credentials OR Credentials not provided */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Validation Error */
            422: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HTTPValidationError"];
                };
            };
        };
    };
}
