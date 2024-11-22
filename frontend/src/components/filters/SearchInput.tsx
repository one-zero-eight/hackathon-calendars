import { Input } from "@/components/ui/input.tsx";

export function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <Input
      className="rounded-md border border-gray-300 px-2 py-1"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Найдите мероприятие..."
    />
  );
}
