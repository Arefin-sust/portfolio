
        // Scroll Progress Bar
        window.addEventListener('scroll', () => {
            const scrollProgress = document.getElementById('scrollProgress');
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercent = (window.scrollY / scrollHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Disable Save & Print shortcuts
        document.addEventListener("keydown", function (e) {
            if (e.ctrlKey && (e.key === "s" || e.key === "p")) {
                e.preventDefault();
            }
        });
        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Form Submission
        const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! I\'ll get back to you soon.');
        e.target.reset();
    });
}


        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe all experience items for animation
        document.querySelectorAll('.experience-item, .cert-card, .skill-category').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });

        

        // Animated Counter for Stats
        function animateCounter(element, target, duration = 800) {
            const hasPlus = element.textContent.includes('+');
            element.textContent = '0' + (hasPlus ? '+' : '');
            
            const start = 0;
            const increment = target / (duration / 16); // 60fps
            let current = start;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + (hasPlus ? '+' : '');
                }
            };
            
            updateCounter();
        }

        // Observe stats for animation
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    statNumbers.forEach((stat, index) => {
                        setTimeout(() => {
                            const target = parseInt(stat.getAttribute('data-target'));
                            animateCounter(stat, target, 1200);
                        }, index * 200); // Stagger animation
                    });
                    statsObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        const statsContainer = document.querySelector('.stats-container');
        if (statsContainer) {
            statsObserver.observe(statsContainer);
        }
