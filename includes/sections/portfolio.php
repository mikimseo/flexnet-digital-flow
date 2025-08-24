<?php
// Portfolio Section
$portfolioItems = getPortfolioItems();
// Limit to first 6 items for main page
$limitedPortfolio = array_slice($portfolioItems, 0, 6);
?>
<section id="portfolio" class="section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Портфолио</h2>
            <p class="section-description">Успешные проекты, которые помогли нашим клиентам достичь целей</p>
        </div>
        <div class="portfolio-grid">
            <?php foreach ($limitedPortfolio as $item): ?>
                <div class="portfolio-card card">
                    <?php if (!empty($item['image'])): ?>
                        <img src="<?php echo htmlspecialchars($item['image']); ?>" 
                             alt="<?php echo htmlspecialchars($item['title']); ?>" 
                             loading="lazy">
                    <?php endif; ?>
                    
                    <div class="content">
                        <h3><?php echo htmlspecialchars($item['title']); ?></h3>
                        <p><?php echo htmlspecialchars($item['description']); ?></p>
                        
                        <?php if (!empty($item['technologies'])): ?>
                            <div class="tags">
                                <?php foreach ($item['technologies'] as $tech): ?>
                                    <span class="tag"><?php echo htmlspecialchars($tech); ?></span>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($item['url'])): ?>
                            <a href="<?php echo htmlspecialchars($item['url']); ?>" 
                               target="_blank" 
                               rel="noopener noreferrer" 
                               class="btn btn-outline btn-sm">
                                <i data-lucide="external-link"></i>
                                Смотреть проект
                            </a>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
        
        <div class="text-center" style="margin-top: 3rem;">
            <a href="/portfolio" class="btn btn-primary">
                <i data-lucide="folder-open"></i>
                Все проекты
            </a>
            <a href="#contacts" class="btn btn-outline">
                <i data-lucide="phone"></i>
                Обсудить проект
            </a>
        </div>
    </div>
</section>

<style>
.text-center {
    text-align: center;
}

.btn-sm {
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
}

.portfolio-card .content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.portfolio-card .tags {
    margin-top: auto;
}
</style>