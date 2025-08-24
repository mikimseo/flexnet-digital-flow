# FlexNet Digital - PHP 8.4 Version

Версия сайта FlexNet Digital для хостинга с PHP-FPM и PHP 8.4.

## Структура проекта

```
├── index.php              # Главная точка входа
├── assets/                # Статические файлы (CSS, JS, изображения)
│   ├── css/               # Стили
│   └── js/                # JavaScript файлы
├── config/                # Конфигурация
│   ├── config.php         # Основная конфигурация
│   ├── database.php       # Конфигурация БД
│   ├── php.ini            # Настройки PHP
│   └── nginx.conf         # Конфигурация Nginx (если используется)
├── includes/              # PHP компоненты
│   ├── functions.php      # Общие функции
│   ├── header.php         # Заголовок сайта
│   ├── footer.php         # Подвал сайта
│   ├── chat-widget.php    # Виджет чата
│   └── sections/          # Секции сайта
├── pages/                 # Отдельные страницы
├── api/                   # API endpoints
├── database/              # SQL файлы
├── icons/                 # Иконки для PWA
├── manifest.json          # PWA манифест
├── sw.js                  # Service Worker
├── robots.txt             # Robots.txt
├── .htaccess              # Apache конфигурация
└── composer.json          # PHP зависимости
```

## Требования

- PHP 8.4 или выше
- Apache с mod_rewrite или Nginx
- MySQL 8.0 или выше
- Расширения PHP: pdo, pdo_mysql, mbstring, json, curl, openssl

## Установка на хостинг

### 1. Подготовка файлов
Загрузите все файлы в корневую папку вашего хостинга (обычно `public_html` или `www`).

### 2. Настройка базы данных
```sql
-- Создайте базу данных
CREATE DATABASE flexnet_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Импортируйте структуру
SOURCE database/mysql_migration.sql;

-- Импортируйте данные (опционально)
SOURCE public/data-export.sql;
```

### 3. Конфигурация
Отредактируйте `config/config.php`:
```php
define('SITE_URL', 'https://ваш-домен.com');
define('SITE_EMAIL', 'ваш-email@домен.com');
define('SITE_PHONE', 'ваш-телефон');

define('DB_HOST', 'localhost');
define('DB_NAME', 'имя_базы_данных');
define('DB_USER', 'пользователь_бд');
define('DB_PASS', 'пароль_бд');
```

### 4. Права доступа
```bash
chmod 755 assets/
chmod 755 config/
chmod 755 includes/
chmod 644 index.php
chmod 644 .htaccess
```

### 5. SSL сертификат
Убедитесь, что у вас настроен SSL для корректной работы PWA.

## Настройка

### Конфигурация сайта
Отредактируйте `config/config.php`:
- Обновите SITE_URL, SITE_EMAIL, SITE_PHONE
- Настройте параметры базы данных (если нужно)
- Настройте SMTP для отправки писем

### Настройка почты
Для работы формы обратной связи настройте:
- PHP mail() функцию на сервере
- Или интегрируйте SMTP библиотеку (PHPMailer)

## Функциональность

- ✅ Адаптивный дизайн
- ✅ SEO-оптимизация
- ✅ Форма обратной связи
- ✅ ИИ-чат виджет
- ✅ Темная/светлая тема
- ✅ Безопасность (CSRF, валидация)
- ✅ Кеширование статических файлов
- ✅ Мобильная версия

## Безопасность

- CSRF защита для форм
- Валидация пользовательского ввода
- Защита от спама
- Ограничение скорости запросов
- Безопасные заголовки HTTP

## Поддержка

Для вопросов по настройке обращайтесь:
- Email: info@flexnet-digital.com
- Телефон: +7 (999) 123-45-67