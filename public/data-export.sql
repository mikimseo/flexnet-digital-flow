-- Data Export from Supabase to MySQL
-- FlexNet Digital Project
-- Generated: 2025-08-24

-- Export Services Data
INSERT INTO services (id, title, description, icon, slug, price, features, is_active, display_order, created_at, updated_at) VALUES
-- Add your actual services data here from Supabase
('uuid1', 'Разработка сайтов', 'Создание современных и функциональных веб-сайтов', 'globe', 'web-development', 'от 150 000 ₽', JSON_ARRAY('Адаптивный дизайн', 'SEO оптимизация', 'CMS система'), TRUE, 1, NOW(), NOW()),
('uuid2', 'ИИ интеграции', 'Внедрение искусственного интеллекта в бизнес-процессы', 'brain-circuit', 'ai-integration', 'от 200 000 ₽', JSON_ARRAY('Чат-боты', 'Автоматизация', 'Анализ данных'), TRUE, 2, NOW(), NOW()),
('uuid3', 'CRM системы', 'Разработка и настройка систем управления клиентами', 'users', 'crm-systems', 'от 300 000 ₽', JSON_ARRAY('Управление продажами', 'Аналитика', 'Интеграции'), TRUE, 3, NOW(), NOW()),
('uuid4', 'Маркетинг', 'Комплексное продвижение и реклама', 'megaphone', 'marketing', 'от 50 000 ₽', JSON_ARRAY('Контекстная реклама', 'SMM', 'Email маркетинг'), TRUE, 4, NOW(), NOW());

-- Export Portfolio Categories Data  
INSERT INTO portfolio_categories (id, name, slug, is_active, display_order, created_at) VALUES
('cat1', 'Landing Page', 'landing', TRUE, 1, NOW()),
('cat2', 'Корпоративный сайт', 'corporate', TRUE, 2, NOW()),
('cat3', 'E-commerce', 'ecommerce', TRUE, 3, NOW()),
('cat4', 'SaaS', 'saas', TRUE, 4, NOW()),
('cat5', 'Mobile App', 'mobile', TRUE, 5, NOW()),
('cat6', 'CRM', 'crm', TRUE, 6, NOW());

-- Export Portfolio Items Data
INSERT INTO portfolio_items (id, title, description, image_url, project_url, category_id, tags, metrics, is_active, is_featured, display_order, created_at, updated_at) VALUES
-- Add your actual portfolio items here from Supabase
('port1', 'E-commerce платформа', 'Современный интернет-магазин с интеграцией ИИ', '/images/portfolio/ecommerce.jpg', 'https://example.com', 'cat3', JSON_ARRAY('React', 'Node.js', 'AI'), JSON_OBJECT('Конверсия', '+45%', 'Продажи', '+120%'), TRUE, TRUE, 1, NOW(), NOW()),
('port2', 'Корпоративный сайт', 'Представительский сайт с CRM интеграцией', '/images/portfolio/corporate.jpg', 'https://example2.com', 'cat2', JSON_ARRAY('WordPress', 'CRM', 'SEO'), JSON_OBJECT('Трафик', '+200%', 'Лиды', '+85%'), TRUE, TRUE, 2, NOW(), NOW());

-- Export Reviews Data
INSERT INTO reviews (id, name, position, company, text, rating, avatar_url, project, is_active, display_order, created_at, updated_at) VALUES
-- Add your actual reviews here from Supabase
('rev1', 'Алексей Петров', 'CEO', 'ТехноСофт', 'Отличная работа команды! Сайт получился именно таким, как мы хотели.', 5, '/images/avatars/alexey.jpg', 'Корпоративный сайт', TRUE, 1, NOW(), NOW()),
('rev2', 'Мария Иванова', 'Маркетинг директор', 'БизнесПро', 'Профессиональный подход и качественное выполнение всех задач.', 5, '/images/avatars/maria.jpg', 'E-commerce', TRUE, 2, NOW(), NOW()),
('rev3', 'Дмитрий Сидоров', 'CTO', 'ИнноВейшн', 'Быстро и качественно интегрировали ИИ в наши процессы.', 4, '/images/avatars/dmitry.jpg', 'ИИ интеграция', TRUE, 3, NOW(), NOW());

-- Export Companies (Client Logos) Data
INSERT INTO companies (id, name, logo_url, website, is_active, display_order, created_at, updated_at) VALUES
-- Add your actual companies here from Supabase
('comp1', 'ТехноСофт', '/images/clients/technosoft.png', 'https://technosoft.com', TRUE, 1, NOW(), NOW()),
('comp2', 'БизнесПро', '/images/clients/biznespro.png', 'https://biznespro.com', TRUE, 2, NOW(), NOW()),
('comp3', 'ИнноВейшн', '/images/clients/innovation.png', 'https://innovation.com', TRUE, 3, NOW(), NOW()),
('comp4', 'СмартСистемс', '/images/clients/smartsystems.png', 'https://smartsystems.com', TRUE, 4, NOW(), NOW());

-- Export Menu Items Data
INSERT INTO menu_items (id, name, href, `key`, is_external, is_active, display_order, created_at, updated_at) VALUES
-- Add your actual menu items here from Supabase
('menu1', 'Главная', '#hero', 'home', FALSE, TRUE, 1, NOW(), NOW()),
('menu2', 'Услуги', '#services', 'services', FALSE, TRUE, 2, NOW(), NOW()),
('menu3', 'Портфолио', '#portfolio', 'portfolio', FALSE, TRUE, 3, NOW(), NOW()),
('menu4', 'О нас', '#about', 'about', FALSE, TRUE, 4, NOW(), NOW()),
('menu5', 'Контакты', '#contacts', 'contact', FALSE, TRUE, 5, NOW(), NOW());

-- Instructions for manual data export:
-- 1. Export data from Supabase using SQL queries
-- 2. Convert PostgreSQL UUIDs to MySQL compatible format
-- 3. Convert PostgreSQL arrays to JSON format
-- 4. Update image URLs and file paths
-- 5. Test all foreign key relationships