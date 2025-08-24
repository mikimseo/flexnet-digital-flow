# FlexNet Digital - React Website

Современный веб-сайт FlexNet Digital, созданный с использованием React, TypeScript, Tailwind CSS и Supabase.

## 🚀 Технологии

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS с темной/светлой темой
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **UI Components**: Radix UI + shadcn/ui
- **Роутинг**: React Router DOM
- **Формы**: React Hook Form + Zod
- **Анимации**: Tailwind CSS Animate

## 📦 Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки
npm run dev

# Сборка для продакшена
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 🔧 Настройка окружения

1. Создайте файл `.env` в корне проекта:
```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

2. Настройте Supabase проект с необходимыми таблицами

## 🌐 Деплой на FastPanel

### Подготовка к деплою

1. **Сборка проекта**:
```bash
npm run build
```

2. **Настройка домена в FastPanel**:
   - Зайдите в панель управления FastPanel
   - Добавьте домен в разделе "Домены"
   - Настройте DNS записи у регистратора

### Загрузка файлов

1. **Загрузите содержимое папки `dist/`** в корневую папку сайта (`public_html/`):
   ```
   /public_html/
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

2. **Создайте файл `.htaccess`** в корне сайта:
```apache
RewriteEngine On

# Handle Angular and other front-end routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Security headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Caching
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### Настройка Supabase

1. **В Supabase Dashboard**:
   - Добавьте ваш домен в "Authentication > URL Configuration"
   - Добавьте ваш домен в "Site URL" и "Redirect URLs"

2. **Обновите переменные окружения** в настройках хостинга или в коде:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
   - `VITE_SUPABASE_PROJECT_ID`

### SSL сертификат

FastPanel автоматически настроит SSL сертификат от Let's Encrypt для вашего домена.

## 📱 Особенности

- **PWA**: Поддержка Progressive Web App
- **Адаптивный дизайн**: Полностью адаптивный интерфейс
- **Dark/Light тема**: Автоматическое переключение тем
- **SEO оптимизация**: Мета-теги и структурированные данные
- **Админ панель**: Управление контентом через Supabase
- **Чат виджет**: Интегрированный чат для связи с клиентами

## 🔒 Безопасность

- Row Level Security (RLS) в Supabase
- CSRF защита
- XSS защита
- Валидация форм с Zod

## 📞 Поддержка

Если возникли вопросы по настройке или деплою, обратитесь к документации FastPanel или в службу поддержки.

---

**FlexNet Digital** - Создаем цифровые решения для вашего бизнеса