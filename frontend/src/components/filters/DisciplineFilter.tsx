import { Filters } from "@/lib/types";
import { FilterBaseProps } from "./common";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { $api } from "@/api";
import { useMemo } from "react";
import { BaseFilter } from "./BaseFilter";

export function DisciplineFilter(
  props: FilterBaseProps<Filters["discipline"]>,
) {
  const { disabled, value: valueRaw, onChange, ...rest } = props;

  const value = valueRaw ?? [];

  const { data: disciplines } = $api.useQuery(
    "get",
    "/events/search/filters/disciplines",
  );
  const someSelected = !!value?.length;

  const disciplinesBySport = useMemo(
    () =>
      new Map(
        (disciplines ?? []).map(({ sport, disciplines }) => [
          sport,
          disciplines,
        ]),
      ),
    [disciplines],
  );

  const sportSelected = (sport: string): boolean => {
    let selectedDisciplinesTotal = 0;
    for (const selected of value ?? []) {
      if (selected.sport !== sport) continue;
      if (!selected.discipline) return true;
      selectedDisciplinesTotal++;
    }
    return (
      selectedDisciplinesTotal >= (disciplinesBySport.get(sport)?.length ?? 0)
    );
  };

  const disciplineSelected = (sport: string, discipline: string): boolean =>
    (value ?? []).some(
      ({ sport: s, discipline: d }) => sport === s && (!d || d === discipline),
    );

  const handleToggle = (sport: string, discipline?: string) => {
    if (!discipline) {
      onChange([
        ...value.filter((x) => x.sport !== sport),
        ...(sportSelected(sport) ? [] : [{ sport }]),
      ]);
    } else {
      const idx = value.findIndex(
        (x) => x.sport === sport && x.discipline === discipline,
      );
      onChange(
        idx >= 0
          ? [...value.slice(0, idx), ...value.slice(idx + 1)]
          : sportSelected(sport)
            ? // Whole sport was selected, but now need to exclude this discipline.
              [
                ...value.filter((x) => x.sport !== sport),
                ...(disciplines
                  ?.find((x) => x.sport === sport)
                  ?.disciplines.filter((d) => d !== discipline)
                  .map((d) => ({ sport, discipline: d })) ?? []),
              ]
            : [...value, { sport, discipline }],
      );
    }
  };

  return (
    <BaseFilter {...rest}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            className="justify-between"
          >
            {someSelected ? value.length : "Любой спорт"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput placeholder="Поиск дисциплины..." className="h-9" />
            <CommandList>
              <CommandEmpty>Ничего не найдено</CommandEmpty>
              {disciplines &&
                disciplines.map(({ sport, disciplines }) => (
                  <CommandGroup key={sport} heading={sport}>
                    <CommandItem
                      value={`${sport}`}
                      onSelect={() => handleToggle(sport)}
                    >
                      {"Все дисциплины"}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          sportSelected(sport) ? "opacity-100" : "opacity-0",
                        )}
                      />
                    </CommandItem>
                    {disciplines.map((discipline) => (
                      <CommandItem
                        key={discipline}
                        value={`${sport}::${discipline}`}
                        onSelect={() => handleToggle(sport, discipline)}
                      >
                        {discipline}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            disciplineSelected(sport, discipline)
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </BaseFilter>
  );
}
