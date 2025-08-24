<?php
// FlexNet Digital - Main Entry Point (PHP 8.4)
session_start();

// Set content type and security headers
header('Content-Type: text/html; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Include configuration and functions
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/includes/functions.php';

// Get route from URL (for SPA-like behavior)
$request_uri = $_SERVER['REQUEST_URI'];
$route = parse_url($request_uri, PHP_URL_FRAGMENT) ?: 'home';

// Start output buffering
ob_start();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- PWA Meta Tags -->
    <meta name="theme-color" content="#3B82F6">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="apple-mobile-web-app-title" content="FlexNet Digital">
    
    <!-- Manifest -->
    <link rel="manifest" href="/manifest.json">
    
    <!-- Apple Touch Icons -->
    <link rel="apple-touch-icon" href="/icons/icon-512x512.png">
    <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png">
    <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png">
    
    <!-- SEO Meta Tags -->
    <title>FlexNet Digital - Digital-агентство полного цикла</title>
    <meta name="description" content="FlexNet Digital - Digital-агентство полного цикла: сайты, ИИ-интеграции, CRM и рост продаж. Создаём сайты и внедряем ИИ-агентов, автоматизируем маркетинг и продажи для устойчивого роста вашего бизнеса.">
    <meta name="keywords" content="веб-разработка, сайты, ИИ интеграции, CRM, маркетинг, digital агентство">
    <meta name="author" content="FlexNet Digital">
    
    <!-- Open Graph -->
    <meta property="og:title" content="FlexNet Digital - Digital-агентство полного цикла">
    <meta property="og:description" content="Создаём сайты и внедряем ИИ-агентов, автоматизируем маркетинг и продажи для устойчивого роста вашего бизнеса">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://flexnet-digital.com">
    <meta property="og:image" content="/icons/icon-512x512.png">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="/assets/css/responsive.css">
    <link rel="stylesheet" href="/assets/css/components.css">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/lucide.min.css">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    
    <link rel="canonical" href="<?php echo getCurrentURL(); ?>">
</head>

<body class="min-h-screen bg-background text-foreground">
    <!-- Header -->
    <?php include __DIR__ . '/includes/header.php'; ?>
    
    <!-- Main Content -->
    <main class="main-content">
        <!-- Hero Section -->
        <section id="home">
            <?php include __DIR__ . '/includes/sections/hero.php'; ?>
        </section>
        
        <!-- Client Logos Section -->
        <?php include __DIR__ . '/includes/sections/client-logos.php'; ?>
        
        <!-- Services Section -->
        <section id="services">
            <?php include __DIR__ . '/includes/sections/services.php'; ?>
        </section>
        
        <!-- Portfolio Section -->
        <section id="portfolio">
            <?php include __DIR__ . '/includes/sections/portfolio.php'; ?>
        </section>
        
        <!-- Reviews Section -->
        <?php include __DIR__ . '/includes/sections/reviews.php'; ?>
        
        <!-- Contacts Section -->
        <section id="contacts">
            <?php include __DIR__ . '/includes/sections/contacts.php'; ?>
        </section>
    </main>
    
    <!-- Footer -->
    <?php include __DIR__ . '/includes/footer.php'; ?>
    
    <!-- Chat Widget -->
    <?php include __DIR__ . '/includes/chat-widget.php'; ?>
    
    <!-- Mobile Bottom Navigation (PWA) -->
    <nav id="mobile-bottom-nav" class="mobile-bottom-nav">
        <a href="#home" class="mobile-nav-item active" data-section="home">
            <i data-lucide="home"></i>
            <span>Главная</span>
        </a>
        <a href="#services" class="mobile-nav-item" data-section="services">
            <i data-lucide="briefcase"></i>
            <span>Услуги</span>
        </a>
        <a href="#portfolio" class="mobile-nav-item" data-section="portfolio">
            <i data-lucide="folder"></i>
            <span>Портфолио</span>
        </a>
        <a href="#contacts" class="mobile-nav-item" data-section="contacts">
            <i data-lucide="phone"></i>
            <span>Контакты</span>
        </a>
    </nav>
    
    <!-- JavaScript -->
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/mobile-nav.js"></script>
    <script src="/assets/js/chat.js"></script>
    <script src="/assets/js/pwa.js"></script>
    
    <script>
        // Initialize Lucide icons
        lucide.createIcons();
        
        // Initialize PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => console.log('SW registered:', registration))
                .catch(error => console.log('SW registration failed:', error));
        }
    </script>
</body>
</html>
<?php
ob_end_flush();
?>