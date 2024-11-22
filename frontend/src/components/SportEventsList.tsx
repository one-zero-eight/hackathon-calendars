import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

type SportEvent = {
  title: string;
  description: string | null;
  location: string | null;
  startDate: string; // ISO
  endDate: string; // ISO
};

const sports: SportEvent[] = [
  {
    title: "Чемпионат Республики Татарстан по боксу",
    description: null,
    location: "Казань, Дворец спорта",
    startDate: "2022-10-15T12:00:00Z",
    endDate: "2022-10-15T18:00:00Z",
  },
  {
    title: "Чемпионат России по фехтованию",
    description: null,
    location: "Москва, ЦСКА",
    startDate: "2022-11-01T12:00:00Z",
    endDate: "2022-11-01T18:00:00Z",
  },
  {
    title: "Чемпионат мира по гольфу",
    description: null,
    location: "США, Августа",
    startDate: "2022-12-01T12:00:00Z",
    endDate: "2022-12-01T18:00:00Z",
  },
  {
    title: "Чемпионат Европы по хоккею",
    description: null,
    location: "Швейцария, Цюрих",
    startDate: "2023-01-01T12:00:00Z",
    endDate: "2023-01-01T18:00:00Z",
  },
  {
    title: "Чемпионат мира по конькам",
    description: null,
    location: "Канада, Торонто",
    startDate: "2023-02-01T12:00:00Z",
    endDate: "2023-02-01T18:00:00Z",
  },
  {
    title: "Чемпионат мира по лыжам",
    description: null,
    location: "Швеция, Стокгольм",
    startDate: "2023-03-01T12:00:00Z",
    endDate: "2023-03-01T18:00:00Z",
  },
  {
    title: "Чемпионат мира по стрельбе из лука",
    description: null,
    location: "Италия, Рим",
    startDate: "2023-04-01T12:00:00Z",
    endDate: "2023-04-01T18:00:00Z",
  },
  {
    title: "Чемпионат мира по айкидо",
    description: null,
    location: "Япония, Токио",
    startDate: "2023-05-01T12:00:00Z",
    endDate: "2023-05-01T18:00:00Z",
  },
  {
    title: "Чемпионат мира по дзюдо",
    description: null,
    location: "Франция, Париж",
    startDate: "2023-06-01T12:00:00Z",
    endDate: "2023-06-01T18:00:00Z",
  },
  {
    title: "Чемпионат мира по тхэквондо",
    description: null,
    location: "Южная Корея, Сеул",
    startDate: "2023-07-01T12:00:00Z",
    endDate: "2023-07-01T18:00:00Z",
  },
  {
    title: "Чемпионат мира по карате",
    description: null,
    location: "Япония, Осака",
    startDate: "2023-08-01T12:00:00Z",
    endDate: "2023-08-01T18:00:00Z",
  },
  {
    title: "Чемпионат мира по MMA",
    description: null,
    location: "США, Лас-Вегас",
    startDate: "2023-09-01T12:00:00Z",
    endDate: "2023-09-01T18:00:00Z",
  },
];

export function SportEventsList() {
  return (
    <div className="flex flex-col gap-2">
      {sports.map((sport) => (
        <Card key={sport.title}>
          <CardHeader>
            <CardTitle>{sport.title}</CardTitle>
            <CardDescription>{sport.location}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              {new Date(sport.startDate).toLocaleDateString("ru-RU")} -{" "}
              {new Date(sport.endDate).toLocaleDateString("ru-RU")}
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
