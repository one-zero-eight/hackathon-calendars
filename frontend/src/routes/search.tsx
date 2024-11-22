import { SportDisciplineSelect } from "@/components/filters/SportDisciplineSelect";
import { SportSelect } from "@/components/filters/SportSelect";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/search")({
  component: RouteComponent,
});

function RouteComponent() {
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})

  return (
    <div className="flex mt-4 px-4">
      <aside className="border rounded-sm flex-grow-0 p-4">
        <AllFilters
          disabled={loading}
          filters={filters}
          onChange={setFilters}
        />
      </aside>
    </div>
  )
}

function AllFilters({
  disabled,
  filters,
  onChange,
}: {
  disabled?: boolean,
  filters: Filters,
  onChange: (v: Filters) => void
}) {
  const handleSportChange = (newSport: string | null) => {
    onChange({ ...filters, discipline: null, sport: newSport })
  }

  const handleDisciplineChange = (newDiscipline: string | null) => {
    onChange({ ...filters, discipline: newDiscipline })
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <SportSelect
          disabled={disabled}
          value={filters.sport}
          onChange={handleSportChange}
        />
        <SportDisciplineSelect
          disabled={disabled}
          onChange={handleDisciplineChange} 
          sport={filters.sport}
          value={filters.discipline}
        />
      </div>
    </div>
  )
}

// TODO
type Filters = any
