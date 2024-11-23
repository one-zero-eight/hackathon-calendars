import { $api } from "@/api";
import { useMe } from "@/api/me.ts";
import { sendNotification } from "@/api/notifications.ts";
import { NotificationsDialog } from "@/components/NotificationsDialog.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Card } from "@/components/ui/card.tsx";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, Check, CircleX } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: me } = useMe();
  const { data: subscriptions } = $api.useQuery(
    "post",
    "/notify/my-subscriptions",
  );
  const { data: sports } = $api.useQuery("get", "/sports/");

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
          <h2 className="mb-2 text-2xl font-semibold">Уведомления</h2>
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

          <h2 className="mt-2 text-lg font-semibold">Ближайшие уведомления:</h2>
          <div className="flex flex-col gap-2">
            {subscriptions?.length ? (
              subscriptions?.map((v) => (
                <Card
                  key={v.id}
                  className="flex max-w-2xl items-center gap-4 p-2"
                >
                  <div className="flex flex-col items-center gap-2 text-xl font-medium">
                    <Calendar />
                    <div className="flex flex-col">
                      {v.event_dates.slice(0, 3).map((d) => (
                        <div>{new Date(d).toLocaleDateString("ru-RU")}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {v.sport_id ? (
                      <Link
                        to="/sports/$sportId"
                        params={{ sportId: v.sport_id ?? "" }}
                        className="text-xl"
                      >
                        {v.sport_title}
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/sports/$sportId"
                          params={{
                            sportId:
                              sports?.find((s) => s.sport === v.sport_title)
                                ?.id ?? "",
                          }}
                          className="text-gray-500 underline"
                        >
                          {v.sport_title}
                        </Link>
                        <div className="text-xl">{v.event_title}</div>
                      </>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <div className="text-gray-500">Нет настроенных уведомлений</div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
