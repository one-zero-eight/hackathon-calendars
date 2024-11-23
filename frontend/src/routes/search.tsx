import { $api } from "@/api";
import { EventCard } from "@/components/EventCard.tsx";
import { ExportFiltersToCalendar } from "@/components/ExportFiltersToCalendar.tsx";
import { AllFilters } from "@/components/filters/AllFilters";
import { GetUrlToFilters } from "@/components/GetUrlToFilters.tsx";
import { Input } from "@/components/ui/input";
import { Filters } from "@/lib/types";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: (search): { filters?: Filters; share?: string } => {
    return {
      filters: (search.filters as Filters | undefined) || undefined,
      share: (search.share as string | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { filters: routeFilters, share } = Route.useSearch();
  const [actualFilters, setActualFilters] = useState<Filters>();
  const [filtersChanging, setFiltersChanging] = useState(false);
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>();
  const [query, setQuery] = useState("");
  const { data: shareFilters } = $api.useQuery(
    "get",
    "/events/search/share/{selection_id}",
    { params: { path: { selection_id: share ?? "" } } },
    { enabled: !!share },
  );

  useEffect(() => {
    setActualFilters(shareFilters?.filters ?? routeFilters);
    setQuery(shareFilters?.filters?.query ?? routeFilters?.query ?? "");
  }, [routeFilters, shareFilters]);

  useDebounce(
    () => {
      setDebouncedFilters(actualFilters);
      setFiltersChanging(false);
      navigate({
        to: "/search",
        search: { filters: { ...actualFilters, query } },
      });
    },
    300,
    [actualFilters, query, filtersChanging],
  );

  const handleFiltersChange = (newFilters: Filters) => {
    setFiltersChanging(true);
    setActualFilters(newFilters);
  };

  const handleQueryChange = (newQuery: string) => {
    setFiltersChanging(true);
    setQuery(newQuery);
  };

  const { data, isLoading: dataLoading } = $api.useQuery(
    "post",
    "/events/search",
    {
      body: {
        filters: debouncedFilters || {},
        pagination: {
          page_no: 1,
          page_size: 100,
        },
        sort: {
          date: "asc",
        },
      },
    },
  );

  const loading = dataLoading || filtersChanging;

  return (
    <div className="mt-4 flex gap-4 px-4">
      <aside className="flex h-fit w-[400px] flex-shrink-0 flex-grow-0 flex-col gap-4 rounded-sm border p-4">
        <AllFilters
          filters={actualFilters || {}}
          onChange={handleFiltersChange}
          className="w-full"
        />
        <div className="flex flex-col gap-2">
          <GetUrlToFilters filters={actualFilters} sort={{}} />
          <ExportFiltersToCalendar filters={actualFilters} />
        </div>
      </aside>
      <main className="flex flex-grow flex-col gap-2">
        <Input
          className="rounded-md border border-gray-300 px-2 py-1"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="Название, вид спорта, город..."
        />
        {loading ? (
          <span>Загрузка...</span>
        ) : data?.events.length ? (
          data.events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <span>Ничего не найдено</span>
        )}
      </main>
    </div>
  );
}
