<!-- Contact Hero -->
<section class="page-hero">
    <div class="container">
        <div class="page-hero-content">
            <h1 class="page-title">Свяжитесь с нами</h1>
            <p class="page-description">
                Готовы обсудить ваш проект? Свяжитесь с нами любым удобным способом
            </p>
        </div>
    </div>
</section>

<!-- Contact Section -->
<section class="contact-section">
    <div class="container">
        <div class="contact-content">
            <div class="contact-info">
                <h2 class="contact-title">Как с нами связаться</h2>
                <p class="contact-description">
                    Мы всегда готовы ответить на ваши вопросы и обсудить детали проекта
                </p>
                
                <div class="contact-methods">
                    <div class="contact-method">
                        <div class="method-icon">
                            <i data-lucide="phone"></i>
                        </div>
                        <div class="method-content">
                            <h3 class="method-title">Телефон</h3>
                            <a href="tel:+79991234567" class="method-link"><?php echo SITE_PHONE; ?></a>
                        </div>
                    </div>
                    
                    <div class="contact-method">
                        <div class="method-icon">
                            <i data-lucide="mail"></i>
                        </div>
                        <div class="method-content">
                            <h3 class="method-title">Email</h3>
                            <a href="mailto:<?php echo SITE_EMAIL; ?>" class="method-link"><?php echo SITE_EMAIL; ?></a>
                        </div>
                    </div>
                    
                    <div class="contact-method">
                        <div class="method-icon">
                            <i data-lucide="map-pin"></i>
                        </div>
                        <div class="method-content">
                            <h3 class="method-title">Адрес</h3>
                            <span class="method-text">Москва, ул. Примерная, 123</span>
                        </div>
                    </div>
                    
                    <div class="contact-method">
                        <div class="method-icon">
                            <i data-lucide="clock"></i>
                        </div>
                        <div class="method-content">
                            <h3 class="method-title">Режим работы</h3>
                            <span class="method-text">Пн-Пт: 9:00 - 18:00</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="contact-form-container">
                <form class="contact-form" id="contact-form" method="POST" action="/api/contact.php">
                    <input type="hidden" name="csrf_token" value="<?php echo generateCSRFToken(); ?>">
                    
                    <div class="form-group">
                        <label for="name" class="form-label">Ваше имя</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            class="form-input" 
                            required
                            placeholder="Введите ваше имя"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="email" class="form-label">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            class="form-input" 
                            required
                            placeholder="example@email.com"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="phone" class="form-label">Телефон</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            class="form-input"
                            placeholder="+7 (999) 123-45-67"
                        >
                    </div>
                    
                    <div class="form-group">
                        <label for="service" class="form-label">Интересующая услуга</label>
                        <select id="service" name="service" class="form-select">
                            <option value="">Выберите услугу</option>
                            <option value="web-development">Веб-разработка</option>
                            <option value="mobile-apps">Мобильные приложения</option>
                            <option value="system-integration">Системная интеграция</option>
                            <option value="consulting">IT-консалтинг</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="budget" class="form-label">Бюджет проекта</label>
                        <select id="budget" name="budget" class="form-select">
                            <option value="">Выберите бюджет</option>
                            <option value="50000-100000">50 000 - 100 000 ₽</option>
                            <option value="100000-300000">100 000 - 300 000 ₽</option>
                            <option value="300000-500000">300 000 - 500 000 ₽</option>
                            <option value="500000+">Свыше 500 000 ₽</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="message" class="form-label">Сообщение</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            class="form-textarea" 
                            rows="5"
                            required
                            placeholder="Расскажите подробнее о вашем проекте..."
                        ></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-label">
                            <input type="checkbox" name="privacy" required class="form-checkbox">
                            <span class="checkbox-text">
                                Я согласен с 
                                <a href="/privacy" target="_blank">политикой конфиденциальности</a>
                            </span>
                        </label>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-lg btn-full">
                        <span class="btn-text">Отправить сообщение</span>
                        <span class="btn-loading" style="display: none;">
                            <i data-lucide="loader" class="spin"></i>
                            Отправка...
                        </span>
                    </button>
                </form>
            </div>
        </div>
    </div>
</section>

<!-- Map Section -->
<section class="map-section">
    <div class="container">
        <h2 class="section-title">Как нас найти</h2>
        <div class="map-container">
            <div class="map-placeholder">
                <div class="map-content">
                    <i data-lucide="map-pin" class="map-icon"></i>
                    <h3>Наш офис</h3>
                    <p>Москва, ул. Примерная, 123<br>Бизнес-центр "Пример", офис 456</p>
                    <a href="https://maps.google.com/" target="_blank" class="btn btn-outline btn-sm">
                        Открыть в картах
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>