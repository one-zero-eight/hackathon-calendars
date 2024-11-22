import { $api } from "@/api";
import { EventCard } from "@/components/EventCard.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
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
        sort: {},
        pagination: { page_no: 1, page_size: 10000 },
      },
    },
    {
      enabled: !!sport,
    },
  );

  return (
    <div className="flex gap-2 p-4">
      <Card className="flex w-full max-w-2xl flex-col gap-2 p-4">
        <img src={SportSVG} className="h-[350px]" />
        <CardTitle className="text-4xl">{sport?.sport}</CardTitle>
        <CardContent className="px-0">
          <div className="text-lg">
            Всего дисциплин: {sport?.disciplines.length}
          </div>
          <div className="flex flex-wrap gap-2">
            {sport?.disciplines
              .sort((a, b) => a.localeCompare(b))
              .map((discipline, i) => (
                <Button
                  asChild
                  key={i}
                  className="justify-start px-4 py-2"
                  variant="outline"
                >
                  <Link
                    to="/search"
                    search={{
                      filters: {
                        discipline: [{ sport: sport?.sport ?? "", discipline }],
                      },
                    }}
                  >
                    {discipline}
                    {events?.events.filter((event) =>
                      event.discipline.includes(discipline),
                    ).length ? (
                      <>
                        {" - "}
                        {
                          events?.events.filter((event) =>
                            event.discipline.includes(discipline),
                          ).length
                        }{" "}
                        мероприятий
                      </>
                    ) : null}
                  </Link>
                </Button>
              ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex grow flex-col gap-2">
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
