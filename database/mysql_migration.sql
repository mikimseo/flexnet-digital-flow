-- FlexNet Digital - MySQL Migration Script
-- Migration from Supabase PostgreSQL to MySQL
-- Created: 2025-08-24

-- Create database
CREATE DATABASE IF NOT EXISTS flexnet_digital 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

USE flexnet_digital;

-- Create users table (replaces auth.users functionality)
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    email_verified BOOLEAN DEFAULT FALSE,
    phone VARCHAR(50),
    phone_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_sign_in_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
);

-- Create profiles table
CREATE TABLE profiles (
    id CHAR(36) PRIMARY KEY,
    email VARCHAR(255),
    full_name VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_role (role)
);

-- Create services table
CREATE TABLE services (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    icon VARCHAR(100) NOT NULL,
    slug VARCHAR(255),
    price VARCHAR(100),
    features JSON,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_slug (slug),
    INDEX idx_active_order (is_active, display_order)
);

-- Create portfolio_categories table
CREATE TABLE portfolio_categories (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_slug (slug),
    INDEX idx_active_order (is_active, display_order)
);

-- Create portfolio_items table
CREATE TABLE portfolio_items (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    project_url TEXT,
    category_id CHAR(36),
    tags JSON,
    metrics JSON,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES portfolio_categories(id) ON DELETE SET NULL,
    INDEX idx_category (category_id),
    INDEX idx_featured (is_featured),
    INDEX idx_active_order (is_active, display_order)
);

-- Create reviews table
CREATE TABLE reviews (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    position VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    project VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_rating (rating),
    INDEX idx_active_order (is_active, display_order)
);

-- Create companies table
CREATE TABLE companies (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    website TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_active_order (is_active, display_order)
);

-- Create menu_items table
CREATE TABLE menu_items (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    href VARCHAR(500) NOT NULL,
    `key` VARCHAR(100) NOT NULL,
    is_external BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    UNIQUE KEY unique_key (`key`),
    INDEX idx_active_order (is_active, display_order)
);

-- Create messages table (for chat functionality)
CREATE TABLE messages (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    session_id CHAR(36) NOT NULL,
    sender_type ENUM('user', 'assistant') NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_session_created (session_id, created_at)
);

-- Insert default admin user
INSERT INTO users (id, email, password_hash, full_name, email_verified)
VALUES (
    UUID(),
    'admin@flexnet-digital.com',
    '$2y$10$example_hash_replace_with_real_hash',
    'Администратор',
    TRUE
);

SET @admin_id = LAST_INSERT_ID();

INSERT INTO profiles (id, email, full_name, role)
SELECT id, email, full_name, 'admin'
FROM users 
WHERE email = 'admin@flexnet-digital.com';

-- Insert default services
INSERT INTO services (title, description, icon, slug, price, features, display_order) VALUES
('Разработка сайтов', 'Создание современных и функциональных веб-сайтов', 'globe', 'web-development', 'от 150 000 ₽', JSON_ARRAY('Адаптивный дизайн', 'SEO оптимизация', 'CMS система'), 1),
('ИИ интеграции', 'Внедрение искусственного интеллекта в бизнес-процессы', 'brain-circuit', 'ai-integration', 'от 200 000 ₽', JSON_ARRAY('Чат-боты', 'Автоматизация', 'Анализ данных'), 2),
('CRM системы', 'Разработка и настройка систем управления клиентами', 'users', 'crm-systems', 'от 300 000 ₽', JSON_ARRAY('Управление продажами', 'Аналитика', 'Интеграции'), 3),
('Маркетинг', 'Комплексное продвижение и реклама', 'megaphone', 'marketing', 'от 50 000 ₽', JSON_ARRAY('Контекстная реклама', 'SMM', 'Email маркетинг'), 4);

-- Insert default portfolio categories
INSERT INTO portfolio_categories (name, slug, display_order) VALUES
('Landing Page', 'landing', 1),
('Корпоративный сайт', 'corporate', 2),
('E-commerce', 'ecommerce', 3),
('SaaS', 'saas', 4),
('Mobile App', 'mobile', 5),
('CRM', 'crm', 6);

-- Insert default menu items
INSERT INTO menu_items (name, href, `key`, display_order) VALUES
('Главная', '#hero', 'home', 1),
('Услуги', '#services', 'services', 2),
('Портфолио', '#portfolio', 'portfolio', 3),
('О нас', '#about', 'about', 4),
('Контакты', '#contacts', 'contact', 5);

-- Insert default companies (client logos)
INSERT INTO companies (name, logo_url, website, display_order) VALUES
('ТехноСофт', '/images/clients/technosoft.png', 'https://technosoft.com', 1),
('БизнесПро', '/images/clients/biznespro.png', 'https://biznespro.com', 2),
('ИнноВейшн', '/images/clients/innovation.png', 'https://innovation.com', 3),
('СмартСистемс', '/images/clients/smartsystems.png', 'https://smartsystems.com', 4);

-- Insert default reviews
INSERT INTO reviews (name, position, company, text, rating, display_order) VALUES
('Алексей Петров', 'CEO', 'ТехноСофт', 'Отличная работа команды! Сайт получился именно таким, как мы хотели.', 5, 1),
('Мария Иванова', 'Маркетинг директор', 'БизнесПро', 'Профессиональный подход и качественное выполнение всех задач.', 5, 2),
('Дмитрий Сидоров', 'CTO', 'ИнноВейшн', 'Быстро и качественно интегрировали ИИ в наши процессы.', 4, 3);

-- Create stored procedures for common operations

-- Procedure to get active services
DELIMITER //
CREATE PROCEDURE GetActiveServices()
BEGIN
    SELECT * FROM services 
    WHERE is_active = TRUE 
    ORDER BY display_order ASC, created_at DESC;
END //
DELIMITER ;

-- Procedure to get portfolio items by category
DELIMITER //
CREATE PROCEDURE GetPortfolioByCategory(IN category_slug VARCHAR(255))
BEGIN
    IF category_slug = 'all' OR category_slug IS NULL THEN
        SELECT pi.*, pc.name as category_name, pc.slug as category_slug
        FROM portfolio_items pi
        LEFT JOIN portfolio_categories pc ON pi.category_id = pc.id
        WHERE pi.is_active = TRUE
        ORDER BY pi.is_featured DESC, pi.display_order ASC;
    ELSE
        SELECT pi.*, pc.name as category_name, pc.slug as category_slug
        FROM portfolio_items pi
        INNER JOIN portfolio_categories pc ON pi.category_id = pc.id
        WHERE pi.is_active = TRUE AND pc.slug = category_slug
        ORDER BY pi.is_featured DESC, pi.display_order ASC;
    END IF;
END //
DELIMITER ;

-- Procedure to authenticate user
DELIMITER //
CREATE PROCEDURE AuthenticateUser(IN user_email VARCHAR(255), IN user_password VARCHAR(255))
BEGIN
    SELECT u.id, u.email, u.full_name, p.role
    FROM users u
    INNER JOIN profiles p ON u.id = p.id
    WHERE u.email = user_email 
    AND u.password_hash = user_password
    LIMIT 1;
END //
DELIMITER ;

-- Create views for common queries

-- View for active menu items
CREATE VIEW active_menu_items AS
SELECT * FROM menu_items 
WHERE is_active = TRUE 
ORDER BY display_order ASC;

-- View for featured portfolio
CREATE VIEW featured_portfolio AS
SELECT pi.*, pc.name as category_name
FROM portfolio_items pi
LEFT JOIN portfolio_categories pc ON pi.category_id = pc.id
WHERE pi.is_active = TRUE AND pi.is_featured = TRUE
ORDER BY pi.display_order ASC;

-- View for active reviews
CREATE VIEW active_reviews AS
SELECT * FROM reviews 
WHERE is_active = TRUE 
ORDER BY display_order ASC;

-- Create indexes for better performance
CREATE INDEX idx_users_email_password ON users(email, password_hash);
CREATE INDEX idx_messages_session_time ON messages(session_id, created_at DESC);
CREATE INDEX idx_portfolio_featured_active ON portfolio_items(is_featured, is_active);

-- Create triggers for updated_at fields
DELIMITER //
CREATE TRIGGER profiles_updated_at 
    BEFORE UPDATE ON profiles 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

CREATE TRIGGER services_updated_at 
    BEFORE UPDATE ON services 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

CREATE TRIGGER portfolio_items_updated_at 
    BEFORE UPDATE ON portfolio_items 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

CREATE TRIGGER reviews_updated_at 
    BEFORE UPDATE ON reviews 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

CREATE TRIGGER companies_updated_at 
    BEFORE UPDATE ON companies 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //

CREATE TRIGGER menu_items_updated_at 
    BEFORE UPDATE ON menu_items 
    FOR EACH ROW 
BEGIN
    SET NEW.updated_at = CURRENT_TIMESTAMP;
END //
DELIMITER ;

COMMIT;