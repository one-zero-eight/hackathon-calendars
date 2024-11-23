import { $api } from "@/api";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: sports } = $api.useQuery("get", "/sports/");
  const [search, setSearch] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({
      to: "/search",
      search: { filters: { query: search } },
    });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <form onSubmit={onSubmit}>
        <div className="flex h-[50vh] flex-col items-center justify-center gap-6">
          <h2 className="text-center text-4xl">
            Найди любое спортивное мероприятие!
          </h2>
          <div className="flex w-full max-w-[600px] gap-2">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Поиск"
              className="max-w-[600px]"
            />
            <Button type="submit" variant="default">
              Найти
            </Button>
          </div>

          <div className="flex w-full max-w-[600px] flex-wrap justify-center gap-2">
            {/* TODO: Add search query */}
            <Button asChild type="button" variant="secondary">
              <Link
                to="/search"
                search={{
                  filters: {
                    date: {
                      start_date: new Date().toISOString(),
                      end_date: new Date(
                        new Date().getTime() + 1000 * 60 * 60 * 24 * 30, // 30 days
                      ).toISOString(),
                    },
                  },
                }}
              >
                На ближайший месяц
              </Link>
            </Button>
            <Button asChild type="button" variant="secondary">
              <Link
                to="/search"
                search={{
                  filters: {
                    date: {
                      start_date: new Date().toISOString(),
                      end_date: new Date(
                        new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 3, // 90 days
                      ).toISOString(),
                    },
                  },
                }}
              >
                На 3 месяца
              </Link>
            </Button>
            <Button asChild type="button" variant="secondary">
              <Link
                to="/search"
                search={{
                  filters: {
                    date: {
                      start_date: new Date().toISOString(),
                      end_date: new Date(
                        new Date().getTime() + 1000 * 60 * 60 * 24 * 30 * 6, // 180 days
                      ).toISOString(),
                    },
                  },
                }}
              >
                На полгода
              </Link>
            </Button>
          </div>
        </div>
      </form>

      <h2 className="text-center text-2xl">Выбери свой вид спорта</h2>
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
