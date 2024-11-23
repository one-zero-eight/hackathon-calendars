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
import { Share2 } from "lucide-react";

export function GetUrlToFilters({ filters }: { filters: Filters }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button className="w-full">
          <Share2 />
          Поделиться подборкой
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Отправьте ссылку на текущую подборку</DialogTitle>
          <DialogDescription>
            Чтобы поделиться подборкой с кем-то, отправьте ему ссылку на неё.
          </DialogDescription>
          <DialogDescription>Скопируйте ссылку ниже:</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
