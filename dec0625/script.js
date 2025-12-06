/**
 * vedem-portfolio script.js
 * Handles Theme Toggle, Mobile Navigation, and Modals
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNav();
    initModals();
    initForm();
});

/* =========================================
   1. Theme Toggle
   ========================================= */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;

    // Check localStorage preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
    } else {
        body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    themeBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/* =========================================
   2. Mobile Navigation
   ========================================= */
function initNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

/* =========================================
   3. Project Modals
   ========================================= */
const projectData = {
    'project-1': {
        title: 'SCOT (Supply Chain Control Tower)',
        content: `
            <p><strong>Technologies:</strong> Angular, Spring Boot, Microservices</p>
            <p>A centralized platform that acts as the nerve center of the supply chain. It enables real-time monitoring, visibility, and control over operations for rapid response and optimization.</p>
            <h4>Key Features:</h4>
            <ul>
                <li>Real-time data visualization of supply chain nodes.</li>
                <li>Integrated with ERP, WMS, and TMS systems.</li>
                <li>Customizable dashboards for different user roles.</li>
            </ul>
        `
    },
    'project-2': {
        title: 'Cont AI',
        content: `
            <p><strong>Technologies:</strong> Machine Learning, OpenLayers, Analytics</p>
            <p>Provides visualization and prioritization of inbound warehouse truck activities.</p>
            <h4>Key Features:</h4>
            <ul>
                <li>ML model for delay prediction without external APIs.</li>
                <li>PO visibility on OpenLayers maps (ships, trucks, ports).</li>
                <li>What-if simulations for logistics planning.</li>
                <li>Hot receipt prioritization.</li>
            </ul>
        `
    },
    'project-3': {
        title: 'Dock Management',
        content: `
            <p><strong>Technologies:</strong> AI/ML, WebSockets, Real-time</p>
            <p>AI-driven application for license plate recognition at warehouse entry to streamline dock scheduling.</p>
            <h4>Key Features:</h4>
            <ul>
                <li>Automated License Plate Recognition (ALPR).</li>
                <li>WebSocket integration triggers WMS events instantly.</li>
                <li>Real-time dock scheduling and status updates.</li>
            </ul>
        `
    }
};

function initModals() {
    const triggers = document.querySelectorAll('.project-trigger');
    const backdrop = document.getElementById('modal-backdrop');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.getElementById('modal-close');
    let focusedElementBeforeModal;

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const projectId = trigger.getAttribute('data-id');
            const data = projectData[projectId];

            if (data) {
                modalTitle.textContent = data.title;
                modalBody.innerHTML = data.content;
                openModal();
            }
        });
    });

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && backdrop.classList.contains('active')) {
            closeModal();
        }
    });

    function openModal() {
        focusedElementBeforeModal = document.activeElement;
        backdrop.hidden = false;
        // Small timeout to allow display change before opacity transition
        setTimeout(() => backdrop.classList.add('active'), 10);
        closeBtn.focus();
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        backdrop.classList.remove('active');
        setTimeout(() => {
            backdrop.hidden = true;
            document.body.style.overflow = '';
            if (focusedElementBeforeModal) focusedElementBeforeModal.focus();
        }, 300);
    }
}

/* =========================================
   4. Contact Form Fallback
   ========================================= */
function initForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (e) => {
        // Since we are using mailto: in the action, 
        // we can just optionally validate or show a message.
        // But 'mailto' creates a new window/tab or opens the mail client directly.
        // We'll trust the browser default behavior for mailto.

        // Simple client-side validation check (HTML5 does most of it)
        if (!form.checkValidity()) {
            e.preventDefault();
            alert('Please fill out all fields correctly.');
        }
    });
}
