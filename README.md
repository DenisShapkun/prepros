# BUILD CSS FROM SCSS с использованием GULP 4

#### После клонирования запускаем для установки всех пакетов
`$ npm install`

## Содержимое файла `gulpfile.js`:

Задача `browser-sync` для синхронизации с браузером.

Задача `html-reload` включается внутри задачи `watch` для отслеживания изменений в файлах .html для последующей синхронизации с браузером.

Задача `build` компилирует стили из scss в css, сжимает, переименовывает и загружает полученные файлы .min.scss в папку 'assets/scss'.

Задача `watch` отслеживает изменения в указанных файлах и сразу компилирует .min.css после каждого зизменения в `*.scss`, но без использования `'browser-sync'` не будет синхронизации в баузере. Задача `'watch'` используется в задаче `'live'`.

Задача `live` выполняет поочередно задачи `build`, `browser-sync`, `'watch'` и результатом будет запуск в браузере http://localhost:3000/ с синхронизацией и отслеживанием изменений в формате Live Reload.

Задача `default` запускает задачу `build` и результатом будет скомпилированный файл .min.scss в папке 'assets/scss'.

#### Для разработки с использованием Live Reload запускаем для синхронизации браузера с изменениями в коде:

`$ gulp live`

#### Для автоматической компиляции после изменений в файлах без Live Reload запускаем:

`$ gulp watch`

#### Для компиляции, если не использовались предыдущие команды:

`$ gulp build`

или просто

`$ gulp`

И получаем скомпилированные файлы .min.scss в папке 'assets/scss'