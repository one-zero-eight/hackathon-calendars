import { $api } from "@/api";
import { SportBadge } from "@/components/SportBadge";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import Marquee from "react-fast-marquee";
import CountUp from "react-countup";
import { plainDatesForFilter } from "@/lib/utils";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Temporal } from "temporal-polyfill";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

const QUICKLINKS = {
  "1-month": {
    date: plainDatesForFilter(
      Temporal.Now.plainDateISO(),
      Temporal.Now.plainDateISO().add({ days: 30 }),
    ),
  },
  "3-months": {
    date: plainDatesForFilter(
      Temporal.Now.plainDateISO(),
      Temporal.Now.plainDateISO().add({ days: 30 * 3 }),
    ),
  },
  "6-months": {
    date: plainDatesForFilter(
      Temporal.Now.plainDateISO(),
      Temporal.Now.plainDateISO().add({ days: 30 * 6 }),
    ),
  },
};

function RouteComponent() {
  const navigate = useNavigate();
  const { data: sports } = $api.useQuery("get", "/sports/");
  const { data: eventsTotal } = $api.useQuery("post", "/events/search/count", {
    body: {},
  });
  const [search, setSearch] = useState("");

  const handleQuicklinkClick = (q: keyof typeof QUICKLINKS) => {
    navigate({
      to: "/search",
      search: {
        filters: QUICKLINKS[q],
      },
    });
  };

  const [sports1, sports2, sports3] = useMemo(() => {
    if (!sports) return [[], [], []];

    const shuffled = sports.slice().sort(() => Math.random() - 0.5);
    const partSize = Math.ceil(sports.length / 3);
    return [
      shuffled.slice(0, partSize),
      shuffled.slice(partSize, partSize * 2),
      shuffled.slice(partSize * 2),
    ];
  }, [sports]);

  return (
    <main className="w-full">
      <section className="flex min-h-[calc(100vh-var(--header-height))] flex-col items-center justify-center">
        <h1 className="mb-4 text-center text-6xl font-medium tracking-tight">
          Единый Календарь Спорта
        </h1>
        <h2 className="text-center text-2xl opacity-80 flex gap-2 items-center">
          {eventsTotal == null ? (
            <Skeleton className="h-8 w-[100px] inline-block" />
          ) : (
            <CountUp end={eventsTotal} duration={3.5} separator=" " suffix=" "></CountUp>
          )}
          <span>спортивных мероприятий из </span>
          <a
            href="https://www.minsport.gov.ru/activity/government-regulation/edinyj-kalendarnyj-plan/"
            target="_blank"
            rel="noreferrer"
            className="underline"
          >
            ЕКП
          </a>
          <span> в одном месте.</span>
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({
              to: "/search",
              search: { filters: { query: search } },
            });
          }}
          className="mt-10 flex w-full max-w-[600px] gap-2"
        >
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Название мероприятия, вид спорта, город..."
            className="max-w-[600px]"
          />
          <Button type="submit" variant="default">
            Найти
          </Button>
        </form>

        <div className="mt-4 flex gap-2">
          <Button
            variant="secondary"
            onClick={() => handleQuicklinkClick("1-month")}
          >
            На ближайший месяц
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleQuicklinkClick("3-months")}
          >
            На 3 месяца
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleQuicklinkClick("6-months")}
          >
            На 6 месяцев
          </Button>
        </div>
      </section>

      <section className="py-4">
        <h2 className="text-center text-2xl font-medium">
          Выбери свой вид спорта
        </h2>
        <div className="my-6 flex flex-col gap-2">
          <Marquee direction="left" speed={20} pauseOnHover>
            {sports1.map((sport) => (
              <SportBadge
                key={sport.id}
                name={sport.sport}
                id={sport.id}
                className="mx-2"
              />
            ))}
          </Marquee>
          <Marquee direction="right" speed={20} pauseOnHover>
            {sports2.map((sport) => (
              <SportBadge
                key={sport.id}
                name={sport.sport}
                id={sport.id}
                className="mx-2"
              />
            ))}
          </Marquee>
          <Marquee direction="left" speed={20} pauseOnHover>
            {sports3.map((sport) => (
              <SportBadge
                key={sport.id}
                name={sport.sport}
                id={sport.id}
                className="mx-2"
              />
            ))}
          </Marquee>
        </div>
        <div className="flex justify-center">
          <Button asChild>
            <Link to="/sports">
              <span>Все виды спорта</span>
              <ChevronRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
