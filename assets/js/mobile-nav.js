// FlexNet Digital - Mobile Bottom Navigation

document.addEventListener('DOMContentLoaded', function() {
    initMobileBottomNav();
});

function initMobileBottomNav() {
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const sections = document.querySelectorAll('section[id]');
    
    // Set up click handlers for mobile nav
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetSection = this.getAttribute('data-section');
            const target = document.getElementById(targetSection);
            
            if (target) {
                // Remove active class from all items
                mobileNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                });
                
                // Add active class to clicked item
                this.classList.add('active');
                
                // Scroll to section
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active state on scroll
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const correspondingNavItem = document.querySelector(`[data-section="${sectionId}"]`);
                
                if (correspondingNavItem) {
                    // Remove active from all
                    mobileNavItems.forEach(item => item.classList.remove('active'));
                    // Add active to current
                    correspondingNavItem.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}