<?php
$current_page = $_GET['page'] ?? 'home';
?>
<header class="header">
    <div class="container">
        <nav class="navbar">
            <div class="navbar-brand">
                <a href="/" class="logo">
                    <span class="logo-text">FlexNet</span>
                    <span class="logo-accent">Digital</span>
                </a>
            </div>
            
            <div class="navbar-menu" id="navbar-menu">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a href="/" class="nav-link <?php echo $current_page === 'home' ? 'active' : ''; ?>">
                            Главная
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/?page=services" class="nav-link <?php echo $current_page === 'services' ? 'active' : ''; ?>">
                            Услуги
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/?page=portfolio" class="nav-link <?php echo $current_page === 'portfolio' ? 'active' : ''; ?>">
                            Портфолио
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/?page=about" class="nav-link <?php echo $current_page === 'about' ? 'active' : ''; ?>">
                            О нас
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="/?page=contact" class="nav-link <?php echo $current_page === 'contact' ? 'active' : ''; ?>">
                            Контакты
                        </a>
                    </li>
                </ul>
            </div>
            
            <div class="navbar-actions">
                <button class="theme-toggle" id="theme-toggle" aria-label="Переключить тему">
                    <i data-lucide="sun" class="theme-icon theme-icon-light"></i>
                    <i data-lucide="moon" class="theme-icon theme-icon-dark"></i>
                </button>
                <button class="navbar-toggle" id="navbar-toggle" aria-label="Открыть меню">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>
        </nav>
    </div>
</header>