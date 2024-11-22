import { SportEventsList } from "@/components/SportEventsList.tsx";
import { SportSelect } from "@/components/SportSelect.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl">Календарь</h1>
      <SportSelect value={selectedSport} onChange={setSelectedSport} />
      <SportEventsList />
    </div>
  );
}
