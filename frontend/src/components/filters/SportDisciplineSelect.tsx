"use client";

import { sports } from "@/components/filters/SportSelect.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";

import { cn } from "@/lib/utils.ts";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

export function SportDisciplineSelect({
  sport,
  value,
  onChange,
}: {
  sport: string | null;
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  const [open, setOpen] = React.useState(false);

  if (!sport) return null;

  const disciplines = sports.find((s) => s.value === sport)?.disciplines || [];

  if (!disciplines.length) return null;

  return (
    <div className="flex flex-col gap-1">
      <Label>Дисциплина</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit min-w-[200px] justify-between"
          >
            {disciplines.find((v) => v === value) || "Любая"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command>
            <CommandInput placeholder="Найдите по названию..." />
            <CommandList>
              <CommandEmpty>Ничего не найдено.</CommandEmpty>
              <CommandGroup>
                {disciplines.map((d) => (
                  <CommandItem
                    key={d}
                    value={d}
                    onSelect={(currentValue) => {
                      onChange(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === d ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {d}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
