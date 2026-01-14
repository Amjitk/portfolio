// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

// Check for saved user preference, if any, on load of the website
const savedTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';

if (savedTheme) {
    html.className = savedTheme;
} else {
    html.className = systemTheme;
}

themeToggle.addEventListener('click', () => {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.remove('light');
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile Menu Toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Spotlight Effect Mouse Tracking
document.querySelectorAll('.bento-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        item.style.setProperty('--mouse-x', `${x}px`);
        item.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Horizontal Scroll Controls
const scrollContainer = document.querySelector('.project-scroll-container');
const scrollLeftBtn = document.getElementById('scroll-left');
const scrollRightBtn = document.getElementById('scroll-right');

if (scrollContainer && scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: -350, behavior: 'smooth' });
    });

    scrollRightBtn.addEventListener('click', () => {
        scrollContainer.scrollBy({ left: 350, behavior: 'smooth' });
    });
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Animation (Intersection Observer)
// Scroll Animation (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('show');
                entry.target.classList.remove('hidden');
            }, delay);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animatedElements = document.querySelectorAll('.section, .hero-content, .project-compact-card, .timeline-item, .skill-pill');

animatedElements.forEach((el, index) => {
    el.classList.add('hidden');
    
    // Add staggered delay for skill pills
    if (el.classList.contains('skill-pill')) {
         // Find index within parent
         const indexInParent = Array.from(el.parentNode.children).indexOf(el);
         el.dataset.delay = indexInParent * 50; // 50ms stagger for faster flow
    } else if (el.classList.contains('timeline-item')) {
         const indexInParent = Array.from(el.parentNode.children).indexOf(el);
         el.dataset.delay = indexInParent * 100;
    }
    
    observer.observe(el);
});


// Scroll Spy: Highlight Nav Items
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

const scrollSpyOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Triggers when section is near middle-top
    threshold: 0
};

const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Remove active from all
            navItems.forEach(link => link.classList.remove('active'));
            
            // Add active to current
            const id = entry.target.getAttribute('id');
            const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });
}, scrollSpyOptions);

sections.forEach(section => {
    scrollSpyObserver.observe(section);
});
