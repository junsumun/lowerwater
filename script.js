// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

function toggleMenu() {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isOpen);
    hamburger.setAttribute('aria-label', isOpen ? 'Toggle menu' : 'Close menu');
    mobileMenuOverlay.classList.toggle('active');
    document.body.classList.toggle('menu-open');
}

function closeMenu() {
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Toggle menu');
    mobileMenuOverlay.classList.remove('active');
    document.body.classList.remove('menu-open');
}

if (hamburger) {
    hamburger.addEventListener('click', toggleMenu);
}

// Close menu when clicking on a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});

// Close menu when clicking outside (on overlay background)
mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        closeMenu();
    }
});

// Close menu on window resize (if resizing to desktop)
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        closeMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
        closeMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navbarHeight = 82;
            const offsetTop = target.offsetTop - navbarHeight;
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Language toggle functionality
const langButtons = document.querySelectorAll('.lang-btn');
const langContents = document.querySelectorAll('.lang-content');

langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedLang = button.getAttribute('data-lang');
        
        // Update button states
        langButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        
        // Show/hide content based on selected language
        langContents.forEach(content => {
            if (content.classList.contains(`lang-${selectedLang}`)) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });
});

// Tenant slider functionality
document.querySelectorAll('.tenant-slider').forEach(slider => {
    const slides = slider.querySelectorAll('.tenant-image');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    if (slides.length <= 1) {
        // Hide buttons if only one image
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }
    
    let currentIndex = 0;
    
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
        
        // Update button states
        if (prevBtn) {
            prevBtn.disabled = index === 0;
        }
        if (nextBtn) {
            nextBtn.disabled = index === slides.length - 1;
        }
    }
    
    function nextSlide() {
        if (currentIndex < slides.length - 1) {
            currentIndex++;
            showSlide(currentIndex);
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            showSlide(currentIndex);
        }
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Keyboard navigation for slider
    slider.setAttribute('tabindex', '0');
    slider.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            nextSlide();
        }
    });
    
    // Initialize
    showSlide(0);
});

