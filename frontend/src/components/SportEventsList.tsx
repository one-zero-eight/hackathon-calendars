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
      {events?.map((sport) => (
        <Card key={sport.title}>
          <CardHeader>
            <CardTitle>{sport.title}</CardTitle>
            <CardDescription>{sport.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {new Date(sport.date_start).toLocaleDateString("ru-RU")} -{" "}
              {new Date(sport.date_end).toLocaleDateString("ru-RU")}
            </p>
            {sport.description && (
              <p className="text-sm text-gray-500">{sport.description}</p>
            )}
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
