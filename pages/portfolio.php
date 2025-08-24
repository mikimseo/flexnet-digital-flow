<!-- Portfolio Hero -->
<section class="page-hero">
    <div class="container">
        <div class="page-hero-content">
            <h1 class="page-title">Портфолио</h1>
            <p class="page-description">
                Примеры наших успешных проектов в различных сферах
            </p>
        </div>
    </div>
</section>

<!-- Portfolio Grid -->
<section class="portfolio-section">
    <div class="container">
        <div class="portfolio-grid">
            <?php foreach (getPortfolioItems() as $item): ?>
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
    </div>
</section>