// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 3D Cube Animation
const cubeContainer = document.getElementById('cube-container');
const cube = document.createElement('div');
cube.className = 'cube';
cubeContainer.appendChild(cube);

// Create cube faces
const faces = ['front', 'back', 'right', 'left', 'top', 'bottom'];
faces.forEach(face => {
    const faceElement = document.createElement('div');
    faceElement.className = `cube-face cube-face-${face}`;
    cube.appendChild(faceElement);
});

// Add CSS for cube
const style = document.createElement('style');
style.textContent = `
    .cube {
        width: 200px;
        height: 200px;
        position: relative;
        transform-style: preserve-3d;
        animation: rotate 10s infinite linear;
    }

    .cube-face {
        position: absolute;
        width: 200px;
        height: 200px;
        background: linear-gradient(45deg, var(--primary-color), var(--accent-color));
        border: 2px solid white;
        opacity: 0.8;
    }

    .cube-face-front { transform: translateZ(100px); }
    .cube-face-back { transform: translateZ(-100px) rotateY(180deg); }
    .cube-face-right { transform: rotateY(90deg) translateZ(100px); }
    .cube-face-left { transform: rotateY(-90deg) translateZ(100px); }
    .cube-face-top { transform: rotateX(90deg) translateZ(100px); }
    .cube-face-bottom { transform: rotateX(-90deg) translateZ(100px); }

    @keyframes rotate {
        from { transform: rotateX(0) rotateY(0); }
        to { transform: rotateX(360deg) rotateY(360deg); }
    }
`;

document.head.appendChild(style);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-message success';
            successMessage.textContent = 'Thank you for your message! I will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 5 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Show error message
        const errorMessage = document.createElement('div');
        errorMessage.className = 'form-message error';
        errorMessage.textContent = 'Sorry, there was an error sending your message. Please try again later.';
        contactForm.appendChild(errorMessage);
        
        // Remove error message after 5 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
});

// Copy email to clipboard
const email = 'your.email@example.com'; // Replace with your email
const copyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
        alert('Email copied to clipboard!');
    });
};

// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Update the CTA button click handler
document.querySelector('.cta-button').addEventListener('click', () => {
    scrollToSection('about');
});

// Dark Mode Toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

// Check for saved theme preference or set dark theme as default
const savedTheme = localStorage.getItem('theme') || 'dark';
body.setAttribute('data-theme', savedTheme);
darkModeToggle.checked = savedTheme === 'dark';

// Toggle dark mode
darkModeToggle.addEventListener('change', () => {
    if (darkModeToggle.checked) {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const menuLinks = document.querySelectorAll('.nav-links a');
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when a link is clicked
    menuLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}); 