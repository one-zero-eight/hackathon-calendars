import { $api } from "@/api";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent, CardTitle } from "@/components/ui/card.tsx";
import { createFileRoute } from "@tanstack/react-router";
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
    <div className="flex justify-center p-4">
      <Card className="flex w-full max-w-2xl flex-col gap-2 p-4">
        <img src={SportSVG} className="h-[350px]" />
        <CardTitle className="text-4xl">{sport?.sport}</CardTitle>
        <CardContent className="px-0">
          <div className="text-lg">
            Мероприятий в 2024 году: {events?.events.length}
          </div>
          <div className="text-lg">
            Всего дисциплин: {sport?.disciplines.length}
          </div>
          <div className="flex flex-col gap-2">
            {sport?.disciplines.map((discipline, i) => (
              <Button
                key={i}
                className="justify-start px-4 py-2"
                variant="outline"
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
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
