import { $api, apiTypes } from "@/api";
import { useMe } from "@/api/me.ts";
import {
  receivePushSubscription,
  sendNotification,
} from "@/api/notifications.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

export function EventSubscribeButton({
  event,
}: {
  event: apiTypes.SchemaEventOutput;
}) {
  const navigate = useNavigate();

  const { data: me } = useMe();
  const { mutate } = $api.useMutation("post", "/notify/");
  const [dialogOpen, setDialogOpen] = useState(false);

  const subscribe = async () => {
    if (!me) {
      navigate({
        to: "/auth/login",
        search: { redirect: window.location.href },
      });
      return;
    }

    const pushSubscription = await receivePushSubscription();
    if (!pushSubscription) {
      setDialogOpen(true);
      return;
    }

    setDialogOpen(false);
    sendNotification();
    mutate({
      body: {
        event_title: event.title,
        notification_options: pushSubscription,
        target_date: event.start_date,
        sent: false,
        user_id: me?.id,
      },
    });
  };

  return (
    <>
      <Button className="w-fit" variant="secondary" onClick={() => subscribe()}>
        Получать уведомления
      </Button>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Нет разрешения на уведомления</DialogTitle>
            <DialogDescription>
              Похоже, что вы не разрешили сайту отправлять вам уведомления.
              Пожалуйста, разрешите уведомления в настройках браузера и
              попробуйте снова.
            </DialogDescription>
            <a
              href="https://yandex.ru/support/common/ru/browsers-settings/notifications"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-blue-500 underline"
            >
              Инструкция для разных браузеров
            </a>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button type="button" variant="default" onClick={() => subscribe()}>
              Проверить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
