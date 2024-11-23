import { $api } from "@/api";
import { EventCard } from "@/components/EventCard.tsx";
import { ExportSportToCalendar } from "@/components/ExportSportToCalendar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
import { cn } from "@/lib/utils.ts";
import { createFileRoute, Link } from "@tanstack/react-router";
import SportSVG from "./sport.svg";

export const Route = createFileRoute("/sports/$sportId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { sportId } = Route.useParams();
  const { data: sport } = $api.useQuery("get", "/sports/{id}", {
    params: { path: { id: sportId } },
  });
  const { data: events } = $api.useQuery(
    "post",
    "/events/search",
    {
      body: {
        filters: {
          discipline: [
            {
              sport: sport?.sport ?? "",
            },
          ],
        },
        sort: {
          date: "asc",
        },
        pagination: { page_no: 1, page_size: 100 },
      },
    },
    {
      enabled: !!sport,
    },
  );

  return (
    <div className="flex w-full flex-col gap-2 p-4 lg:flex-row">
      <Card className="flex w-full flex-col gap-2 p-4">
        <div className="flex justify-center rounded-xl bg-black">
          <img
            src={`/api/static/${sport?.sport.toLocaleLowerCase().replace(" ", "_")}.png`}
            onError={(e) => {
              // @ts-ignore
              e.target.onerror = null;
              // @ts-ignore
              e.target.src = SportSVG;
            }}
            className="h-[350px] w-[350px]"
          />
        </div>
        <CardTitle className="text-4xl">{sport?.sport}</CardTitle>
        <CardContent className="px-0">
          <div className="rounded-xl border-2 p-4 text-lg">
            {sport?.description}
          </div>
          <div className="mt-4 flex-row">
            <ExportSportToCalendar sportId={sportId} />
          </div>
          <div className="mt-4 text-2xl font-semibold">
            Всего дисциплин: {sport?.disciplines.length}
          </div>
          <div className="flex flex-wrap gap-2">
            {sport?.disciplines
              .sort((a, b) => a.localeCompare(b))
              .map((discipline, i) => {
                const count = events?.events.filter((event) =>
                  event.discipline.includes(discipline),
                ).length;

                return (
                  <Button
                    asChild
                    key={i}
                    className={cn(
                      "justify-start px-4 py-2",
                      count ? "bg-green-100 hover:bg-green-200" : null,
                    )}
                    variant="outline"
                  >
                    <Link
                      to="/search"
                      search={{
                        filters: {
                          discipline: [
                            { sport: sport?.sport ?? "", discipline },
                          ],
                        },
                      }}
                    >
                      {discipline}
                      {count ? <> - {count} мероприятий</> : null}
                    </Link>
                  </Button>
                );
              })}
          </div>
        </CardContent>
      </Card>

      <div className="flex w-full flex-col gap-2">
        <div className="flex justify-between pl-6 text-2xl font-semibold">
          <div>Мероприятий в 2024 году: {events?.events.length}</div>
          <Button asChild className="px-4 py-2 text-lg" variant="default">
            <Link
              to="/search"
              search={{
                filters: { discipline: [{ sport: sport?.sport ?? "" }] },
              }}
            >
              В поиск
            </Link>
          </Button>
        </div>
        {events?.events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </div>
  );
}
