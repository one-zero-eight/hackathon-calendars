import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";

export function ParticipantsCountFilter({
  start,
  end,
  onChange,
}: {
  start: number | null;
  end: number | null;
  onChange: (start: number | null, end: number | null) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label>Количество участников</Label>
      <div className="flex items-center gap-2">
        от
        <Input
          type="number"
          min={0}
          value={start ?? ""}
          onChange={(e) =>
            onChange(e.target.value ? Number(e.target.value) : null, end)
          }
          className="w-fit max-w-[90px]"
        />
        до
        <Input
          type="number"
          min={0}
          value={end ?? ""}
          onChange={(e) =>
            onChange(start, e.target.value ? Number(e.target.value) : null)
          }
          className="w-fit max-w-[90px]"
        />
      </div>
    </div>
  );
}
