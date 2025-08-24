<?php
// Reviews Section
$testimonials = getTestimonials();
?>
<section id="reviews" class="section">
    <div class="container">
        <div class="section-header">
            <h2 class="section-title">Отзывы клиентов</h2>
            <p class="section-description">Что говорят о нас наши клиенты</p>
        </div>
        <div class="reviews-grid">
            <?php foreach ($testimonials as $testimonial): ?>
                <div class="review-card card">
                    <div class="rating">
                        <?php for ($i = 1; $i <= 5; $i++): ?>
                            <i data-lucide="star" class="star <?php echo $i <= $testimonial['rating'] ? 'filled' : ''; ?>"></i>
                        <?php endfor; ?>
                    </div>
                    
                    <div class="text">
                        "<?php echo htmlspecialchars($testimonial['text']); ?>"
                    </div>
                    
                    <div class="author">
                        <?php if (!empty($testimonial['avatar'])): ?>
                            <img src="<?php echo htmlspecialchars($testimonial['avatar']); ?>" 
                                 alt="<?php echo htmlspecialchars($testimonial['name']); ?>" 
                                 loading="lazy">
                        <?php else: ?>
                            <div class="avatar-placeholder">
                                <i data-lucide="user"></i>
                            </div>
                        <?php endif; ?>
                        
                        <div class="info">
                            <h4><?php echo htmlspecialchars($testimonial['name']); ?></h4>
                            <p><?php echo htmlspecialchars($testimonial['position']); ?></p>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<style>
.star.filled {
    color: #fbbf24;
}

.star:not(.filled) {
    color: hsl(var(--muted-foreground));
}

.avatar-placeholder {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background: hsl(var(--muted));
    display: flex;
    align-items: center;
    justify-content: center;
    color: hsl(var(--muted-foreground));
}
</style>