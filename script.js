// Sticky Navbar
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-scale');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(el => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - revealPoint) {
            el.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
  
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// --- Advanced UI Enhancements ---

// Ambient Cursor Glow Spotlight Logic (100% native cursor responsiveness)
const cursorGlow = document.getElementById('cursor-glow');

if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;
    let isVisible = false;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isVisible) {
            cursorGlow.style.opacity = '1';
            isVisible = true;
        }
    });

    window.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
        isVisible = false;
    });

    // High performance RAF loop without blocking the main thread or mouse events
    function animateGlow() {
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;
        cursorGlow.style.left = `${currentX}px`;
        cursorGlow.style.top = `${currentY}px`;
        requestAnimationFrame(animateGlow);
    }
    requestAnimationFrame(animateGlow);
}

// Initialize Vanilla Tilt for 3D Cards
if (typeof VanillaTilt !== 'undefined') {
    VanillaTilt.init(document.querySelectorAll(".glass-card"), {
        max: 10,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });
}

// Initialize Particles.js
function initParticles(theme) {
    if (typeof particlesJS === 'undefined') return;
    
    const isLight = theme === 'light';
    const particleColor = isLight ? "#0284c7" : "#38bdf8"; 
    const lineColor = isLight ? "#94a3b8" : "#0284c7"; 
    
    particlesJS("particles-js", {
        "particles": {
            "number": {
                "value": 60,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": { "value": particleColor },
            "shape": { "type": "circle" },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": lineColor,
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "window",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                "push": { "particles_nb": 4 }
            }
        },
        "retina_detect": true
    });
}

// Theme Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    const themeIcon = themeToggleBtn.querySelector('.icon');
    
    // Check local storage for theme
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'light') {
            themeIcon.textContent = '🌙';
        }
    }
    
    initParticles(currentTheme || 'dark');
    
    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.textContent = '🌞';
            initParticles('dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.textContent = '🌙';
            initParticles('light');
        }
    });
}

// --- Scroll Progress Bar ---
const scrollProgressBar = document.getElementById('scroll-progress-bar');
window.addEventListener('scroll', () => {
    if (scrollProgressBar) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        scrollProgressBar.style.width = scrollPercentage + '%';
    }
});

// --- Typewriter Effect ---
const typedTextSpan = document.querySelector('.typed-text');
const cursorSpan = document.querySelector('.cursor');

const textArray = ["Information System Graduate", "Web Designer", "Data Engineer", "UI/UX Enthusiast"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (!typedTextSpan) return;
    if (charIndex < textArray[textArrayIndex].length) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (!typedTextSpan) return;
    if (charIndex > 0) {
        if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } 
    else {
        cursorSpan.classList.remove("typing");
        textArrayIndex++;
        if(textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() { 
    if(typedTextSpan && textArray.length) setTimeout(type, newTextDelay + 250);
});

// --- Project Capture Preview & Demo Request Logic ---
const imageModal = document.getElementById('imageModal');
const accessModal = document.getElementById('accessModal');
const modalImageElement = document.getElementById('modalImageElement');
const modalImageTitle = document.getElementById('modalImageTitle');
const modalRequestFromImgBtn = document.getElementById('modalRequestFromImgBtn');

const accessProjectName = document.getElementById('accessProjectName');
const accessEmailLink = document.getElementById('accessEmailLink');
const accessContactFormBtn = document.getElementById('accessContactFormBtn');

let currentActiveProject = '';

function openImageModal(imgSrc, projectTitle) {
    currentActiveProject = projectTitle;
    if (modalImageElement) modalImageElement.src = imgSrc;
    if (modalImageTitle) modalImageTitle.innerHTML = `<span>📸</span> ${projectTitle}`;
    if (imageModal) {
        imageModal.classList.add('active');
        imageModal.setAttribute('aria-hidden', 'false');
    }
}

function openAccessModal(projectTitle) {
    currentActiveProject = projectTitle;
    if (accessProjectName) accessProjectName.textContent = projectTitle;
    
    // Set mailto link
    if (accessEmailLink) {
        const subject = encodeURIComponent(`Permintaan Izin Akses Live Demo - ${projectTitle}`);
        const body = encodeURIComponent(`Halo Anzis,\n\nSaya tertarik untuk melihat live demo dari proyek "${projectTitle}". Bolehkah saya diberikan izin akses atau akun demo untuk mencoba aplikasi tersebut?\n\nTerima kasih.`);
        accessEmailLink.href = `mailto:anjisrohman73@gmail.com?subject=${subject}&body=${body}`;
    }

    // Close image modal if open
    if (imageModal) {
        imageModal.classList.remove('active');
        imageModal.setAttribute('aria-hidden', 'true');
    }

    if (accessModal) {
        accessModal.classList.add('active');
        accessModal.setAttribute('aria-hidden', 'false');
    }
}

function closeAllModals() {
    if (imageModal) {
        imageModal.classList.remove('active');
        imageModal.setAttribute('aria-hidden', 'true');
    }
    if (accessModal) {
        accessModal.classList.remove('active');
        accessModal.setAttribute('aria-hidden', 'true');
    }
}

// Bind preview buttons
document.querySelectorAll('.btn-preview-img').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const imgSrc = btn.getAttribute('data-img');
        const title = btn.getAttribute('data-title');
        openImageModal(imgSrc, title);
    });
});

// Bind request access buttons
document.querySelectorAll('.btn-request-access').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const title = btn.getAttribute('data-title');
        openAccessModal(title);
    });
});

// Click card image wrapper directly to preview
document.querySelectorAll('.project-img-wrapper').forEach(wrapper => {
    wrapper.addEventListener('click', () => {
        const previewBtn = wrapper.querySelector('.btn-preview-img');
        if (previewBtn) previewBtn.click();
    });
});

// Request access from inside image lightbox
if (modalRequestFromImgBtn) {
    modalRequestFromImgBtn.addEventListener('click', () => {
        openAccessModal(currentActiveProject);
    });
}

// Scroll to contact form from access modal
if (accessContactFormBtn) {
    accessContactFormBtn.addEventListener('click', () => {
        closeAllModals();
        const contactSection = document.getElementById('contact');
        const messageField = document.getElementById('message');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
        if (messageField) {
            messageField.value = `Halo Anzis, saya ingin meminta izin akses live demo untuk proyek "${currentActiveProject}". Mohon informasi aksesnya, terima kasih!`;
            messageField.focus();
        }
    });
}

// Close modal handlers (close button, backdrop click, Escape key)
document.querySelectorAll('.modal-close, .modal-close-text').forEach(btn => {
    btn.addEventListener('click', closeAllModals);
});

[imageModal, accessModal].forEach(modal => {
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});
