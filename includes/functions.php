<?php
// FlexNet Digital Flow - Common Functions

function getPageTitle($page) {
    $titles = [
        'home' => 'Главная',
        'services' => 'Услуги',
        'portfolio' => 'Портфолио',
        'contact' => 'Контакты',
        'about' => 'О нас'
    ];
    
    return $titles[$page] ?? 'Страница не найдена';
}

function getPageDescription($page) {
    $descriptions = [
        'home' => 'FlexNet Digital - ведущая компания в области веб-разработки и цифровых решений',
        'services' => 'Профессиональные IT услуги: веб-разработка, мобильные приложения, системная интеграция',
        'portfolio' => 'Портфолио успешных проектов FlexNet Digital',
        'contact' => 'Свяжитесь с нами для обсуждения вашего проекта',
        'about' => 'О компании FlexNet Digital - наша команда и подход к работе'
    ];
    
    return $descriptions[$page] ?? 'FlexNet Digital';
}

function getBodyClass($page) {
    return "page-{$page}";
}

function getCurrentURL() {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    return $protocol . '://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
}

function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL);
}

function generateCSRFToken() {
    return $_SESSION['csrf_token'];
}

function verifyCSRFToken($token) {
    return hash_equals($_SESSION['csrf_token'], $token);
}

function getServices() {
    return [
        [
            'icon' => 'code',
            'title' => 'Веб-разработка',
            'description' => 'Создание современных веб-сайтов и веб-приложений с использованием передовых технологий',
            'features' => [
                'Адаптивный дизайн',
                'SEO оптимизация', 
                'Высокая производительность',
                'Безопасность'
            ],
            'price' => 'от 50 000 ₽'
        ],
        [
            'icon' => 'smartphone',
            'title' => 'Мобильные приложения',
            'description' => 'Разработка нативных и кроссплатформенных мобильных приложений',
            'features' => [
                'iOS и Android',
                'React Native',
                'Flutter',
                'Интеграция с API'
            ],
            'price' => 'от 100 000 ₽'
        ],
        [
            'icon' => 'settings',
            'title' => 'Системная интеграция',
            'description' => 'Интеграция различных систем и создание комплексных IT решений',
            'features' => [
                'API интеграция',
                'Автоматизация процессов',
                'Облачные решения',
                'Техническая поддержка'
            ],
            'price' => 'от 80 000 ₽'
        ]
    ];
}

function getPortfolioItems() {
    return [
        [
            'title' => 'E-commerce платформа',
            'description' => 'Интернет-магазин с интегрированной системой платежей',
            'image' => '/assets/images/portfolio/project1.jpg',
            'technologies' => ['PHP', 'MySQL', 'JavaScript', 'CSS3'],
            'url' => '#'
        ],
        [
            'title' => 'CRM система',
            'description' => 'Система управления взаимоотношениями с клиентами',
            'image' => '/assets/images/portfolio/project2.jpg',
            'technologies' => ['React', 'Node.js', 'MongoDB', 'Express'],
            'url' => '#'
        ],
        [
            'title' => 'Мобильное приложение',
            'description' => 'Приложение для доставки еды с геолокацией',
            'image' => '/assets/images/portfolio/project3.jpg',
            'technologies' => ['React Native', 'Firebase', 'Google Maps API'],
            'url' => '#'
        ]
    ];
}

function getClientLogos() {
    return [
        '/assets/images/clients/client1.png',
        '/assets/images/clients/client2.png',
        '/assets/images/clients/client3.png',
        '/assets/images/clients/client4.png',
        '/assets/images/clients/client5.png'
    ];
}

function getTestimonials() {
    return [
        [
            'name' => 'Алексей Петров',
            'position' => 'Директор ООО "ТехноСтрой"',
            'text' => 'Отличная команда! Создали для нас современный сайт, который значительно увеличил количество заказов.',
            'avatar' => '/assets/images/testimonials/avatar1.jpg',
            'rating' => 5
        ],
        [
            'name' => 'Мария Сидорова',
            'position' => 'Основатель интернет-магазина "ModaStyle"',
            'text' => 'Профессиональный подход и качественная работа. Рекомендую FlexNet Digital всем своим знакомым.',
            'avatar' => '/assets/images/testimonials/avatar2.jpg',
            'rating' => 5
        ],
        [
            'name' => 'Дмитрий Козлов',
            'position' => 'IT-директор "СмартФинанс"',
            'text' => 'Быстро и качественно интегрировали нашу CRM с внешними системами. Очень довольны результатом.',
            'avatar' => '/assets/images/testimonials/avatar3.jpg',
            'rating' => 5
        ]
    ];
}

function formatDate($date, $format = 'd.m.Y') {
    return date($format, strtotime($date));
}

function truncateText($text, $length = 100) {
    return strlen($text) > $length ? substr($text, 0, $length) . '...' : $text;
}
?>