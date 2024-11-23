import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Temporal } from "temporal-polyfill";
import { Filters, Location } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const joinName = (parts: (string | undefined | null)[]) =>
  parts.filter(Boolean).join(", ");

export const locationText = ({ country, city, region }: Location) => {
  if (country === "Россия" && (city || region)) return joinName([region, city]);
  return joinName([country, region, city]);
};

export const infoForDateRange = (
  a: Temporal.PlainDate | string,
  b: Temporal.PlainDate | string,
): {
  start: Temporal.PlainDate;
  end: Temporal.PlainDate;
  daysTillStart: number;
  daysTillEnd: number;
  time: "past" | "present" | "future";
  label: string;
} => {
  const today = Temporal.Now.plainDateISO();
  try {
    const start =
      a instanceof Temporal.PlainDate ? a : Temporal.PlainDate.from(a);
    const end =
      b instanceof Temporal.PlainDate ? b : Temporal.PlainDate.from(b);
    const daysTillStart = today.until(start).total({ unit: "days" });
    const daysTillEnd = today.until(end).total({ unit: "days" });
    const time =
      daysTillEnd < 0 ? "past" : daysTillStart > 0 ? "future" : "present";
    return {
      start,
      end,
      daysTillStart,
      daysTillEnd,
      time,
      label:
        time === "present"
          ? pluralize(
              daysTillEnd,
              `ещё ${daysTillEnd} день`,
              `ещё ${daysTillEnd} дня`,
              `ещё ${daysTillEnd} дней`,
            )
          : time === "future"
            ? pluralize(
                daysTillStart,
                `до начала ${daysTillStart} день`,
                `до начала ${daysTillStart} дня`,
                `до начала ${daysTillStart} дней`,
              )
            : pluralize(
                -daysTillEnd,
                `${-daysTillEnd} день назад`,
                `${-daysTillEnd} дня назад`,
                `${-daysTillEnd} дней назад`,
              ),
    };
  } catch (err) {
    console.error(err);
    return {
      start: today,
      end: today,
      daysTillStart: 0,
      daysTillEnd: 0,
      time: "past",
      label: "—",
    };
  }
};

export const plainDatesForFilter = (
  from: Temporal.PlainDate | null,
  to: Temporal.PlainDate | null,
): Filters["date"] => {
  const out: Filters["date"] = {};
  if (from) {
    out.start_date = from.toPlainDateTime("00:00:00").toString();
  }
  if (to) {
    out.end_date = to.toPlainDateTime("23:59:59").toString();
  }
  return out;
};

export function pluralize<T>(n: number, one: T, few: T, many: T): T {
  if (n % 10 === 1 && n % 100 !== 11) return one;
  if (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) return few;
  return many;
}
