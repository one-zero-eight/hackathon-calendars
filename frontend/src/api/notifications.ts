export async function sendNotification(
  message: string = "Теперь вы будете получать уведомления об интересующих вас мероприятиях",
) {
  const registration = await navigator.serviceWorker.register("/sw.js");
  const permissionResult = await Notification.requestPermission();

  if (permissionResult !== "granted") {
    return false;
  }

  await registration.showNotification("Спортивные мероприятия", {
    body: message,
  });
  return true;
}

export async function receivePushSubscription() {
  const registration = await navigator.serviceWorker.register("/sw.js");
  const permissionResult = await Notification.requestPermission();

  if (permissionResult !== "granted") {
    return false;
  }

  const existing = await registration.pushManager.getSubscription();
  if (existing) {
    console.log("existing", JSON.stringify(existing));
    return existing;
  }

  const pushSubscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: import.meta.env.VITE_NOTIFY_PUBLIC_KEY,
  });
  console.log("pushSubscription", JSON.stringify(pushSubscription));
  return pushSubscription;
}
