<?php
// FlexNet Digital Flow - PHP Entry Point
session_start();

// Set content type
header('Content-Type: text/html; charset=UTF-8');

// Get the current page from URL parameter
$page = $_GET['page'] ?? 'home';
$allowed_pages = ['home', 'services', 'portfolio', 'contact', 'about'];

// Sanitize page parameter
$page = in_array($page, $allowed_pages) ? $page : 'home';

// Include configuration
require_once __DIR__ . '/../config/config.php';

// Include common functions
require_once __DIR__ . '/../includes/functions.php';

// Start output buffering
ob_start();
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo getPageTitle($page); ?> - FlexNet Digital</title>
    <meta name="description" content="<?php echo getPageDescription($page); ?>">
    <meta name="keywords" content="веб-разработка, цифровые решения, IT услуги, FlexNet">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="<?php echo getPageTitle($page); ?> - FlexNet Digital">
    <meta property="og:description" content="<?php echo getPageDescription($page); ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo getCurrentURL(); ?>">
    <meta property="og:image" content="<?php echo SITE_URL; ?>/assets/og-image.jpg">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/assets/css/style.css">
    <link rel="stylesheet" href="/assets/css/responsive.css">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/lucide/0.263.1/lucide.min.css">
    
    <link rel="canonical" href="<?php echo getCurrentURL(); ?>">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
</head>
<body class="<?php echo getBodyClass($page); ?>">
    
    <!-- Header -->
    <?php include __DIR__ . '/../includes/header.php'; ?>
    
    <!-- Main Content -->
    <main id="main-content">
        <?php
        // Include the appropriate page content
        $page_file = __DIR__ . "/../pages/{$page}.php";
        if (file_exists($page_file)) {
            include $page_file;
        } else {
            include __DIR__ . '/../pages/404.php';
        }
        ?>
    </main>
    
    <!-- Footer -->
    <?php include __DIR__ . '/../includes/footer.php'; ?>
    
    <!-- Chat Widget -->
    <?php include __DIR__ . '/../includes/chat-widget.php'; ?>
    
    <!-- JavaScript -->
    <script src="/assets/js/main.js"></script>
    <script src="/assets/js/chat.js"></script>
    
    <?php if ($page === 'contact'): ?>
    <script src="/assets/js/contact-form.js"></script>
    <?php endif; ?>
    
</body>
</html>
<?php
// End output buffering and send content
ob_end_flush();
?>