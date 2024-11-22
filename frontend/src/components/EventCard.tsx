import { $api, apiTypes } from "@/api";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Link } from "@tanstack/react-router";
import { ImMan, ImManWoman, ImWoman } from "react-icons/im";

export function EventCard({ event }: { event: apiTypes.SchemaEventOutput }) {
  const { data: sports } = $api.useQuery("get", "/sports/");

  const sportId = sports?.find((s) => s.sport === event.sport)?.id;

  // Функция для получения иконки пола
  const getGenderIcon = () => {
    switch (event.gender) {
      case "male":
        return <ImMan className="inline text-blue-500" size={20} />;
      case "female":
        return <ImWoman className="inline text-pink-500" size={20} />;
      default:
        return <ImManWoman className="inline text-gray-500" size={20} />; // "Any"
    }
  };

  return (
    <Card key={event.ekp_id} className="mx-auto w-full shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold">{event.title}</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          <Link
            to="/sports/$sportId"
            params={{ sportId: sportId ?? "" }}
            className="underline"
          >
            {event.sport}
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 pb-2">
        <p className="text-sm">{event.description}</p>
        <p className="text-sm">
          <strong>Дисциплины:</strong>{" "}
          {event.discipline.length > 0
            ? event.discipline.join(", ")
            : "Не указаны"}
        </p>
        <p className="text-sm">
          <strong>Ограничения:</strong>
          <span className="mx-2 inline">{getGenderIcon()}</span>
          {event.age_min !== null && event.age_max !== null
            ? `${event.age_min} - ${event.age_max} лет`
            : "Без ограничений"}
        </p>
        <p className="text-sm">
          <strong>Даты:</strong>{" "}
          {new Date(event.start_date).toLocaleDateString("ru-RU")} -{" "}
          {new Date(event.end_date).toLocaleDateString("ru-RU")}
        </p>
        <p className="text-sm">
          <strong>Участников:</strong>{" "}
          {event.participant_count !== null
            ? `${event.participant_count} чел.`
            : "Не указано"}
        </p>
        <p className="text-sm">
          <strong>Место проведения:</strong>{" "}
          {event.location.map((l, index) => (
            <span key={index}>
              {l.city}, {l.region}, {l.country}
              {index < event.location.length - 1 && ", "}
            </span>
          ))}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button className="w-fit" variant="secondary">
          Подписаться
        </Button>
        <p className="text-xs text-gray-500">№ ЕКП: {event.ekp_id}</p>
      </CardFooter>
    </Card>
  );
}
