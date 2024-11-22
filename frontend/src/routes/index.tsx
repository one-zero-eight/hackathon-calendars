import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="p-4">
      <h1 className="text-2xl">Привет!</h1>
    </div>
  );
}
