import { Button } from "@/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { FilterBaseProps } from "./common";

const countries = [
  {
    country: "Россия",
    regions: ["Москва", "Республика Татарстан"],
  },
  {
    country: "Канада",
    regions: ["Торонто", "Ванкувер"],
  },
  {
    country: "США",
    regions: ["Нью-Йорк", "Лос-Анджелес"],
  },
];

export function LocationSelect({
  disabled,
  country,
  region,
  onChange,
}: FilterBaseProps & {
  country: string | null;
  region: string | null;
  onChange: (country: string | null, region: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [regionOpen, setRegionOpen] = useState(false);

  const regions = countries.find((c) => c.country === country)?.regions || [];

  return (
    <div className="flex flex-row flex-wrap gap-2">
      <div className="flex flex-col gap-1">
        <Label>Страна</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-fit min-w-[200px] justify-between"
            >
              {countries.find((v) => v.country === country)?.country || "Любая"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <Command>
              <CommandInput placeholder="Найдите по названию..." />
              <CommandList>
                <CommandEmpty>Ничего не найдено.</CommandEmpty>
                <CommandGroup>
                  {countries.map((c) => (
                    <CommandItem
                      disabled={disabled}
                      key={c.country}
                      value={c.country}
                      onSelect={(currentValue) => {
                        onChange(currentValue, null);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          country === c.country ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {c.country}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-col gap-1">
        <Label>Регион</Label>
        <Popover open={regionOpen} onOpenChange={setRegionOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={disabled}
              variant="outline"
              role="combobox"
              aria-expanded={regionOpen}
              className="w-fit min-w-[200px] justify-between"
            >
              {regions.find((v) => v === region) || "Любой"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0">
            <Command>
              <CommandInput placeholder="Найдите по названию..." />
              <CommandList>
                <CommandEmpty>Ничего не найдено.</CommandEmpty>
                <CommandGroup>
                  {regions.map((r) => (
                    <CommandItem
                      disabled={disabled}
                      key={r}
                      value={r}
                      onSelect={(currentValue) => {
                        onChange(country, currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          region === r ? "opacity-100" : "opacity-0",
                        )}
                      />
                      {r}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
