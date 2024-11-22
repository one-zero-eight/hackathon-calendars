import { $api } from "@/api";
import { AllFilters } from "@/components/filters/AllFilters";
import { Filters } from "@/lib/types";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
});

function RouteComponent() {
  const [filters, setFilters] = useState<Filters>({});
  const { data } = $api.useQuery("post", "/events/search", {
    body: {
      filters,
      pagination: {
        page_no: 1,
        page_size: 100,
      },
      sort: {},
    },
  });

  return (
    <div className="mt-4 flex gap-4 px-4">
      <aside className="flex-grow-0 rounded-sm border p-4">
        <AllFilters filters={filters} onChange={setFilters} />
      </aside>
      <main>
        {(data?.events ?? []).map((event) => (
          <div key={event.id}>
            {JSON.stringify(event)}
          </div>
        ))}
      </main>
    </div>
  );
}
