function setupScrollAnimations() {
    const heroContent = document.querySelector('.hero-content');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        if (scrolled > 50) {
            heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.003);
        } else {
            heroContent.style.transform = 'translateY(0)';
            heroContent.style.opacity = 1;
        }
    });
}

setupScrollAnimations();

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
    
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
            updateThemeIcon(isDarkMode);
        });
    }
    
    function updateThemeIcon(isDarkMode) {
        const themeIcon = document.querySelector('.theme-toggle-icon');
        if (themeIcon) {
            themeIcon.className = 'theme-toggle-icon ' + (isDarkMode ? 'fas fa-moon' : 'fas fa-sun');
        }
    }
    
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    
    const menuOverlay = document.createElement('div');
    menuOverlay.classList.add('menu-overlay');
    document.body.appendChild(menuOverlay);
    
    if (menuToggle && navLinksContainer) {
        function toggleMenu() {
            navLinksContainer.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        }
        
        menuToggle.addEventListener('click', toggleMenu);
        
        menuOverlay.addEventListener('click', toggleMenu);
        
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        });
    }
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
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
    
    document.querySelectorAll('.btn').forEach(btn => {
        if (btn.innerHTML === '' && localStorage.getItem('lastButtonText')) {
            btn.innerHTML = localStorage.getItem('lastButtonText');
            localStorage.removeItem('lastButtonText');
        }
    });
    
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
    
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('loading' in HTMLImageElement.prototype) {
        
    } else {
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


