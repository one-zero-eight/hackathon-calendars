"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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

import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

const sports = [
  {
    value: "programming",
    label: "Спортивное программирование",
  },
  {
    value: "football",
    label: "Футбол",
  },
  {
    value: "basketball",
    label: "Баскетбол",
  },
  {
    value: "volleyball",
    label: "Волейбол",
  },
  {
    value: "chess",
    label: "Шахматы",
  },
  {
    value: "tennis",
    label: "Теннис",
  },
  {
    value: "swimming",
    label: "Плавание",
  },
  {
    value: "running",
    label: "Бег",
  },
  {
    value: "cycling",
    label: "Велоспорт",
  },
  {
    value: "gym",
    label: "Фитнес",
  },
  {
    value: "yoga",
    label: "Йога",
  },
  {
    value: "pilates",
    label: "Пилатес",
  },
  {
    value: "dance",
    label: "Танцы",
  },
  {
    value: "boxing",
    label: "Бокс",
  },
  {
    value: "mma",
    label: "MMA",
  },
  {
    value: "karate",
    label: "Карате",
  },
  {
    value: "taekwondo",
    label: "Тхэквондо",
  },
  {
    value: "judo",
    label: "Дзюдо",
  },
  {
    value: "aikido",
    label: "Айкидо",
  },
  {
    value: "kendo",
    label: "Кэндо",
  },
  {
    value: "archery",
    label: "Стрельба из лука",
  },
  {
    value: "fencing",
    label: "Фехтование",
  },
  {
    value: "golf",
    label: "Гольф",
  },
  {
    value: "hockey",
    label: "Хоккей",
  },
  {
    value: "skating",
    label: "Коньки",
  },
  {
    value: "skiing",
    label: "Лыжи",
  },
];

export function SportSelect({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? sports.find((framework) => framework.value === value)?.label
            : "Любой вид спорта"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Найдите вид спорта..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {sports.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
