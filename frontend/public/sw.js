self.addEventListener("push", (event) => {
  const data = event.data;
  const pushMessage = data.json();
  console.log(event, pushMessage);
  event.waitUntil(self.registration.showNotification(pushMessage.message));
});
