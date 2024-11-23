import { ExportSportToCalendarDialog } from "@/components/ExportSportToCalendarDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { CalendarPlus } from "lucide-react";
import { useState } from "react";

export function ExportSportToCalendar({ sportId }: { sportId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button className="w-full" onClick={() => setOpen(true)}>
        <CalendarPlus />
        Экспортировать мероприятия в календарь
      </Button>
      <ExportSportToCalendarDialog
        open={open}
        setOpen={setOpen}
        sportId={sportId}
      />
    </>
  );
}
