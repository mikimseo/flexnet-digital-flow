// FlexNet Digital - PWA JavaScript

class PWAManager {
    constructor() {
        this.init();
    }

    init() {
        this.detectPWA();
        this.setupMobileNavigation();
        this.setupSmoothScrolling();
        this.setupInstallPrompt();
    }

    // Detect if running as PWA
    detectPWA() {
        const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                     window.navigator.standalone ||
                     document.referrer.includes('android-app://');
        
        if (isPWA) {
            document.body.classList.add('is-pwa');
        }
    }

    // Setup mobile bottom navigation
    setupMobileNavigation() {
        const navItems = document.querySelectorAll('.mobile-nav-item');
        const sections = document.querySelectorAll('section[id]');

        // Handle navigation clicks
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all items
                navItems.forEach(navItem => navItem.classList.remove('active'));
                
                // Add active class to clicked item
                item.classList.add('active');
                
                // Get target section
                const targetSection = item.getAttribute('data-section');
                const target = document.getElementById(targetSection) || 
                              document.querySelector(`section[data-section="${targetSection}"]`);
                
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Update active navigation on scroll
        window.addEventListener('scroll', () => {
            this.updateActiveNavigation();
        });
    }

    // Update active navigation based on scroll position
    updateActiveNavigation() {
        const sections = [
            { id: 'hero', navData: 'home' },
            { id: 'services', navData: 'services' },
            { id: 'portfolio', navData: 'portfolio' },
            { id: 'contacts', navData: 'contacts' }
        ];

        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const element = document.getElementById(section.id);
            if (element) {
                const elementTop = element.offsetTop;
                const elementHeight = element.offsetHeight;
                
                if (scrollPos >= elementTop && scrollPos < elementTop + elementHeight) {
                    // Remove active from all nav items
                    document.querySelectorAll('.mobile-nav-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    
                    // Add active to current section nav item
                    const activeNavItem = document.querySelector(`[data-section="${section.navData}"]`);
                    if (activeNavItem) {
                        activeNavItem.classList.add('active');
                    }
                }
            }
        });
    }

    // Setup smooth scrolling for all anchor links
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Setup PWA install prompt
    setupInstallPrompt() {
        let deferredPrompt;

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            deferredPrompt = e;
            
            // Show custom install button if needed
            this.showInstallButton(deferredPrompt);
        });

        window.addEventListener('appinstalled', () => {
            console.log('PWA was installed');
            // Hide install button if showing
            this.hideInstallButton();
        });
    }

    showInstallButton(deferredPrompt) {
        // Create install button if it doesn't exist
        let installButton = document.getElementById('install-app-button');
        
        if (!installButton) {
            installButton = document.createElement('button');
            installButton.id = 'install-app-button';
            installButton.className = 'btn btn-primary install-button';
            installButton.innerHTML = '<i data-lucide="download"></i> Установить приложение';
            installButton.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1000;
                display: none;
            `;
            document.body.appendChild(installButton);
            
            // Re-initialize lucide icons
            if (window.lucide) {
                lucide.createIcons();
            }
        }

        // Show button on mobile only
        if (window.innerWidth <= 768) {
            installButton.style.display = 'flex';
        }

        installButton.addEventListener('click', async () => {
            // Show the install prompt
            deferredPrompt.prompt();
            
            // Wait for the user to respond to the prompt
            const { outcome } = await deferredPrompt.userChoice;
            
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            
            deferredPrompt = null;
            this.hideInstallButton();
        });
    }

    hideInstallButton() {
        const installButton = document.getElementById('install-app-button');
        if (installButton) {
            installButton.style.display = 'none';
        }
    }
}

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PWAManager();
});

// Handle online/offline status
window.addEventListener('online', () => {
    console.log('App is online');
    document.body.classList.remove('offline');
});

window.addEventListener('offline', () => {
    console.log('App is offline');
    document.body.classList.add('offline');
});