-- Миграция базы данных с Supabase на MySQL
-- Этот файл содержит структуру и данные для переноса на MySQL

-- 1. Создание базы данных
CREATE DATABASE IF NOT EXISTS flexnet_digital CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE flexnet_digital;

-- 2. Таблица профилей пользователей
CREATE TABLE profiles (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255),
    full_name VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 3. Таблица компаний
CREATE TABLE companies (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    logo_url TEXT,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Таблица элементов меню
CREATE TABLE menu_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    href VARCHAR(255) NOT NULL,
    `key` VARCHAR(100) NOT NULL,
    is_external BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 5. Таблица сообщений
CREATE TABLE messages (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    session_id VARCHAR(36) DEFAULT (UUID()),
    sender_type VARCHAR(50) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Таблица категорий портфолио
CREATE TABLE portfolio_categories (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Таблица элементов портфолио
CREATE TABLE portfolio_items (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category_id VARCHAR(36),
    image_url TEXT,
    project_url TEXT,
    tags JSON,
    metrics JSON,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES portfolio_categories(id) ON DELETE SET NULL
);

-- 8. Таблица отзывов
CREATE TABLE reviews (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    project VARCHAR(255),
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 9. Таблица услуг
CREATE TABLE services (
    id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(255) NOT NULL,
    slug VARCHAR(255),
    price VARCHAR(100),
    features JSON,
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 10. Вставка базовых данных
INSERT INTO menu_items (name, href, `key`, is_external, display_order) VALUES
('Главная', '#hero', 'home', TRUE, 1),
('Услуги', '#services', 'services', TRUE, 2),
('Портфолио', '#portfolio', 'portfolio', TRUE, 3),
('Отзывы', '#reviews', 'reviews', TRUE, 4),
('Контакты', '#contacts', 'contacts', TRUE, 5);

INSERT INTO portfolio_categories (name, slug, display_order) VALUES
('Landing', 'landing', 1),
('Corporate', 'corporate', 2),
('E-commerce', 'ecommerce', 3),
('SaaS', 'saas', 4),
('Mobile', 'mobile', 5),
('CRM', 'crm', 6);

-- 11. Создание индексов для оптимизации
CREATE INDEX idx_companies_active ON companies(is_active);
CREATE INDEX idx_menu_items_active ON menu_items(is_active, display_order);
CREATE INDEX idx_portfolio_items_active ON portfolio_items(is_active, is_featured);
CREATE INDEX idx_reviews_active ON reviews(is_active, display_order);
CREATE INDEX idx_services_active ON services(is_active, display_order);