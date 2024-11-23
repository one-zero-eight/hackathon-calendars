import { $api } from "@/api";
import { useMe } from "@/api/me.ts";
import { sendNotification } from "@/api/notifications.ts";
import { NotificationsDialog } from "@/components/NotificationsDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { createFileRoute } from "@tanstack/react-router";
import { Check, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: me } = useMe();
  const { data: notifications } = $api.useMutation("get", "/notify/");

  const [notificationPermission, setNotificationPermission] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const checkNotificationPermission = async () => {
    if (!("Notification" in window)) {
      setNotificationPermission(false);
    } else {
      setNotificationPermission(Notification.permission === "granted");
    }
  };

  const requestNotificationPermission = async () => {
    const permission = await sendNotification();
    setNotificationPermission(permission);
    return permission;
  };

  useEffect(() => {
    checkNotificationPermission();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4">
      <h1 className="text-2xl font-bold">Профиль - {me?.login}</h1>

      <Card className="flex w-full flex-col gap-2 p-4">
        <div>
          <h2 className="mb-2 text-lg font-semibold">Уведомления</h2>
          <div className="flex items-center gap-2">
            <p>Разрешение:</p>
            {notificationPermission ? (
              <p className="flex flex-row items-center gap-1 text-green-500">
                <Check size={18} />
                <span>есть</span>
              </p>
            ) : (
              <p className="flex flex-row items-center gap-1 text-red-500">
                <CircleX size={18} />
                <span>нет</span>
                <Button
                  size="sm"
                  variant="outline"
                  className="ml-2 text-black"
                  onClick={async () => {
                    if (!(await requestNotificationPermission())) {
                      setDialogOpen(true);
                    }
                  }}
                >
                  Проверить
                </Button>
                <NotificationsDialog
                  open={dialogOpen}
                  setOpen={setDialogOpen}
                  retry={() => requestNotificationPermission()}
                />
              </p>
            )}
          </div>

          {notifications?.length ? (
            notifications?.map((v) => (
              <div key={v.id} className="flex items-center gap-2">
                <p>{v.event_title}</p>
                <p>{v.target_date}</p>
              </div>
            ))
          ) : (
            <div className="text-gray-500">Нет настроенных уведомлений</div>
          )}
        </div>
      </Card>
    </div>
  );
}
