import { $api } from "@/api";
import { ExportSportToCalendar } from "@/components/ExportSportToCalendar.tsx";
import { Button } from "@/components/ui/button.tsx";
import { cn } from "@/lib/utils.ts";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import SportSVG from "./sport.svg";
import { Separator } from "@/components/ui/separator";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/sports/$sportId")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { sportId } = Route.useParams();
  const { data: sport, isLoading } = $api.useQuery("get", "/sports/{id}", {
    params: { path: { id: sportId } },
  });

  const avatarUrl = sport
    ? `/api/static/${sport.sport.toLocaleLowerCase().replace(" ", "_")}.png`
    : null;

  const handleDisciplineSelect = (d: string) => {
    if (sport) {
      navigate({
        to: "/search",
        search: {
          filters: {
            discipline: [{ sport: sport.sport, discipline: d }],
          },
        },
        replace: false,
      });
    }
  };

  return (
    <div className="mx-auto mt-6 flex w-full max-w-[960px] flex-col">
      <div className="flex flex-col gap-4 rounded-lg border px-8 py-4">
        <div className="flex items-center gap-6">
          <div className="h-[128px] w-[128px] flex-shrink-0 flex-grow-0 overflow-hidden rounded-full">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <img
                src={avatarUrl ?? ""}
                onError={(e) => {
                  if (avatarUrl) {
                    // @ts-ignore
                    e.target.src = SportSVG;
                  }
                }}
                className={cn(
                  "h-full w-full bg-black",
                  !avatarUrl && "invisible",
                )}
              />
            )}
          </div>
          <div className="flex flex-grow flex-col">
            {isLoading ? (
              <>
                <Skeleton className="mb-3 h-10 w-[150px]" />
                <Skeleton className="h-12 w-full" />
              </>
            ) : (
              <>
                <h1 className="mb-1 text-3xl font-medium">{sport?.sport}</h1>
                <p>{sport?.description}</p>
              </>
            )}
          </div>
        </div>
        <Separator />
        <div className="flex items-stretch">
          {isLoading ? (
            <Skeleton className="w-[225px]" />
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-fit justify-between"
                >
                  <span>{`События по ${sport?.disciplines.length || ""} дисциплинам`}</span>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput
                    placeholder="Поиск дисциплины.."
                    className="h-9"
                  />
                  <CommandList>
                    <CommandGroup>
                      {sport?.disciplines.map((discipline, i) => {
                        return (
                          <CommandItem
                            key={i}
                            value={discipline}
                            onSelect={handleDisciplineSelect}
                          >
                            <span>{discipline}</span>
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          )}

          <ExportSportToCalendar sportId={sportId} className="ml-auto w-fit" />
        </div>
      </div>
    </div>
  );
}
