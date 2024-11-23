import { $api } from "@/api";
import { EventCard } from "@/components/EventCard.tsx";
import { AllFilters } from "@/components/filters/AllFilters";
import { Input } from "@/components/ui/input";
import { Filters } from "@/lib/types";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: (search): { filters?: Filters } => {
    return {
      filters: (search.filters as Filters | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { filters: routeFilters } = Route.useSearch();
  const [actualFilters, setActualFilters] = useState<Filters>();
  const [filtersChanging, setFiltersChanging] = useState(false);
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>();
  const [query, setQuery] = useState("");

  useEffect(() => {
    setActualFilters(routeFilters);
    setQuery(routeFilters?.query ?? "");
  }, [routeFilters]);

  useDebounce(
    () => {
      console.log("debounced");
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
    setFiltersChanging(true)
    setQuery(newQuery)
  }

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
      <aside className="w-[400px] flex-shrink-0 flex-grow-0 rounded-sm border p-4">
        <AllFilters
          filters={actualFilters || {}}
          onChange={handleFiltersChange}
          className="w-full"
        />
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
