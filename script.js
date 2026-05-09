// ============================================
// VAVENILI GROOMING ACADEMY
// Interactive Features & Animations
// ============================================

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initFAQ();
    initScrollIndicator();
    initFormHandling();
    initModals();
});

// ============================================
// NAVIGATION HANDLING
// ============================================

function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navOverlay = document.getElementById('navOverlay');
    const navOverlayClose = document.querySelector('.nav-overlay-close');
    const navDock = document.querySelector('.nav-dock');
    const navItems = document.querySelectorAll('.nav-item');

    // Menu toggle
    menuToggle.addEventListener('click', () => {
        navOverlay.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu
    navOverlayClose.addEventListener('click', () => {
        navOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
    });

    // Close on nav link click
    document.querySelectorAll('.nav-overlay-link').forEach(link => {
        link.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Show nav dock on scroll
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercentage > 15) {
            navDock.classList.add('visible');
        } else {
            navDock.classList.remove('visible');
        }

        // Update indicator position
        updateNavIndicator();
    });

    // Nav item click handler
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = item.getAttribute('href');
            const section = document.querySelector(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function updateNavIndicator() {
    const navItems = document.querySelectorAll('.nav-item');
    const navIndicator = document.querySelector('.nav-indicator');
    const sections = document.querySelectorAll('.section');
    
    let currentSection = 1;
    
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2) {
            currentSection = index + 1;
        }
    });

    const activeItem = document.querySelector(`[data-section="${currentSection}"]`);
    if (activeItem && navIndicator) {
        const itemPosition = activeItem.offsetTop;
        navIndicator.style.top = itemPosition + 'px';
    }
}

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');

        trigger.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ============================================
// SCROLL INDICATOR
// ============================================

function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// ============================================
// FORM HANDLING
// ============================================

function initFormHandling() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            // Simulate form submission
            console.log('Form submitted:', formData);
            
            // Reset form
            contactForm.reset();
            
            // Show success message (in real implementation, you'd send to server)
            showNotification('Dziękujemy za wiadomość! Wkrótce się skontaktujemy.');
        });
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: #5C4A3D;
        color: #F6F2EC;
        padding: 16px 24px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// MODALS
// ============================================

function initModals() {
    const privacyLink = document.getElementById('privacyLink');
    const termsLink = document.getElementById('termsLink');
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modalBackdrops = document.querySelectorAll('.modal-backdrop');

    // Open privacy modal
    privacyLink.addEventListener('click', () => {
        privacyModal.classList.add('active');
    });

    // Open terms modal
    termsLink.addEventListener('click', () => {
        termsModal.classList.add('active');
    });

    // Close modals
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.closest('.modal').classList.remove('active');
        });
    });

    modalBackdrops.forEach(backdrop => {
        backdrop.addEventListener('click', () => {
            backdrop.closest('.modal').classList.remove('active');
        });
    });

    // Modal sidebar navigation
    document.querySelectorAll('.modal-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.modal-nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            const target = link.getAttribute('href');
            const element = document.querySelector(target);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ============================================
// PARALLAX EFFECTS
// ============================================

window.addEventListener('scroll', () => {
    const imageFrames = document.querySelectorAll('.image-frame');
    
    imageFrames.forEach(frame => {
        const rect = frame.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        
        if (scrollPercent > 0 && scrollPercent < 1) {
            frame.style.transform = `translateY(${scrollPercent * 10}px) translateX(${scrollPercent * 5}px)`;
        }
    });
});

// ============================================
// REVEAL ANIMATIONS ON SCROLL
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.course-card, .flow-step, .gallery-item').forEach(el => {
    observer.observe(el);
});

// ============================================
// UTILITY ANIMATIONS
// ============================================

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

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.documentElement.style.scrollBehavior = 'smooth';