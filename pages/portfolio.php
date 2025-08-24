<?php
// Portfolio Page - All Projects
$portfolioItems = getPortfolioItems();
?>
<div class="portfolio-page">
    <div class="container">
        <div class="section-header">
            <h1 class="section-title">Все проекты</h1>
            <p class="section-description">Полное портфолио наших успешных проектов</p>
        </div>
        
        <div class="portfolio-grid">
            <?php foreach ($portfolioItems as $item): ?>
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
                        
                        <div class="card-actions">
                            <?php if (!empty($item['url'])): ?>
                                <a href="<?php echo htmlspecialchars($item['url']); ?>" 
                                   target="_blank" 
                                   rel="noopener noreferrer" 
                                   class="btn btn-primary btn-sm">
                                    <i data-lucide="external-link"></i>
                                    Смотреть
                                </a>
                            <?php endif; ?>
                            <a href="#contacts" class="btn btn-outline btn-sm">
                                <i data-lucide="phone"></i>
                                Обсудить
                            </a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</div>