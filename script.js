/**
 * Le Bistrot des Amis - Main JavaScript File
 * Modern café website with interactive features
 */

// DOM Elements
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const menuTabs = document.querySelectorAll('.menu__tab');
const menuCategories = document.querySelectorAll('.menu__category');
const galleryItems = document.querySelectorAll('.gallery__item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
const contactForm = document.getElementById('contact-form');

/**
 * Initialize all functionality when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeScrollEffects();
    initializeMenuTabs();
    initializeGallery();
    initializeContactForm();
    initializeSmoothScrolling();
});

/**
 * Navigation functionality
 */
function initializeNavigation() {
    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

/**
 * Scroll effects and active navigation
 */
function initializeScrollEffects() {
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Header background on scroll
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active navigation link
        updateActiveNavigation();
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
}

/**
 * Update active navigation link based on scroll position
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

/**
 * Menu tabs functionality
 */
function initializeMenuTabs() {
    menuTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and categories
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding category
            this.classList.add('active');
            const targetCategory = document.getElementById(targetTab);
            if (targetCategory) {
                targetCategory.classList.add('active');
                
                // Add fade-in animation
                targetCategory.style.opacity = '0';
                setTimeout(() => {
                    targetCategory.style.opacity = '1';
                    targetCategory.classList.add('fade-in');
                }, 50);
            }
        });
    });
}

/**
 * Gallery and lightbox functionality
 */
function initializeGallery() {
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            const imageAlt = this.querySelector('img').getAttribute('alt');
            
            lightboxImage.src = imageSrc;
            lightboxImage.alt = imageAlt;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox__overlay')) {
            closeLightbox();
        }
    });
    
    // Close lightbox with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/**
 * Close lightbox modal
 */
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/**
 * Contact form validation and submission
 */
function initializeContactForm() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    
    // Real-time validation
    nameInput.addEventListener('blur', () => validateField('name'));
    emailInput.addEventListener('blur', () => validateField('email'));
    messageInput.addEventListener('blur', () => validateField('message'));
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            submitForm();
        }
    });
}

/**
 * Validate individual form field
 */
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error styling
    field.classList.remove('error');
    errorElement.textContent = '';
    
    switch(fieldName) {
        case 'name':
            if (field.value.trim().length < 2) {
                errorMessage = 'Le nom doit contenir au moins 2 caractères.';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value.trim())) {
                errorMessage = 'Veuillez saisir une adresse email valide.';
                isValid = false;
            }
            break;
            
        case 'message':
            if (field.value.trim().length < 10) {
                errorMessage = 'Le message doit contenir au moins 10 caractères.';
                isValid = false;
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        errorElement.textContent = errorMessage;
    }
    
    return isValid;
}

/**
 * Validate entire form
 */
function validateForm() {
    const nameValid = validateField('name');
    const emailValid = validateField('email');
    const messageValid = validateField('message');
    
    return nameValid && emailValid && messageValid;
}

/**
 * Submit form (demo version)
 */
function submitForm() {
    const formButton = contactForm.querySelector('.form__button');
    const originalText = formButton.textContent;
    
    // Show loading state
    formButton.textContent = 'Envoi en cours...';
    formButton.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        formButton.textContent = 'Message envoyé !';
        formButton.style.backgroundColor = '#48BB78';
        
        // Show success message
        showNotification('Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.', 'success');
        
        // Reset form
        setTimeout(() => {
            contactForm.reset();
            formButton.textContent = originalText;
            formButton.disabled = false;
            formButton.style.backgroundColor = '';
        }, 3000);
        
    }, 2000);
}

/**
 * Show notification message
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <p>${message}</p>
            <button class="notification__close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#48BB78' : '#3182CE'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        z-index: 3000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

/**
 * Smooth scrolling for anchor links
 */
function initializeSmoothScrolling() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Intersection Observer for fade-in animations
 */
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.menu__item, .gallery__item, .contact__item');
    animatedElements.forEach(el => observer.observe(el));
}

/**
 * Performance optimizations
 */
function initializePerformanceOptimizations() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

/**
 * Accessibility enhancements
 */
function initializeAccessibility() {
    // Skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Aller au contenu principal';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: fixed;
        top: -50px;
        left: 10px;
        background-color: var(--color-gold);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 9999;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '10px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-50px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Enhanced keyboard navigation for menu tabs
    menuTabs.forEach((tab, index) => {
        tab.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                const direction = e.key === 'ArrowRight' ? 1 : -1;
                const nextIndex = (index + direction + menuTabs.length) % menuTabs.length;
                menuTabs[nextIndex].click();
                menuTabs[nextIndex].focus();
            }
        });
    });
}

// Initialize performance optimizations and accessibility when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollAnimations();
    initializePerformanceOptimizations();
    initializeAccessibility();
});

/**
 * CSS for animations (injected dynamically)
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form__input.error,
    .form__textarea.error {
        border-color: #E53E3E;
        box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }
    
    .skip-link:focus {
        top: 10px !important;
    }
    
    .notification__content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification__close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 1rem;
        padding: 0 0.5rem;
    }
`;
document.head.appendChild(style);

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// Service worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Uncomment if you want to add PWA functionality
        // navigator.serviceWorker.register('/sw.js');
    });
}
