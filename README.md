# NIVERA Residences

Премиальный демонстрационный сайт недвижимости, созданный для портфолио **NEIVUM WEB**.

Проект полностью вымышленный: он не продаёт реальные объекты и не хранит данные из форм.

![NIVERA Residences preview](public/media/og-nivera.jpg)

## Что входит

- адаптивная главная страница;
- интерактивный выбор трёх резиденций;
- концептуальные планировки;
- коммерческие формы заявки;
- отдельная страница case study;
- локальные оптимизированные изображения;
- метаданные, Open Graph и manifest;
- автоматическая публикация на GitHub Pages.

## Публикация на GitHub Pages без командной строки

1. Создайте на GitHub новый публичный репозиторий, например `nivera-residences`.
2. Загрузите **содержимое** этой папки в корень репозитория. Файл `package.json` должен быть виден сразу на главной странице репозитория.
3. Откройте `Settings` → `Pages`.
4. В разделе `Build and deployment` выберите `Source: GitHub Actions`.
5. Откройте вкладку `Actions` и дождитесь завершения процесса `Deploy NIVERA to GitHub Pages`.
6. Готовый адрес появится внутри завершённого запуска и в `Settings` → `Pages`.

После дальнейших изменений достаточно загрузить изменённые файлы в ветку `main`: сайт обновится автоматически.

## Локальная разработка

Требуется Node.js 22+.

```bash
npm ci
npm run dev
```

Обычная сборка проекта:

```bash
npm run build
```

Статическая сборка для GitHub Pages запускается автоматически через `.github/workflows/deploy-pages.yml`.

## Важное уведомление

Fictional real-estate concept created for portfolio demonstration. No properties are offered for sale.

Interactive concept by [NEIVUM WEB](https://t.me/neivumweb).
