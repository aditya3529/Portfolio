// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeNavigation();
    initializeScrollAnimations();
    initializeProjectModals();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeScrollToTop();
});

// Navigation functionality
function initializeNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    mobileMenu.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link highlighting
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) {
                    navLink.classList.add('active');
                }
            }
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .timeline-item, .contact-item');
    
    // Add animation classes to elements
    animatedElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Additional animations for hero section
    const heroElements = document.querySelectorAll('.hero-text > *');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        element.style.transitionDelay = `${index * 0.2}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 500);
    });
}

// Project modal functionality
function initializeProjectModals() {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close');
    const projectButtons = document.querySelectorAll('.project-btn');

    // Project data
    const projectData = {
        fintech: {
            title: 'FinTech Mobile Platform',
            overview: 'A comprehensive mobile banking solution that revolutionized user engagement and transaction processing.',
            challenge: 'The existing mobile banking platform had low user adoption rates and slow transaction processing times, leading to customer dissatisfaction and competitive disadvantage.',
            solution: 'Redesigned the entire user experience with a focus on simplicity and speed. Implemented biometric authentication, real-time notifications, and streamlined navigation.',
            results: [
                'Increased user engagement by 340%',
                'Reduced transaction processing time by 60%',
                'Improved customer satisfaction scores by 45%',
                'Decreased customer support tickets by 30%'
            ],
            technologies: ['React Native', 'Node.js', 'MongoDB', 'Redis', 'AWS'],
            duration: '8 months',
            role: 'Lead Product Manager'
        },
        ecommerce: {
            title: 'E-commerce Personalization Engine',
            overview: 'An AI-powered recommendation system that significantly boosted conversion rates and customer satisfaction.',
            challenge: 'Generic product recommendations were leading to poor conversion rates and low customer engagement on the e-commerce platform.',
            solution: 'Developed a machine learning-based personalization engine that analyzes user behavior, purchase history, and preferences to deliver tailored product recommendations.',
            results: [
                'Boosted conversion rates by 45%',
                'Increased average order value by 30%',
                'Improved customer retention by 35%',
                'Enhanced user session duration by 50%'
            ],
            technologies: ['Python', 'TensorFlow', 'Apache Spark', 'PostgreSQL', 'Docker'],
            duration: '6 months',
            role: 'Senior Product Manager'
        },
        saas: {
            title: 'SaaS Analytics Dashboard',
            overview: 'A comprehensive analytics platform that helped enterprise clients reduce churn and improve customer satisfaction.',
            challenge: 'Enterprise clients lacked visibility into their usage patterns and customer behavior, leading to high churn rates and missed optimization opportunities.',
            solution: 'Built an intuitive analytics dashboard with real-time data visualization, predictive analytics, and actionable insights to help clients make data-driven decisions.',
            results: [
                'Reduced client churn by 25%',
                'Improved customer satisfaction scores by 40%',
                'Increased platform usage by 60%',
                'Generated $1.2M in additional revenue'
            ],
            technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'ClickHouse'],
            duration: '10 months',
            role: 'Product Manager'
        }
    };

    // Open modal
    projectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectKey = this.getAttribute('data-project');
            const project = projectData[projectKey];
            
            if (project) {
                modalBody.innerHTML = createProjectModalContent(project);
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function createProjectModalContent(project) {
        return `
            <div class="project-modal-content">
                <h2 class="project-modal-title">${project.title}</h2>
                <div class="project-modal-meta">
                    <span><strong>Duration:</strong> ${project.duration}</span>
                    <span><strong>Role:</strong> ${project.role}</span>
                </div>
                
                <div class="project-modal-section">
                    <h3>Project Overview</h3>
                    <p>${project.overview}</p>
                </div>
                
                <div class="project-modal-section">
                    <h3>Challenge</h3>
                    <p>${project.challenge}</p>
                </div>
                
                <div class="project-modal-section">
                    <h3>Solution</h3>
                    <p>${project.solution}</p>
                </div>
                
                <div class="project-modal-section">
                    <h3>Key Results</h3>
                    <ul class="results-list">
                        ${project.results.map(result => `<li>${result}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-modal-section">
                    <h3>Technologies Used</h3>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <style>
                .project-modal-content {
                    line-height: 1.6;
                }
                
                .project-modal-title {
                    color: hsl(var(--text-primary));
                    margin-bottom: 1rem;
                    font-size: 2rem;
                }
                
                .project-modal-meta {
                    display: flex;
                    gap: 2rem;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid hsl(var(--border));
                    color: hsl(var(--text-secondary));
                }
                
                .project-modal-section {
                    margin-bottom: 2rem;
                }
                
                .project-modal-section h3 {
                    color: hsl(var(--primary-color));
                    margin-bottom: 1rem;
                    font-size: 1.3rem;
                }
                
                .project-modal-section p {
                    color: hsl(var(--text-secondary));
                    font-size: 1.1rem;
                }
                
                .results-list {
                    list-style: none;
                    padding: 0;
                }
                
                .results-list li {
                    padding: 0.5rem 0;
                    color: hsl(var(--text-secondary));
                    position: relative;
                    padding-left: 1.5rem;
                }
                
                .results-list li::before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: hsl(var(--primary-color));
                    font-weight: bold;
                    font-size: 1.2rem;
                }
                
                .tech-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.5rem;
                }
                
                .tech-tag {
                    background: hsla(var(--primary-color), 0.1);
                    color: hsl(var(--primary-color));
                    padding: 0.4rem 0.8rem;
                    border-radius: 20px;
                    font-size: 0.9rem;
                    font-weight: 500;
                }
                
                @media (max-width: 768px) {
                    .project-modal-meta {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                    
                    .project-modal-title {
                        font-size: 1.5rem;
                    }
                }
            </style>
        `;
    }
}

// Contact form functionality
function initializeContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        // In a real application, you would send the data to a server
        console.log('Form submitted:', { name, email, subject, message });
    });
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? 'hsl(120, 70%, 50%)' : 'hsl(0, 70%, 50%)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-md);
            z-index: 9999;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
}

// Smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to top functionality
function initializeScrollToTop() {
    // Create scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: hsl(var(--primary-color));
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: var(--shadow-md);
        transition: var(--transition);
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Hover effect
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-md)';
    });
}

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(function() {
    // Any scroll-based functionality can be added here
}, 100));

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    // In a real application, you would integrate with analytics services
    console.log('Event tracked:', eventName, properties);
}

// Track user interactions
document.addEventListener('click', function(e) {
    const target = e.target;
    
    if (target.classList.contains('btn')) {
        trackEvent('button_click', {
            button_text: target.textContent,
            button_class: target.className
        });
    }
    
    if (target.classList.contains('nav-link')) {
        trackEvent('navigation_click', {
            link_text: target.textContent,
            link_href: target.getAttribute('href')
        });
    }
});
