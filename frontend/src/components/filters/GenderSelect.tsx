import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import { cn } from "@/lib/utils.ts";

export type Gender = "male" | "female";

export function GenderSelect({
  value,
  onChange,
}: {
  value: Gender | null;
  onChange: (value: Gender | null) => void;
}) {
  return (
    <div className="flex w-fit flex-col gap-1">
      <Label>Пол участников</Label>
      <div className="flex">
        <Button
          variant="outline"
          className={cn(
            "rounded-r-none border-r-0",
            value === null &&
              "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          )}
          onClick={() => onChange(null)}
        >
          любой
        </Button>
        <Button
          variant="outline"
          className={cn(
            "rounded-none",
            value === "male" &&
              "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          )}
          onClick={() => onChange("male")}
        >
          муж
        </Button>
        <Button
          variant="outline"
          className={cn(
            "rounded-l-none border-l-0",
            value === "female" &&
              "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          )}
          onClick={() => onChange("female")}
        >
          жен
        </Button>
      </div>
    </div>
  );
}
