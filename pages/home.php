<!-- Hero Section -->
<section class="hero">
    <div class="container">
        <div class="hero-content">
            <div class="hero-text">
                <h1 class="hero-title">
                    Создаем <span class="text-gradient">цифровые решения</span>
                    <br>для вашего бизнеса
                </h1>
                <p class="hero-description">
                    Профессиональная веб-разработка, мобильные приложения и системная интеграция. 
                    Помогаем компаниям расти и развиваться в цифровом мире.
                </p>
                <div class="hero-actions">
                    <a href="/?page=contact" class="btn btn-primary">
                        Получить консультацию
                    </a>
                    <a href="/?page=portfolio" class="btn btn-outline">
                        Наши работы
                    </a>
                </div>
            </div>
            <div class="hero-image">
                <div class="hero-graphic">
                    <div class="floating-card card-1">
                        <i data-lucide="code" class="card-icon"></i>
                        <span>Web Development</span>
                    </div>
                    <div class="floating-card card-2">
                        <i data-lucide="smartphone" class="card-icon"></i>
                        <span>Mobile Apps</span>
                    </div>
                    <div class="floating-card card-3">
                        <i data-lucide="settings" class="card-icon"></i>
                        <span>Integration</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Services Section -->
<section class="services" id="services">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Наши услуги</h2>
            <p class="section-description">
                Мы предлагаем комплексные решения для цифровой трансформации вашего бизнеса
            </p>
        </div>
        
        <div class="services-grid">
            <?php foreach (getServices() as $service): ?>
            <div class="service-card">
                <div class="service-icon">
                    <i data-lucide="<?php echo $service['icon']; ?>"></i>
                </div>
                <h3 class="service-title"><?php echo $service['title']; ?></h3>
                <p class="service-description"><?php echo $service['description']; ?></p>
                <ul class="service-features">
                    <?php foreach ($service['features'] as $feature): ?>
                    <li class="feature-item">
                        <i data-lucide="check" class="feature-icon"></i>
                        <?php echo $feature; ?>
                    </li>
                    <?php endforeach; ?>
                </ul>
                <div class="service-price"><?php echo $service['price']; ?></div>
                <a href="/?page=services" class="btn btn-outline btn-sm">
                    Подробнее
                </a>
            </div>
            <?php endforeach; ?>
        </div>
        
        <div class="section-cta">
            <a href="/?page=contact" class="btn btn-primary btn-lg">
                Получить консультацию
            </a>
        </div>
    </div>
</section>

<!-- Portfolio Section -->
<section class="portfolio" id="portfolio">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Наши работы</h2>
            <p class="section-description">
                Примеры успешно реализованных проектов
            </p>
        </div>
        
        <div class="portfolio-grid">
            <?php foreach (array_slice(getPortfolioItems(), 0, 3) as $item): ?>
            <div class="portfolio-item">
                <div class="portfolio-image">
                    <img src="<?php echo $item['image']; ?>" alt="<?php echo $item['title']; ?>" loading="lazy">
                    <div class="portfolio-overlay">
                        <a href="<?php echo $item['url']; ?>" class="portfolio-link" target="_blank">
                            <i data-lucide="external-link"></i>
                        </a>
                    </div>
                </div>
                <div class="portfolio-content">
                    <h3 class="portfolio-title"><?php echo $item['title']; ?></h3>
                    <p class="portfolio-description"><?php echo $item['description']; ?></p>
                    <div class="portfolio-technologies">
                        <?php foreach ($item['technologies'] as $tech): ?>
                        <span class="tech-tag"><?php echo $tech; ?></span>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
        
        <div class="section-cta">
            <a href="/?page=portfolio" class="btn btn-outline btn-lg">
                Смотреть все работы
            </a>
        </div>
    </div>
</section>

<!-- Client Logos Section -->
<section class="client-logos">
    <div class="container">
        <h3 class="client-logos-title">Нам доверяют</h3>
        <div class="client-logos-grid">
            <?php foreach (getClientLogos() as $index => $logo): ?>
            <div class="client-logo">
                <img src="<?php echo $logo; ?>" alt="Клиент <?php echo $index + 1; ?>" loading="lazy">
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Testimonials Section -->
<section class="testimonials" id="testimonials">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Отзывы клиентов</h2>
            <p class="section-description">
                Что говорят о нас наши клиенты
            </p>
        </div>
        
        <div class="testimonials-grid">
            <?php foreach (getTestimonials() as $testimonial): ?>
            <div class="testimonial-card">
                <div class="testimonial-rating">
                    <?php for ($i = 1; $i <= 5; $i++): ?>
                    <i data-lucide="star" class="star <?php echo $i <= $testimonial['rating'] ? 'filled' : ''; ?>"></i>
                    <?php endfor; ?>
                </div>
                <blockquote class="testimonial-text">
                    "<?php echo $testimonial['text']; ?>"
                </blockquote>
                <div class="testimonial-author">
                    <div class="author-avatar">
                        <img src="<?php echo $testimonial['avatar']; ?>" alt="<?php echo $testimonial['name']; ?>" loading="lazy">
                    </div>
                    <div class="author-info">
                        <cite class="author-name"><?php echo $testimonial['name']; ?></cite>
                        <span class="author-position"><?php echo $testimonial['position']; ?></span>
                    </div>
                </div>
            </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>