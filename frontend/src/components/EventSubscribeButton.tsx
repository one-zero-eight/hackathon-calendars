import { $api, apiTypes } from "@/api";
import { useMe } from "@/api/me.ts";
import {
  receivePushSubscription,
  sendNotification,
} from "@/api/notifications.ts";
import { NotificationsDialog } from "@/components/NotificationsDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
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
        search: { redirectTo: window.location.href },
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
      <Button
        className="h-7 w-fit rounded-md px-2"
        variant="secondary"
        onClick={() => subscribe()}
      >
        Получать уведомления
      </Button>

      <NotificationsDialog
        open={dialogOpen}
        setOpen={setDialogOpen}
        retry={() => subscribe()}
      />
    </>
  );
}
