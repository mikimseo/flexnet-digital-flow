<?php
// Contacts Section
$csrfToken = $_SESSION['csrf_token'] ?? generateCSRFToken();
?>
<section id="contacts" class="section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Свяжитесь с нами</h2>
            <p class="section-description">Готовы обсудить ваш проект? Напишите нам!</p>
        </div>
        
        <div class="contacts-content">
            <div class="contact-info">
                <div class="contact-item">
                    <div class="contact-icon">
                        <i data-lucide="phone"></i>
                    </div>
                    <div>
                        <h4>Телефон</h4>
                        <a href="tel:<?php echo str_replace([' ', '(', ')', '-'], '', SITE_PHONE); ?>"><?php echo SITE_PHONE; ?></a>
                    </div>
                </div>
                
                <div class="contact-item">
                    <div class="contact-icon">
                        <i data-lucide="mail"></i>
                    </div>
                    <div>
                        <h4>Email</h4>
                        <a href="mailto:<?php echo SITE_EMAIL; ?>"><?php echo SITE_EMAIL; ?></a>
                    </div>
                </div>
                
                <div class="contact-item">
                    <div class="contact-icon">
                        <i data-lucide="clock"></i>
                    </div>
                    <div>
                        <h4>Время работы</h4>
                        <p>Пн-Пт: 9:00 - 18:00</p>
                    </div>
                </div>
            </div>
            
            <form class="contact-form" action="/api/contact.php" method="POST" id="contact-form">
                <input type="hidden" name="csrf_token" value="<?php echo $csrfToken; ?>">
                
                <div class="form-group">
                    <label for="name">Имя *</label>
                    <input type="text" id="name" name="name" required>
                </div>
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>
                
                <div class="form-group">
                    <label for="phone">Телефон</label>
                    <input type="tel" id="phone" name="phone">
                </div>
                
                <div class="form-group">
                    <label for="message">Сообщение *</label>
                    <textarea id="message" name="message" rows="5" required placeholder="Расскажите о вашем проекте..."></textarea>
                </div>
                
                <button type="submit" class="btn btn-gradient btn-full">
                    <i data-lucide="send"></i>
                    Отправить сообщение
                </button>
            </form>
        </div>
    </div>
</section>

<style>
.contacts-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 4rem;
    margin-top: 3rem;
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.contact-icon {
    width: 3rem;
    height: 3rem;
    background: hsl(var(--primary) / 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.contact-icon i {
    width: 1.5rem;
    height: 1.5rem;
    color: hsl(var(--primary));
}

.contact-item h4 {
    font-weight: 600;
    margin-bottom: 0.5rem;
}

.contact-item a {
    color: hsl(var(--primary));
    text-decoration: none;
}

.contact-item a:hover {
    text-decoration: underline;
}

.contact-item p {
    color: hsl(var(--muted-foreground));
    margin: 0;
}

@media (max-width: 768px) {
    .contacts-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}
</style>