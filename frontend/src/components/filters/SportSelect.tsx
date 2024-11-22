"use client";

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
import { FilterBaseProps } from "./common";

export const sports = [
  {
    value: "programming",
    label: "Спортивное программирование",
    disciplines: [
      "Продуктовое программирование",
      "Алгоритмическое программирование",
      "Программирование систем информационной безопасности",
    ],
  },
  {
    value: "football",
    label: "Футбол",
    disciplines: ["Футбол 5x5", "Футбол 7x7", "Футбол 11x11"],
  },
  {
    value: "basketball",
    label: "Баскетбол",
    disciplines: ["Баскетбол 3x3", "Баскетбол 5x5"],
  },
  {
    value: "volleyball",
    label: "Волейбол",
    disciplines: ["Волейбол 3x3", "Волейбол 4x4", "Волейбол 6x6"],
  },
  {
    value: "chess",
    label: "Шахматы",
    disciplines: ["Блиц", "Рапид", "Классика"],
  },
  {
    value: "tennis",
    label: "Теннис",
    disciplines: ["Теннис на корте", "Пляжный теннис"],
  },
  {
    value: "swimming",
    label: "Плавание",
    disciplines: ["Бассейн", "Открытая вода"],
  },
  {
    value: "running",
    label: "Бег",
    disciplines: ["Марафон", "Полумарафон", "10 км", "5 км"],
  },
  {
    value: "cycling",
    label: "Велоспорт",
    disciplines: ["Шоссейный велосипед", "Горный велосипед"],
  },
  {
    value: "gym",
    label: "Фитнес",
    disciplines: ["Кроссфит", "Функциональный тренинг", "Тренажерный зал"],
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
  disabled, 
  value,
  onChange,
}: FilterBaseProps & {
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-1">
      <Label>Вид спорта</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit min-w-[200px] justify-between"
          >
            {value
              ? sports.find((framework) => framework.value === value)?.label
              : "Любой вид спорта"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-fit p-0">
          <Command>
            <CommandInput placeholder="Найдите вид спорта..." />
            <CommandList>
              <CommandEmpty>Ничего не найдено.</CommandEmpty>
              <CommandGroup>
                {sports.map((framework) => (
                  <CommandItem
                    disabled={disabled}
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
    </div>
  );
}
