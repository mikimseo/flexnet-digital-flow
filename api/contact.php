<?php
// FlexNet Digital Flow - Contact Form Handler
session_start();

// Include configuration and functions
require_once __DIR__ . '/../config/config.php';
require_once __DIR__ . '/../includes/functions.php';

// Set content type
header('Content-Type: application/json; charset=UTF-8');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

try {
    // Verify CSRF token
    if (!isset($_POST['csrf_token']) || !verifyCSRFToken($_POST['csrf_token'])) {
        throw new Exception('Invalid CSRF token');
    }

    // Validate required fields
    $required_fields = ['name', 'email', 'message'];
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Поле '{$field}' обязательно для заполнения");
        }
    }

    // Sanitize and validate input
    $name = sanitizeInput($_POST['name']);
    $email = sanitizeInput($_POST['email']);
    $phone = sanitizeInput($_POST['phone'] ?? '');
    $service = sanitizeInput($_POST['service'] ?? '');
    $budget = sanitizeInput($_POST['budget'] ?? '');
    $message = sanitizeInput($_POST['message']);

    // Validate email
    if (!validateEmail($email)) {
        throw new Exception('Некорректный email адрес');
    }

    // Validate name length
    if (strlen($name) < 2 || strlen($name) > 100) {
        throw new Exception('Имя должно содержать от 2 до 100 символов');
    }

    // Validate message length
    if (strlen($message) < 10 || strlen($message) > 1000) {
        throw new Exception('Сообщение должно содержать от 10 до 1000 символов');
    }

    // Check for spam (simple honeypot and rate limiting)
    if (isset($_POST['website']) && !empty($_POST['website'])) {
        throw new Exception('Spam detected');
    }

    // Rate limiting - allow only 3 submissions per IP per hour
    $ip = $_SERVER['REMOTE_ADDR'];
    $rate_limit_file = __DIR__ . '/../tmp/rate_limit_' . md5($ip) . '.txt';
    
    if (file_exists($rate_limit_file)) {
        $submissions = json_decode(file_get_contents($rate_limit_file), true);
        $current_time = time();
        
        // Clean old submissions (older than 1 hour)
        $submissions = array_filter($submissions, function($time) use ($current_time) {
            return ($current_time - $time) < 3600;
        });
        
        if (count($submissions) >= 3) {
            throw new Exception('Слишком много запросов. Попробуйте позже.');
        }
        
        $submissions[] = $current_time;
    } else {
        $submissions = [time()];
    }
    
    // Create tmp directory if it doesn't exist
    if (!is_dir(__DIR__ . '/../tmp')) {
        mkdir(__DIR__ . '/../tmp', 0755, true);
    }
    
    file_put_contents($rate_limit_file, json_encode($submissions));

    // Prepare email content
    $email_subject = "Новая заявка с сайта FlexNet Digital";
    $email_body = "
    <html>
    <head>
        <title>Новая заявка с сайта</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #f8f9fa; padding: 20px; border-radius: 5px; margin-bottom: 20px; }
            .field { margin-bottom: 15px; }
            .field strong { display: inline-block; width: 120px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Новая заявка с сайта FlexNet Digital</h2>
                <p>Получена: " . date('d.m.Y H:i:s') . "</p>
            </div>
            
            <div class='field'>
                <strong>Имя:</strong> {$name}
            </div>
            
            <div class='field'>
                <strong>Email:</strong> {$email}
            </div>
            
            " . ($phone ? "<div class='field'><strong>Телефон:</strong> {$phone}</div>" : "") . "
            
            " . ($service ? "<div class='field'><strong>Услуга:</strong> {$service}</div>" : "") . "
            
            " . ($budget ? "<div class='field'><strong>Бюджет:</strong> {$budget}</div>" : "") . "
            
            <div class='field'>
                <strong>Сообщение:</strong><br>
                " . nl2br($message) . "
            </div>
            
            <div class='field'>
                <strong>IP адрес:</strong> {$ip}
            </div>
            
            <div class='field'>
                <strong>User Agent:</strong> " . ($_SERVER['HTTP_USER_AGENT'] ?? 'Unknown') . "
            </div>
        </div>
    </body>
    </html>
    ";

    // Save to file (backup method)
    $log_entry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'service' => $service,
        'budget' => $budget,
        'message' => $message,
        'ip' => $ip,
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
    ];
    
    $log_file = __DIR__ . '/../logs/contact_forms.log';
    
    // Create logs directory if it doesn't exist
    if (!is_dir(__DIR__ . '/../logs')) {
        mkdir(__DIR__ . '/../logs', 0755, true);
    }
    
    file_put_contents($log_file, json_encode($log_entry) . "\n", FILE_APPEND | LOCK_EX);

    // Try to send email (requires PHP mail configuration)
    $mail_headers = [
        'MIME-Version: 1.0',
        'Content-Type: text/html; charset=UTF-8',
        'From: noreply@flexnet-digital.com',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    ];

    $mail_sent = false;
    if (function_exists('mail')) {
        $mail_sent = mail(
            SITE_EMAIL,
            $email_subject,
            $email_body,
            implode("\r\n", $mail_headers)
        );
    }

    // Success response
    echo json_encode([
        'success' => true,
        'message' => 'Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.',
        'mail_sent' => $mail_sent
    ]);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>