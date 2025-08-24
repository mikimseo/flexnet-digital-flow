<?php
// Конфигурация подключения к MySQL базе данных
// Замените значения на ваши данные хостинга

define('DB_HOST', 'localhost'); // или IP адрес вашего сервера MySQL
define('DB_NAME', 'flexnet_digital'); // имя базы данных
define('DB_USER', 'your_username'); // имя пользователя MySQL
define('DB_PASS', 'your_password'); // пароль пользователя MySQL
define('DB_CHARSET', 'utf8mb4');

// Создание подключения к базе данных
try {
    $pdo = new PDO(
        "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET,
        DB_USER,
        DB_PASS,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Функции для работы с базой данных
function getMenuItems() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM menu_items WHERE is_active = 1 ORDER BY display_order");
    return $stmt->fetchAll();
}

function getServices() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM services WHERE is_active = 1 ORDER BY display_order");
    return $stmt->fetchAll();
}

function getPortfolioItems() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM portfolio_items WHERE is_active = 1 ORDER BY display_order");
    return $stmt->fetchAll();
}

function getReviews() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM reviews WHERE is_active = 1 ORDER BY display_order");
    return $stmt->fetchAll();
}

function getCompanies() {
    global $pdo;
    $stmt = $pdo->query("SELECT * FROM companies WHERE is_active = 1 ORDER BY display_order");
    return $stmt->fetchAll();
}

function addMessage($session_id, $sender_type, $content) {
    global $pdo;
    $stmt = $pdo->prepare("INSERT INTO messages (session_id, sender_type, content) VALUES (?, ?, ?)");
    return $stmt->execute([$session_id, $sender_type, $content]);
}
?>