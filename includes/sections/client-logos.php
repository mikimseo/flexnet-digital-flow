<?php
// Client Logos Section
$clientLogos = getClientLogos();
?>
<section id="client-logos" class="section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Нам доверяют</h2>
            <p class="section-description">Компании, которые выбрали нас для своего цифрового развития</p>
        </div>
        <div class="client-logos-grid">
            <?php foreach ($clientLogos as $logo): ?>
                <div class="client-logo">
                    <img src="<?php echo htmlspecialchars($logo['path']); ?>" 
                         alt="<?php echo htmlspecialchars($logo['name']); ?>" 
                         class="logo-image">
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<style>
.client-logos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
    align-items: center;
}

.client-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: var(--radius);
    background: hsl(var(--card));
    border: 1px solid hsl(var(--border));
    transition: var(--transition-smooth);
}

.client-logo:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-card);
}

.logo-image {
    max-width: 100%;
    max-height: 60px;
    filter: grayscale(100%);
    opacity: 0.7;
    transition: var(--transition-smooth);
}

.client-logo:hover .logo-image {
    filter: grayscale(0%);
    opacity: 1;
}

@media (max-width: 768px) {
    .client-logos-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
}
</style>