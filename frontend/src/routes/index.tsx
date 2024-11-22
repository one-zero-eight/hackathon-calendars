import { $api } from "@/api";
import { Button } from "@/components/ui/button.tsx";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: sports } = $api.useQuery("get", "/sports/");

  return (
    <div className="p-4">
      <h2 className="mb-2 text-center text-2xl">Выбери свой вид спорта</h2>
      <div className="flex flex-wrap justify-center gap-2">
        {sports?.map((sport) => (
          <Button
            key={sport.id}
            asChild
            className="flex items-center gap-2 px-4 py-2"
            variant="outline"
          >
            <Link to="/sports/$sportId" params={{ sportId: sport.id }}>
              {sport.sport}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}
