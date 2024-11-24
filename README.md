# Единый Календарь Спорта

**Развернутый проект: https://hack.innohassle.ru**

- Видео-презентация: [YouTube](https://youtu.be/YL-bDoUrjOY), [RuTube](https://rutube.ru/video/private/b9e11f2766f89993ddaa108f1a8a7148/?p=tD09_dR3a__N94qwzTMwWA), [Яндекс.Диск](https://disk.yandex.ru/i/18k2LXvQEaJm-Q)
- Видео-демонстрация: [Мини-версия](./мини-демо.mp4)
- Презентация: [PDF в этом репозитории](./Презентация%20Университет%20Иннополис%20one_zero_eight.pdf) или на [Figma Slides](https://www.figma.com/slides/w4Ewmxl75Ts0SdHtxk2dRX/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D1%8F-one_zero_eight-%D0%A3%D0%BD%D0%B8%D0%B2%D0%B5%D1%80%D1%81%D0%B8%D1%82%D0%B5%D1%82-%D0%98%D0%BD%D0%BD%D0%BE%D0%BF%D0%BE%D0%BB%D0%B8%D1%81?node-id=1-539&t=qIXakFIXm2mqjNwM-1)
- Репозиторий: https://github.com/hackathonsrus/pp_50040_pfo_ta_onezeroeight_69

> [!IMPORTANT]
> Для работы уведомлений необходимо разрешить их в браузере.

## Описание

- Наше решение - система поиска и просмотра спортивных мероприятий из Единого календарного плана Минспорта России.
- Целевая аудитория — спортсмены и тренеры, и другие люди, интересующиеся спортом, которые хотят узнавать о предстоящих соревнованиях по интересующему их видам спорта / дисциплинам.
- Интерфейс выполнен в виде веб-приложения, где пользователь может использовать поле поиска или фильтры для поиска мероприятий.
- Также есть возможность просмотра детальной информации о мероприятии или об отдельном виде спорта.
- В качестве фронтенда используется фреймворк React с использованием библиотеки shadcn/ui.
- В качестве бэкенда используется сервер на FastAPI, который обращается к базе данных MongoDB для выдачи данных о мероприятиях, а также обеспечивает аутентификацию пользователей.
- На сервере предварительно загружаются данные из парсера, который берёт данные из pdf-файлов, размещенных на сайте Минспорта России.
- Пользователь также может подписаться на получение уведомлений о предстоящих мероприятиях по интересующему его виду спорта или по конкретному мероприятию, разрешив уведомления в браузере.

## Диаграмма архитектуры

Используется база данных MongoDB для легкого горизонтального масштабирования.

Сервер FastAPI запускается через менеджер процессов Gunicorn, который способен запускать несколько воркеров для обработки запросов, что позволяет обрабатывать большое количество запросов.

Модульная архитектура приложения позволяет легко добавлять новый функционал и улучшать существующий.

![Architecture](./architecture.png)

(1) Парсер парсит PDF-файлы с сайта Минспорта, нормализует данные и (2) загружает в базу данных.
Пользователи, используя веб-интерфейс (3), выбирают интересующие их фильтры.
Браузер делает запрос к API (4), бэкенд получает данные из базы данных, применяя фильтры и сортировки (5) и возвращает результаты пользователю.

## Скриншоты веб-интерфейса

![Screenshot0](./img0.png)
![Screenshot1](./img1.png)
![Screenshot2](./img2.png)

## Инструкция по запуску локально

Протестировано на Ubuntu 22.04 с архитектурой amd64.

1. Установить [Docker и Docker Compose](https://docs.docker.com/engine/install/) последней версии.
2. Склонировать этот репозиторий.
   ```
   git clone https://github.com/hackathonsrus/pp_50040_pfo_ta_onezeroeight_69
   ```
3. Перейти в папку с проектом.
   ```
   cd pp_50040_pfo_ta_onezeroeight_69
   ```
4. Запустить базу данных.
   ```
   docker compose up -d db
   ```
5. Загрузить дамп базы данных.
   ```
   docker compose exec db sh -c 'mongorestore "mongodb://$MONGO_INITDB_ROOT_USERNAME:$MONGO_INITDB_ROOT_PASSWORD@localhost:27017/db?authSource=admin" --drop /dump/db'
   ```
6. Запустить проект.
   ```
   docker compose up -d --build
   ```
7. Зайти на [http://localhost:8000](http://localhost:8000) в браузере.

> [!NOTE]
> При запуске на localhost без https может не работать отправка уведомлений в браузеры.
