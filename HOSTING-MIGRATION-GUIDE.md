# Инструкция по переносу проекта FlexNet Digital на хостинг с FastPanel

## 1. Подготовка проекта

### Удаленные файлы:
- `.env` - содержал Supabase ключи
- `README-PHP.md` и `README.md` - документация разработки
- Папка `supabase/` - конфигурация Supabase

### Добавленные файлы:
- `database-migration.sql` - SQL для создания MySQL базы
- `config/database.php` - конфигурация подключения к MySQL
- `src/lib/database.ts` - API клиент для работы с MySQL
- `api-examples/` - примеры PHP API файлов

## 2. Перенос на хостинг с FastPanel

### Шаг 1: Создание сайта
1. Войдите в панель FastPanel
2. Создайте новый сайт с доменом
3. Выберите PHP версию 8.0 или выше
4. Включите поддержку MySQL

### Шаг 2: Загрузка файлов
1. Соберите проект локально:
   ```bash
   npm run build
   ```
2. Загрузите содержимое папки `dist/` в корневую папку сайта
3. Загрузите PHP файлы и конфигурацию:
   - `config/database.php` → `/config/database.php`
   - `api-examples/*.php` → `/api/*.php` (переименуйте файлы, убрав "-examples")
   - `.htaccess` → `/.htaccess`

### Шаг 3: Настройка структуры папок
После сборки проекта (`npm run build`) папка `dist/` будет содержать:
```
/dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── [другие ресурсы]
├── manifest.json
├── sw.js
├── pwa-192x192.png
├── pwa-512x512.png
└── robots.txt
```

Загрузите всё содержимое `dist/` в корень сайта, плюс добавьте:
```
/public_html/
├── index.html (из dist/)
├── assets/ (из dist/)
├── manifest.json (из dist/)
├── sw.js (из dist/)
├── *.png (из dist/)
├── robots.txt (из dist/)
├── .htaccess
├── config/
│   └── database.php
└── api/
    ├── menu-items.php
    ├── services.php
    ├── portfolio.php
    ├── reviews.php
    ├── companies.php
    └── messages.php
```

## 3. Настройка базы данных MySQL

### Шаг 1: Создание базы данных
1. В FastPanel перейдите в раздел "Базы данных"
2. Создайте новую MySQL базу данных `flexnet_digital`
3. Создайте пользователя с полными правами к этой БД

### Шаг 2: Импорт структуры
1. Перейдите в phpMyAdmin через FastPanel
2. Выберите созданную базу данных
3. Импортируйте файл `database-migration.sql`

### Шаг 3: Настройка подключения
Отредактируйте файл `/config/database.php`:
```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'flexnet_digital'); // имя вашей БД
define('DB_USER', 'your_username');   // пользователь БД
define('DB_PASS', 'your_password');   // пароль БД
```

## 4. Миграция данных с Supabase

### Экспорт данных из Supabase:
1. Войдите в Supabase Dashboard
2. Перейдите в SQL Editor
3. Экспортируйте данные по таблицам:

```sql
-- Экспорт компаний
SELECT * FROM companies WHERE is_active = true;

-- Экспорт элементов меню
SELECT * FROM menu_items WHERE is_active = true;

-- Экспорт услуг
SELECT * FROM services WHERE is_active = true;

-- Экспорт портфолио
SELECT * FROM portfolio_items WHERE is_active = true;

-- Экспорт отзывов
SELECT * FROM reviews WHERE is_active = true;
```

### Импорт в MySQL:
1. Скопируйте данные из Supabase
2. Вставьте в соответствующие таблицы MySQL через phpMyAdmin
3. Проверьте корректность JSON полей (tags, features, metrics)

## 5. Обновление конфигурации приложения

### Замена Supabase клиента:
1. Удалите импорты Supabase во всех компонентах
2. Замените на импорт нового API клиента:
   ```typescript
   // Вместо
   import { supabase } from '@/integrations/supabase/client';
   
   // Используйте
   import { api } from '@/lib/database';
   ```

### Обновление вызовов API:
```typescript
// Старый код
const { data } = await supabase.from('services').select('*');

// Новый код
const data = await api.getServices();
```

## 6. Создание API endpoints

Создайте недостающие PHP файлы в папке `/api/`:

### portfolio.php:
```php
<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once '../config/database.php';

try {
    $items = getPortfolioItems();
    foreach ($items as &$item) {
        if (isset($item['tags'])) {
            $item['tags'] = json_decode($item['tags'], true) ?: [];
        }
        if (isset($item['metrics'])) {
            $item['metrics'] = json_decode($item['metrics'], true) ?: [];
        }
    }
    echo json_encode($items);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
?>
```

## 7. Тестирование

1. Проверьте доступность сайта по домену
2. Убедитесь, что API endpoints отвечают корректно:
   - `https://yourdomain.com/api/menu-items.php`
   - `https://yourdomain.com/api/services.php`
   - и т.д.
3. Проверьте работу всех разделов сайта
4. Протестируйте мобильную версию и PWA

## 8. SSL и домен

1. В FastPanel включите SSL сертификат
2. Настройте редирект с HTTP на HTTPS
3. Обновите URL в файле `/src/lib/database.ts`

## 9. Резервное копирование

1. Настройте автоматические бэкапы БД в FastPanel
2. Создайте копию файлов сайта
3. Задокументируйте структуру проекта

## Готово!

После выполнения всех шагов ваш сайт будет работать на обычном хостинге с MySQL вместо Supabase.

Не забудьте обновить DNS записи для домена и протестировать все функции сайта.