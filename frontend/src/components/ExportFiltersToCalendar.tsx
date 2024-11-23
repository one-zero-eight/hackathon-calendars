import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Filters } from "@/lib/types.ts";
import { CalendarPlus } from "lucide-react";

export function ExportFiltersToCalendar({ filters }: { filters: Filters }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">
          <CalendarPlus />
          Экспортировать подборку в календарь
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Экспорт в приложение календаря</DialogTitle>
          <DialogDescription>
            Вы можете добавить все события из данной подборки по фильтрам в свой
            календарь (например, Яндекс Календарь, Google Календарь или Apple
            Календарь).
          </DialogDescription>
          <DialogDescription>
            При обновлениях мероприятий в подборке, они также будут обновляться
            в вашем календаре.
          </DialogDescription>
          <DialogDescription>Скопируйте ссылку ниже:</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
