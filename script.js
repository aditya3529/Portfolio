// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
function toggleMobileNav() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// Close mobile nav when clicking on a link
function closeMobileNav() {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

// Smooth scrolling for navigation links
function smoothScroll(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100; // Offset for better detection

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            // Remove active class from all nav links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to current nav link
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

// Navbar background on scroll
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'hsl(var(--white))';
        navbar.style.boxShadow = '0 2px 10px hsl(var(--shadow))';
    } else {
        navbar.style.backgroundColor = 'hsl(var(--white) / 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// Intersection Observer for fade-in animations
function createIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .education-card, .skills-category, .project-card, .hero-content'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Typing animation for hero title
function createTypingAnimation() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;

    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let i = 0;
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
        }
    }, 100);
}

// Smooth reveal animation for elements
function revealOnScroll() {
    const reveals = document.querySelectorAll('.timeline-item, .education-card, .skills-category, .project-card');
    
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
function initializeAnimations() {
    // Set initial states for animated elements
    const animatedElements = document.querySelectorAll('.timeline-item, .education-card, .skills-category, .project-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
}

// Contact form functionality (if needed in future)
function initializeContactForm() {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        const link = item.querySelector('a');
        if (link && link.href.startsWith('mailto:')) {
            item.addEventListener('click', (e) => {
                if (e.target !== link) {
                    window.location.href = link.href;
                }
            });
        }
    });
}

// Initialize clickable project cards
function initializeProjectCards() {
    // First, make all project cards clickable
    const allProjectCards = document.querySelectorAll('.project-card');
    
    allProjectCards.forEach((card, index) => {
        // Define which cards should link to detail pages
        let href = null;
        const title = card.querySelector('h3').textContent.trim();
        
        if (title.includes('Insurance Policy Compliance')) {
            href = 'project-insurance-compliance.html';
        } else if (title.includes('E-marketplace Implementation')) {
            href = 'project-beepkart.html';
        } else if (title.includes('Global Content Syndication')) {
            href = 'project-content-syndication.html';
        }
        
        if (href) {
            card.classList.add('clickable-card');
            card.setAttribute('data-href', href);
            card.style.cursor = 'pointer';
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            
            // Add click handler
            card.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('Navigating to:', href); // Debug log
                window.location.href = href;
            });
            
            // Handle keyboard navigation
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    console.log('Keyboard navigation to:', href); // Debug log
                    window.location.href = href;
                }
            });
        }
    });
    
    console.log('Project cards initialized'); // Debug log
}

// Optimize scroll performance with throttling
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize components
    initializeAnimations();
    createIntersectionObserver();
    initializeContactForm();
    initializeProjectCards();
    
    // Delay typing animation slightly for better effect
    setTimeout(createTypingAnimation, 500);

    // Mobile navigation
    hamburger.addEventListener('click', toggleMobileNav);
    
    // Navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            smoothScroll(targetId);
            closeMobileNav();
        });
    });

    // Close mobile nav when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            closeMobileNav();
        }
    });

    // Scroll events with throttling for better performance
    const throttledScrollHandler = throttle(() => {
        updateActiveNavLink();
        updateNavbarBackground();
        revealOnScroll();
    }, 16); // ~60fps

    window.addEventListener('scroll', throttledScrollHandler);

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileNav();
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        closeMobileNav();
    }
    
    // Navigate with arrow keys when focus is on nav
    if (document.activeElement.classList.contains('nav-link')) {
        const currentIndex = Array.from(navLinks).indexOf(document.activeElement);
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % navLinks.length;
            navLinks[nextIndex].focus();
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + navLinks.length) % navLinks.length;
            navLinks[prevIndex].focus();
        }
    }
});

// Add touch support for better mobile experience
let touchStartY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const touchDiff = touchStartY - touchY;
    
    // Add momentum scrolling effects if needed
    if (Math.abs(touchDiff) > 5) {
        updateActiveNavLink();
        updateNavbarBackground();
    }
}, { passive: true });

// Performance optimization: Preload critical resources
function preloadCriticalResources() {
    // Preload Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.as = 'style';
    document.head.appendChild(fontLink);
}

// Initialize preloading
preloadCriticalResources();

// Export functions for potential testing or external use
window.PortfolioApp = {
    toggleMobileNav,
    smoothScroll,
    updateActiveNavLink,
    updateNavbarBackground
};
