import { Button } from "@/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { FilterBaseProps } from "./common";
import { $api } from "@/api";
import { BaseFilter } from "./BaseFilter";
import { Filters } from "@/lib/types";
import { useMemo, useState } from "react";
import { Badge } from "../ui/badge";
import { useDebounce } from "react-use";
import { cn } from "@/lib/utils";

type FlatLocation = {
  t: "country" | "region" | "city";
  name: string;
  filter: LocationFilterItem;
};

type LocationFilterItem = Exclude<
  Filters["location"],
  null | undefined
>[number];

const filterItemToFlat = (i: LocationFilterItem): FlatLocation => {
  return {
    t: i.city ? "city" : i.region ? "region" : "country",
    name: filterName(i),
    filter: i,
  };
};

const LocBadge = ({ t }: { t: FlatLocation["t"] }) => {
  return (
    <Badge variant="outline" className="ml-auto mr-2">
      {t === "city" ? "Город" : t === "country" ? "Страна" : "Регион"}
    </Badge>
  );
};

const joinName = (parts: (string | undefined | null)[]) =>
  parts.filter(Boolean).join(", ");

const filterName = (i: LocationFilterItem) => {
  if (i.country === 'Россия' && (i.city || i.region))
    return joinName([i.region, i.city]) 
  return joinName([i.country, i.region, i.city])
}

const compItems = (a: LocationFilterItem, b: LocationFilterItem) =>
  a.country === b.country && a.region === b.region && a.city === b.city;

export function LocationFilter(props: FilterBaseProps<Filters["location"]>) {
  const { disabled, value: valueRaw, onChange, ...rest } = props;

  const value = valueRaw ?? [];

  const { data } = $api.useQuery("get", "/events/search/filters/locations");

  const selected = useMemo<FlatLocation[]>(
    () => value.map(filterItemToFlat),
    [value],
  );
  const all = useMemo<FlatLocation[]>(() => {
    const flat = [] as FlatLocation[];
    for (const x of data ?? []) {
      const filter = { country: x.country }
      flat.push({
        name: filterName(filter),
        t: "country",
        filter,
      });
      for (const y of x.regions) {
        const filter = { country: x.country, region: y.region }
        flat.push({
          name: filterName(filter),
          t: "region",
          filter,
        });
        for (const z of y.cities) {
          const filter = { country: x.country, region: y.region, city: z }
          flat.push({
            name: filterName(filter),
            t: "city",
            filter,
          });
        }
      }
    }
    return flat;
  }, [data]);

  const [q, setQ] = useState("");
  const [qDeb, setQDeb] = useState(q);
  useDebounce(
    () => {
      setQDeb(q);
    },
    500,
    [q],
  );

  const filtered = useMemo(
    () =>
      all
        .filter(({ name }) => name.toLowerCase().includes(qDeb.toLowerCase()))
        .map((x) => ({
          ...x,
          selected: selected.some((s) => s.name === x.name),
        })),
    [qDeb, all, selected],
  );

  const handleSelect = (l: LocationFilterItem) => {
    if (value.find((x) => compItems(x, l)))
      onChange(value.filter((x) => !compItems(x, l)));
    else onChange([...value, l]);
  };

  const label = value.length === 0
    ? 'Любое'
    : value.length === 1
      ? filterName(value[0])
      : `${value.length} локаций`

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
            {label}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command shouldFilter={false}>
            <CommandInput
              placeholder="Страна, регион, город..."
              className="h-9"
              value={q}
              onValueChange={(v) => setQ(v.trim())}
            />
            <CommandList>
              <CommandEmpty>Ничего не найдено</CommandEmpty>
              {filtered.map(({ t, name, filter, selected }) => (
                <CommandItem key={name} onSelect={() => handleSelect(filter)}>
                  <span>{name}</span>
                  <LocBadge t={t} />
                  <Check
                    className={cn(
                      "ml-2 h-4 w-4",
                      selected ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="flex flex-col gap-2">
        {selected.map(({ t, name, filter }) => (
          <div key={name} className="flex items-center bg-blue-50 p-2 pl-4 rounded">
            <span className="text-sm mr-2">{name}</span>
            <LocBadge t={t} />
            <Button
              variant="outline"
              size="icon"
              className="flex-shrink-0"
              onClick={() => handleSelect(filter)}
            >
              <X />
            </Button>
          </div>
        ))}
      </div>
    </BaseFilter>
  );
}