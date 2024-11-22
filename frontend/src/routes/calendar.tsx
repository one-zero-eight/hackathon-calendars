import { SportEventsList } from "@/components/SportEventsList.tsx";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/calendar")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl">Календарь</h1>
      <SportEventsList />
    </div>
  );
}
