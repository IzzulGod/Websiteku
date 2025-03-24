document.addEventListener('DOMContentLoaded', () => {
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    } else {
        document.body.classList.remove('dark-mode');
        updateThemeIcon(false);
    }
    
    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            updateThemeIcon(isDarkMode);
        });
    }
    
    // Update theme icon based on current mode
    function updateThemeIcon(isDarkMode) {
        const themeIcon = document.querySelector('.theme-toggle-icon');
        if (themeIcon) {
            themeIcon.className = 'theme-toggle-icon ' + (isDarkMode ? 'fas fa-sun' : 'fas fa-moon');
        }
    }
    
    // Intersection Observer for active navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Use IntersectionObserver with a bit of performance optimization
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "-50px 0px"
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Mobile menu toggle with optimized event listener
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });
    }
    
    // Add click handlers to nav links to close mobile menu
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Fix for button text on external links
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        const originalText = link.innerHTML;
        
        link.addEventListener('mouseout', function() {
            setTimeout(() => {
                if (this.innerHTML === '') {
                    this.innerHTML = originalText;
                }
            }, 100);
        });
        
        link.addEventListener('click', function() {
            if (this.classList.contains('btn')) {
                localStorage.setItem('lastButtonText', this.innerHTML);
            }
        });
    });
    
    // Restore button text if needed
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.innerHTML === '' && localStorage.getItem('lastButtonText')) {
            btn.innerHTML = localStorage.getItem('lastButtonText');
            localStorage.removeItem('lastButtonText');
        }
    });
    
    // Fix for back/forward navigation
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) {
            document.querySelectorAll('.btn').forEach(btn => {
                if (btn.textContent.trim() === '') {
                    if (btn.closest('.cert-content')) {
                        btn.textContent = 'Lihat Sertifikat';
                    }
                    else if (btn.classList.contains('project-link')) {
                        btn.innerHTML = 'Kunjungi <i class="fas fa-external-link-alt"></i>';
                    }
                }
            });
        }
    });
    
    // Optimize images loading
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        // No additional action needed as you already have loading="lazy" in your HTML
    } else {
        // Fallback for browsers that don't support native lazy loading
        const lazyImageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImageObserver.unobserve(lazyImage);
                }
            });
        });
        
        lazyImages.forEach(image => {
            lazyImageObserver.observe(image);
        });
    }
});