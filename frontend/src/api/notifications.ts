export async function sendNotification() {
  const registration = await navigator.serviceWorker.register("/sw.js");
  const permissionResult = await Notification.requestPermission();

  if (permissionResult !== "granted") {
    return false;
  }

  await registration.showNotification("Спортивные мероприятия", {
    body: "Теперь вы будете получать уведомления об интересующих вас мероприятиях",
  });
  return true;
}

export async function receivePushSubscription() {
  const registration = await navigator.serviceWorker.register("/sw.js");
  const permissionResult = await Notification.requestPermission();

  if (permissionResult !== "granted") {
    return false;
  }

  const pushSubscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: import.meta.env.VITE_NOTIFY_PUBLIC_KEY,
  });
  console.log("pushSubscription", JSON.stringify(pushSubscription));
  return pushSubscription;
}
