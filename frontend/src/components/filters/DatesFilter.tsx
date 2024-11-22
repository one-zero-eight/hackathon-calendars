import { Button } from "@/components/ui/button.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";

import { cn } from "@/lib/utils.ts";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { FilterBaseProps } from "./common";
import { Filters } from "@/lib/types";
import { BaseFilter } from "./BaseFilter";

export function DatesFilter(props: FilterBaseProps<Filters["date"]>) {
  const { disabled, value, onChange, ...rest } = props;

  const dateRange: DateRange | null = value ? {
    from: value?.start_date ? new Date(value.start_date) : new Date(),
    to: value?.end_date ? new Date(value.end_date) : undefined,
  } : null

  return (
    <BaseFilter {...rest}>
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-fit min-w-[300px] justify-start text-left font-normal",
                !dateRange && "text-muted-foreground",
              )}
            >
              <CalendarIcon />
              {dateRange?.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "dd.MM.yyyy", { locale: ru })} -{" "}
                    {format(dateRange.to, "dd.MM.yyyy", { locale: ru })}
                  </>
                ) : (
                  <>
                    После {format(dateRange.from, "dd.MM.yyyy", { locale: ru })}
                  </>
                )
              ) : (
                <span>Выберите даты</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              disabled={disabled}
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange ?? undefined}
              onSelect={(range) => {
                onChange(
                  range
                    ? {
                        start_date: range.from
                          ? encodeDate(range.from)
                          : undefined,
                        end_date: range.to ? encodeDate(range.to) : undefined,
                      }
                    : null,
                );
              }}
              numberOfMonths={2}
              locale={ru}
            />
          </PopoverContent>
        </Popover>
      </div>
    </BaseFilter>
  );
}

// Returns date in format "YYYY-MM-DD".
function encodeDate(d: Date): string {
  return d.toISOString().split("T")[0];
}
