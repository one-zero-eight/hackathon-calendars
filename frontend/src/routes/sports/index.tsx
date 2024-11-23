import { $api } from "@/api";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import SportSVG from "@/routes/sports/sport.svg";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Link as LinkIcon } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/sports/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: sports } = $api.useQuery("get", "/sports/");
  const [query, setQuery] = useState("");

  const sportsToShow = sports?.filter((sport) =>
    sport.sport.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="mt-4 flex justify-center gap-4 px-4">
      <main className="flex max-w-6xl flex-grow flex-col gap-2">
        <Input
          className="rounded-md border border-gray-300 px-2 py-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Название спорта..."
        />

        {sportsToShow?.map((sport) => (
          <Card key={sport.id} className="flex overflow-clip">
            <img
              src={`/api/static/${sport?.sport.toLocaleLowerCase().replace(" ", "_")}.png`}
              onError={(e) => {
                // @ts-ignore
                e.target.onerror = null;
                // @ts-ignore
                e.target.src = SportSVG;
              }}
              className="h-full w-[200px] min-w-[200px] bg-black"
            />
            <div className="flex flex-col gap-2 px-4 py-2">
              <div className="text-3xl font-bold">{sport.sport}</div>
              <div className="text-lg text-gray-500">{sport.description}</div>

              <Separator />

              <div className="text-lg text-gray-500">
                <span className="font-medium">Количество дисциплин:</span>{" "}
                {sport.disciplines.length}
              </div>

              <Button asChild variant="secondary" className="w-fit">
                <Link
                  to="/sports/$sportId"
                  params={{ sportId: sport.id }}
                  className="text-lg text-blue-500"
                >
                  <LinkIcon />
                  Подробнее
                </Link>
              </Button>
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
}
