// DOM Elements
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const themeToggle = document.getElementById('theme-toggle');
const scrollTop = document.getElementById('scroll-top');
const header = document.getElementById('header');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

// Navigation functionality
function showMenu() {
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }
}

function hideMenu() {
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
}

// Remove menu on mobile when clicking nav links
function removeMenuMobile() {
    const navLinks = document.querySelectorAll('.nav__link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });
}

// Theme functionality - Fixed implementation
function initTheme() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let currentTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply theme immediately
    applyTheme(currentTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(currentTheme);
            localStorage.setItem('theme', currentTheme);
        });
    }
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-color-scheme', theme);
    
    if (themeToggle) {
        const sunIcon = themeToggle.querySelector('.fa-sun');
        const moonIcon = themeToggle.querySelector('.fa-moon');
        
        if (theme === 'dark') {
            sunIcon.style.opacity = '0.5';
            moonIcon.style.opacity = '1';
            sunIcon.style.color = 'rgba(255, 255, 255, 0.5)';
            moonIcon.style.color = 'rgba(255, 255, 255, 1)';
        } else {
            sunIcon.style.opacity = '1';
            moonIcon.style.opacity = '0.5';
            sunIcon.style.color = 'rgba(255, 193, 7, 1)';
            moonIcon.style.color = 'rgba(108, 117, 125, 0.5)';
        }
    }
}

// Header scroll effect
function scrollHeader() {
    const scrollHeaderHandler = () => {
        if (window.scrollY >= 80) {
            header.classList.add('scroll-header');
        } else {
            header.classList.remove('scroll-header');
        }
    };
    
    if (header) {
        window.addEventListener('scroll', scrollHeaderHandler);
        // Call once to set initial state
        scrollHeaderHandler();
    }
}

// Active link highlighting
function scrollActive() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    const scrollActiveHandler = () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active-link'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active-link');
                }
            }
        });
    };
    
    window.addEventListener('scroll', scrollActiveHandler);
    // Call once to set initial state
    scrollActiveHandler();
}

// Scroll to top functionality - Fixed
function initScrollTop() {
    if (scrollTop) {
        const scrollTopHandler = () => {
            if (window.scrollY >= 560) {
                scrollTop.classList.add('show-scroll');
            } else {
                scrollTop.classList.remove('show-scroll');
            }
        };
        
        window.addEventListener('scroll', scrollTopHandler);
        
        scrollTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Call once to set initial state
        scrollTopHandler();
    }
}

// Smooth scrolling for navigation links - Fixed implementation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header ? header.offsetHeight : 70;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link immediately
                document.querySelectorAll('.nav__link').forEach(navLink => {
                    navLink.classList.remove('active-link');
                });
                link.classList.add('active-link');
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Trigger skill bars animation
                if (entry.target.classList.contains('skills') || entry.target.id === 'skills') {
                    setTimeout(() => animateSkillBars(), 500);
                }
                
                // Trigger counter animation
                if (entry.target.classList.contains('hero') || entry.target.id === 'home') {
                    setTimeout(() => animateCounters(), 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe sections for fade-in animations
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
    
    // Observe cards and other elements
    const cards = document.querySelectorAll('.project__card, .education__card, .skill');
    cards.forEach(card => {
        card.classList.add('fade-in');
        observer.observe(card);
    });
}

// Skill bars animation - Fixed
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill__progress');
    
    skillBars.forEach((bar, index) => {
        const width = bar.getAttribute('data-width');
        if (width) {
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200 * index); // Stagger the animations
        }
    });
}

// Counter animation - Fixed
function animateCounters() {
    const counters = document.querySelectorAll('.hero__stat-number');
    
    counters.forEach(counter => {
        const originalText = counter.textContent;
        const target = parseFloat(originalText.replace('+', ''));
        let current = 0;
        
        const increment = target / 60; // 60 frames for 1 second at 60fps
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (originalText.includes('.')) {
                    counter.textContent = current.toFixed(1);
                } else {
                    const displayValue = Math.floor(current);
                    counter.textContent = displayValue + (originalText.includes('+') ? '+' : '');
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = originalText; // Restore original text
            }
        };
        
        updateCounter();
    });
}

// Form validation and submission - Fixed
function initContactForm() {
    if (contactForm) {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('.form-control');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => validateField(input));
            input.addEventListener('input', () => clearError(input));
        });
        
        // Form submission
        contactForm.addEventListener('submit', handleFormSubmission);
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    // Remove existing error styling
    field.classList.remove('error');
    field.style.borderColor = '';
    
    // Required field validation
    if (value === '') {
        isValid = false;
        errorMessage = `${capitalize(fieldName)} is required.`;
    }
    
    // Specific field validations
    switch (fieldName) {
        case 'email':
            if (value && !isValidEmail(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
            }
            break;
        case 'name':
            if (value && value.length < 2) {
                isValid = false;
                errorMessage = 'Name must be at least 2 characters long.';
            }
            break;
        case 'message':
            if (value && value.length < 10) {
                isValid = false;
                errorMessage = 'Message must be at least 10 characters long.';
            }
            break;
    }
    
    // Display error
    if (errorElement) {
        if (!isValid) {
            field.style.borderColor = 'var(--color-error)';
            errorElement.textContent = errorMessage;
            errorElement.style.display = 'block';
        } else {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    }
    
    return isValid;
}

function clearError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';
    const errorElement = document.getElementById(`${field.name}-error`);
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
}

function validateForm() {
    const inputs = contactForm.querySelectorAll('.form-control');
    let isFormValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
    });
    
    return isFormValid;
}

function handleFormSubmission(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        showFormStatus('Please correct the errors above.', 'error');
        return;
    }
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Show loading state
    showFormStatus('Sending message...', 'info');
    
    // Disable form during submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate API call
    setTimeout(() => {
        // Reset form
        contactForm.reset();
        
        // Re-enable form
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
        
        // Show success message
        showFormStatus(`Thank you, ${data.name}! Your message has been sent successfully. I'll get back to you soon!`, 'success');
        
        // Hide success message after 7 seconds
        setTimeout(() => {
            hideFormStatus();
        }, 7000);
        
    }, 2000);
}

function showFormStatus(message, type) {
    if (formStatus) {
        formStatus.textContent = message;
        formStatus.className = `form-status ${type}`;
        formStatus.style.display = 'block';
        
        // Scroll form status into view
        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

function hideFormStatus() {
    if (formStatus) {
        formStatus.style.display = 'none';
        formStatus.className = 'form-status';
    }
}

// Project card hover effects - Fixed
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project__card');
    
    projectCards.forEach(card => {
        const overlay = card.querySelector('.project__overlay');
        
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
            if (overlay) {
                overlay.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            if (overlay) {
                overlay.style.opacity = '0';
            }
        });
        
        // Add click handlers for project buttons
        const projectButtons = card.querySelectorAll('.project__button');
        projectButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                // Button functionality is handled by the href attributes
            });
        });
    });
}

// Utility functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Typing animation for hero section
function initTypingAnimation() {
    const subtitle = document.querySelector('.hero__subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        subtitle.style.borderRight = '2px solid var(--color-primary)';
        
        let index = 0;
        const typeWriter = () => {
            if (index < text.length) {
                subtitle.textContent += text.charAt(index);
                index++;
                setTimeout(typeWriter, 80);
            } else {
                // Remove cursor after typing is complete
                setTimeout(() => {
                    subtitle.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        // Start typing animation after a delay
        setTimeout(typeWriter, 1500);
    }
}

// Parallax effect for hero section
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const parallaxHandler = () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.backgroundPosition = `center ${scrolled * parallaxSpeed}px`;
            }
        };
        
        window.addEventListener('scroll', parallaxHandler, { passive: true });
    }
}

// Lazy loading for images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // ESC key to close mobile menu
        if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
        
        // Enter key to toggle theme
        if (e.key === 'Enter' && document.activeElement === themeToggle) {
            themeToggle.click();
        }
    });
}

// Performance optimization - debounce scroll events
function debounce(func, wait) {
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

// Initialize all functionality
function init() {
    console.log('Initializing portfolio...');
    
    // Navigation
    showMenu();
    hideMenu();
    removeMenuMobile();
    
    // Theme - Initialize first
    initTheme();
    
    // Scroll effects
    scrollHeader();
    scrollActive();
    initScrollTop();
    
    // Smooth scrolling - Critical fix
    initSmoothScrolling();
    
    // Animations
    initScrollAnimations();
    setTimeout(initTypingAnimation, 500); // Delay typing animation
    
    // Form
    initContactForm();
    
    // Effects
    initProjectCardEffects();
    initParallaxEffect();
    initLazyLoading();
    
    // Accessibility
    initKeyboardNavigation();
    
    console.log('Portfolio initialized successfully! 🚀');
}

// Wait for DOM to be fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden - pause animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Page is visible - resume animations
        document.body.style.animationPlayState = 'running';
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth > 968) {
        navMenu.classList.remove('show-menu');
    }
}, 250));

// Export functions for testing (if in Node.js environment)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        isValidEmail,
        capitalize,
        debounce
    };
}