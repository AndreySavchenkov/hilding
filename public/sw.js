self.addEventListener("push", function (event) {
  if (event.data) {
    const data = event.data.json();

    self.registration.showNotification(data.title, {
      body: data.message,
    });
  } else {
    console.log("Push event but no data");
  }
});
