import { Button } from "@/components/ui/button.tsx";
import { Calendar } from "@/components/ui/calendar.tsx";
import { Label } from "@/components/ui/label.tsx";
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

export function DatesFilter({
  dateRange,
  onChange,
}: {
  dateRange: DateRange | undefined;
  onChange: (v: DateRange | undefined) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label>Даты проведения</Label>
      <div className="grid gap-2">
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
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={onChange}
              numberOfMonths={2}
              locale={ru}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
