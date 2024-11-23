self.addEventListener("push", (event) => {
  const data = event.data;
  const pushMessage = data.json();
  event.waitUntil(self.registration.showNotification(pushMessage.message));
});
