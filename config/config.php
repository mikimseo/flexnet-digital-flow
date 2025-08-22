<?php
// FlexNet Digital Flow - Configuration File

// Site Configuration
define('SITE_NAME', 'FlexNet Digital');
define('SITE_URL', 'https://flexnet-digital.com');
define('SITE_EMAIL', 'info@flexnet-digital.com');
define('SITE_PHONE', '+7 (999) 123-45-67');

// Database Configuration (if needed)
define('DB_HOST', 'localhost');
define('DB_NAME', 'flexnet_digital');
define('DB_USER', 'root');
define('DB_PASS', '');

// Email Configuration
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USER', 'your-email@gmail.com');
define('SMTP_PASS', 'your-app-password');

// Security
define('CSRF_TOKEN_NAME', 'csrf_token');

// Error Reporting
error_reporting(E_ALL);
ini_set('display_errors', 0); // Set to 1 for development
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/../logs/php_errors.log');

// Timezone
date_default_timezone_set('Europe/Moscow');

// Session Configuration
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);

// Generate CSRF Token
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}
?>