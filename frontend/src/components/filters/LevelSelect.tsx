import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { FilterBaseProps } from "./common";

export const levels = [
  "Международный",
  "Всероссийский",
  "Региональный",
  "Городской",
];
export type Level = (typeof levels)[number];

export function LevelSelect({
  disabled,
  value,
  onChange,
}: FilterBaseProps & {
  value: Level | null;
  onChange: (value: Level | null) => void;
}) {
  return (
    <div className="flex w-fit flex-col gap-1">
      <Label>Уровень соревнований</Label>
      <Select
        disabled={disabled}
        value={value || ""}
        onValueChange={onChange || null}
      >
        <SelectTrigger className="w-fit min-w-[180px]">
          <SelectValue placeholder="Любой" />
        </SelectTrigger>
        <SelectContent>
          {levels.map((v) => (
            <SelectItem key={v} value={v}>
              {v}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
