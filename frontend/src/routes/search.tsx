import { $api } from "@/api";
import { EventCard } from "@/components/EventCard.tsx";
import { AllFilters } from "@/components/filters/AllFilters";
import { Filters } from "@/lib/types";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
  validateSearch: (search): { filters?: Filters } => {
    return {
      filters: (search.filters as Filters | undefined) || undefined,
    };
  },
});

function RouteComponent() {
  const { filters } = Route.useSearch();
  const navigate = useNavigate();

  const setFilters = (filters: Filters) => {
    navigate({ to: "/search", search: { filters } });
  };

  const { data } = $api.useQuery("post", "/events/search", {
    body: {
      filters: filters || {},
      pagination: {
        page_no: 1,
        page_size: 100,
      },
      sort: {},
    },
  });

  return (
    <div className="mt-4 flex gap-4 px-4">
      <aside className="w-[400px] flex-shrink-0 flex-grow-0 rounded-sm border p-4">
        <AllFilters
          filters={filters || {}}
          onChange={setFilters}
          className="w-full"
        />
      </aside>
      <main className="flex flex-col gap-2">
        {(data?.events ?? []).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </main>
    </div>
  );
}
