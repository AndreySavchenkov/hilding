self.addEventListener("push", function (event) {
  // Проверяем, пришли ли данные в событии
  if (event.data) {
    // Логируем данные в виде строки для просмотра
    console.log("Push event data received:", event.data);

    // Парсим данные из push-уведомления
    const data = event.data.json(); // Парсим данные как JSON

    // Логируем распарсенные данные
    console.log(`data in sw.js ->> ${JSON.stringify(data)}`);

    // Используем данные для показа уведомления
    self.registration.showNotification(data.title, {
      body: data.message,
    });
  } else {
    console.log("Push event but no data");
  }
});
