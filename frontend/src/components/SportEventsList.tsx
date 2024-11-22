import { $api } from "@/api";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

export function SportEventsList() {
  const { data: events } = $api.useQuery("get", "/events/");
  return (
    <div className="flex flex-col gap-2">
      {events?.map((event) => (
        <Card key={event.title}>
          <CardHeader>
            <CardTitle>{event.title}</CardTitle>
            <CardDescription>
              {event.location.map((l) => (
                <>
                  {l.country}, {l.region}, {l.city}
                </>
              ))}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {new Date(event.start_date).toLocaleDateString("ru-RU")} -{" "}
              {new Date(event.end_date).toLocaleDateString("ru-RU")}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-fit" variant="secondary">
              Подписаться
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
