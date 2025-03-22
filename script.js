document.addEventListener('DOMContentLoaded', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        navLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, { threshold: 0.5, rootMargin: "-50px 0px" });
            
            sections.forEach(section => {
                observer.observe(section);
            });
            
            
            const menuToggle = document.querySelector('.menu-toggle');
            const navLinksContainer = document.querySelector('.nav-links');
            
            menuToggle.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active');
            });
    
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navLinksContainer.classList.remove('active');
                });
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
                
               
                link.addEventListener('click', function(e) {
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

