// ==================== SMOOTH SCROLL ====================
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

// ==================== SCROLL ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ==================== NAVBAR SCROLL EFFECT ====================
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Change navbar appearance on scroll
    if (currentScroll > 100) {
        nav.style.background = 'rgba(15, 15, 30, 0.98)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.background = 'rgba(15, 15, 30, 0.95)';
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

// ==================== PARALLAX EFFECT ====================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-background');
    
    parallaxElements.forEach(element => {
        if (element) {
            element.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
});

// ==================== STATS COUNTER ANIMATION ====================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-content h3');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/[^0-9]/g, ''));
                if (!isNaN(target)) {
                    animateCounter(stat, target);
                }
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const floatingCard = document.querySelector('.floating-card');
if (floatingCard) {
    statsObserver.observe(floatingCard);
}

// ==================== SERVICE CARDS STAGGER ANIMATION ====================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ==================== CASE CARDS STAGGER ANIMATION ====================
const caseCards = document.querySelectorAll('.case-card');
caseCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ==================== TESTIMONIAL CARDS STAGGER ANIMATION ====================
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ==================== ACTIVE NAV LINK ====================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== LOGO ANIMATION ON HOVER ====================
const logoTexts = document.querySelectorAll('.logo-text');
logoTexts.forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
        this.style.fill = '#FF3D71';
    });
    
    logo.addEventListener('mouseleave', function() {
        this.style.fill = '#F8F9FA';
    });
});

// ==================== RESULT NUMBERS ANIMATION ====================
const resultObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const resultNumbers = entry.target.querySelectorAll('.result-number');
            resultNumbers.forEach(number => {
                number.style.animation = 'none';
                setTimeout(() => {
                    number.style.animation = 'pulse 0.6s ease-out';
                }, 10);
            });
        }
    });
}, { threshold: 0.3 });

caseCards.forEach(card => {
    resultObserver.observe(card);
});

// ==================== MOUSE CURSOR EFFECT (Optional) ====================
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.service-card, .case-card, .testimonial-card');
    
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        }
    });
});

// ==================== MOBILE MENU TOGGLE (if needed later) ====================
const createMobileMenu = () => {
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    
    // Create hamburger button
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '☰';
    hamburger.style.display = 'none';
    hamburger.style.background = 'none';
    hamburger.style.border = 'none';
    hamburger.style.color = 'white';
    hamburger.style.fontSize = '2rem';
    hamburger.style.cursor = 'pointer';
    
    // Toggle menu on click
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
    });
    
    // Show hamburger on mobile
    if (window.innerWidth <= 968) {
        hamburger.style.display = 'block';
    }
    
    navContainer.appendChild(hamburger);
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth <= 968) {
            hamburger.style.display = 'block';
        } else {
            hamburger.style.display = 'none';
            navLinks.classList.remove('mobile-active');
        }
    });
};

// Uncomment to enable mobile menu
// createMobileMenu();

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce scroll events
let scrollTimeout;
const optimizedScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Scroll-dependent code here
    }, 10);
};

window.addEventListener('scroll', optimizedScroll, { passive: true });

// ==================== INITIALIZE ====================
console.log('Clickeame.net - Website Loaded Successfully! 🚀');