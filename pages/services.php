<!-- Services Hero -->
<section class="page-hero">
    <div class="container">
        <div class="page-hero-content">
            <h1 class="page-title">Наши услуги</h1>
            <p class="page-description">
                Комплексные IT-решения для развития вашего бизнеса
            </p>
        </div>
    </div>
</section>

<!-- Services Grid -->
<section class="services-detailed">
    <div class="container">
        <?php foreach (getServices() as $index => $service): ?>
        <div class="service-detailed <?php echo $index % 2 === 0 ? 'service-left' : 'service-right'; ?>">
            <div class="service-content">
                <div class="service-icon-large">
                    <i data-lucide="<?php echo $service['icon']; ?>"></i>
                </div>
                <h2 class="service-title-large"><?php echo $service['title']; ?></h2>
                <p class="service-description-large"><?php echo $service['description']; ?></p>
                
                <div class="service-features-detailed">
                    <h3 class="features-title">Что включено:</h3>
                    <ul class="features-list">
                        <?php foreach ($service['features'] as $feature): ?>
                        <li class="feature-item">
                            <i data-lucide="check-circle" class="feature-icon"></i>
                            <?php echo $feature; ?>
                        </li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                
                <div class="service-price-block">
                    <span class="price-label">Стоимость:</span>
                    <span class="price-value"><?php echo $service['price']; ?></span>
                </div>
                
                <div class="service-actions">
                    <a href="/?page=contact" class="btn btn-primary">
                        Заказать услугу
                    </a>
                    <a href="/?page=contact" class="btn btn-outline">
                        Получить консультацию
                    </a>
                </div>
            </div>
            
            <div class="service-visual">
                <div class="visual-placeholder">
                    <i data-lucide="<?php echo $service['icon']; ?>" class="visual-icon"></i>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</section>

<!-- Process Section -->
<section class="process-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Как мы работаем</h2>
            <p class="section-description">
                Проверенный процесс разработки для достижения лучших результатов
            </p>
        </div>
        
        <div class="process-steps">
            <div class="process-step">
                <div class="step-number">1</div>
                <div class="step-content">
                    <h3 class="step-title">Анализ и планирование</h3>
                    <p class="step-description">
                        Изучаем ваши потребности, анализируем целевую аудиторию и планируем техническое решение
                    </p>
                </div>
            </div>
            
            <div class="process-step">
                <div class="step-number">2</div>
                <div class="step-content">
                    <h3 class="step-title">Дизайн и прототипирование</h3>
                    <p class="step-description">
                        Создаем пользовательский интерфейс и интерактивные прототипы для согласования
                    </p>
                </div>
            </div>
            
            <div class="process-step">
                <div class="step-number">3</div>
                <div class="step-content">
                    <h3 class="step-title">Разработка</h3>
                    <p class="step-description">
                        Пишем чистый, масштабируемый код с использованием современных технологий
                    </p>
                </div>
            </div>
            
            <div class="process-step">
                <div class="step-number">4</div>
                <div class="step-content">
                    <h3 class="step-title">Тестирование</h3>
                    <p class="step-description">
                        Проводим комплексное тестирование функциональности, безопасности и производительности
                    </p>
                </div>
            </div>
            
            <div class="process-step">
                <div class="step-number">5</div>
                <div class="step-content">
                    <h3 class="step-title">Запуск и поддержка</h3>
                    <p class="step-description">
                        Запускаем проект и обеспечиваем техническую поддержку и развитие
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Technologies Section -->
<section class="technologies-section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Технологии</h2>
            <p class="section-description">
                Используем современный стек технологий для создания надежных решений
            </p>
        </div>
        
        <div class="technologies-grid">
            <div class="tech-category">
                <h3 class="tech-category-title">Frontend</h3>
                <div class="tech-items">
                    <span class="tech-item">React</span>
                    <span class="tech-item">Vue.js</span>
                    <span class="tech-item">TypeScript</span>
                    <span class="tech-item">Tailwind CSS</span>
                </div>
            </div>
            
            <div class="tech-category">
                <h3 class="tech-category-title">Backend</h3>
                <div class="tech-items">
                    <span class="tech-item">Node.js</span>
                    <span class="tech-item">PHP</span>
                    <span class="tech-item">Python</span>
                    <span class="tech-item">PostgreSQL</span>
                </div>
            </div>
            
            <div class="tech-category">
                <h3 class="tech-category-title">Mobile</h3>
                <div class="tech-items">
                    <span class="tech-item">React Native</span>
                    <span class="tech-item">Flutter</span>
                    <span class="tech-item">Swift</span>
                    <span class="tech-item">Kotlin</span>
                </div>
            </div>
            
            <div class="tech-category">
                <h3 class="tech-category-title">DevOps</h3>
                <div class="tech-items">
                    <span class="tech-item">Docker</span>
                    <span class="tech-item">AWS</span>
                    <span class="tech-item">CI/CD</span>
                    <span class="tech-item">Kubernetes</span>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="cta-section">
    <div class="container">
        <div class="cta-content">
            <h2 class="cta-title">Готовы начать проект?</h2>
            <p class="cta-description">
                Свяжитесь с нами для обсуждения деталей и получения персонального предложения
            </p>
            <div class="cta-actions">
                <a href="/?page=contact" class="btn btn-primary btn-lg">
                    Обсудить проект
                </a>
                <a href="tel:+79991234567" class="btn btn-outline btn-lg">
                    Позвонить сейчас
                </a>
            </div>
        </div>
    </div>
</section>