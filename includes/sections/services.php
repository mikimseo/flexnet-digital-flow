<?php
// Services Section
$services = getServices();
?>
<section id="services" class="section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Наши услуги</h2>
            <p class="section-description">Комплексные решения для цифровой трансформации вашего бизнеса</p>
        </div>
        <div class="services-grid">
            <?php foreach ($services as $service): ?>
                <div class="service-card card">
                    <div class="icon">
                        <i data-lucide="<?php echo htmlspecialchars($service['icon']); ?>"></i>
                    </div>
                    <h3><?php echo htmlspecialchars($service['title']); ?></h3>
                    <p><?php echo htmlspecialchars($service['description']); ?></p>
                    
                    <?php if (!empty($service['features'])): ?>
                        <ul class="service-features">
                            <?php foreach ($service['features'] as $feature): ?>
                                <li class="feature-item">
                                    <i data-lucide="check" class="feature-icon"></i>
                                    <?php echo htmlspecialchars($feature); ?>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                    
                    <?php if (!empty($service['price'])): ?>
                        <div class="service-price">
                            <?php echo htmlspecialchars($service['price']); ?>
                        </div>
                    <?php endif; ?>
                    
                    <a href="#contacts" class="btn btn-primary btn-full">
                        Заказать
                    </a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<style>
.service-features {
    list-style: none;
    margin: 1.5rem 0;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.feature-icon {
    width: 1rem;
    height: 1rem;
    color: hsl(var(--primary));
    flex-shrink: 0;
}

.service-price {
    font-size: 1.25rem;
    font-weight: 700;
    color: hsl(var(--primary));
    margin: 1.5rem 0;
    text-align: center;
}

.btn-full {
    width: 100%;
    margin-top: auto;
}

.service-card {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>