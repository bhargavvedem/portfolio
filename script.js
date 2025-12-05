/* ==================================
   1. VARIABLES & SETUP
   ================================== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const themeButton = document.getElementById('theme-toggle');
const darkTheme = 'dark';
const iconTheme = 'light-icon'; // The icon to show when in dark mode (sun)

/* ==================================
   2. MENU SHOW / HIDE
   ================================== */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/* Remove Menu Mobile on Click Link */
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================================
   3. THEME TOGGLE
   ================================== */
// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.documentElement.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'; // Simplified logic

if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.documentElement.className = selectedTheme;
    // We assume the icon logic handles itself via CSS based on the class
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.documentElement.classList.toggle(darkTheme);
    document.documentElement.classList.toggle('light'); // toggle light class for specificity if needed

    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme());
});


/* ==================================
   4. MODAL LOGIC
   ================================== */
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelectorAll('[data-close]');
const projectBtns = document.querySelectorAll('.project__modal-btn');
const projectsData = JSON.parse(document.getElementById('projects-data').textContent);

// Open Modal
projectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const card = e.target.closest('.project__card');
        const id = parseInt(card.dataset.id);
        const project = projectsData.find(p => p.id === id);

        if (project) {
            renderModalContent(project);
            openModal();
        }
    });
});

function renderModalContent(project) {
    const techStack = project.tech.map(t => `<span class="modal__tech-item">${t}</span>`).join('');

    // modalContent.innerHTML = `
    //     <h3 class="modal__title">${project.title}</h3>
    //     <p class="modal__description">${project.desc}</p>
    //     <div class="modal__tech-list">${techStack}</div>
    //     <p class="modal__details">${project.details}</p>
    //     <br>
    //     <a href="#" class="btn btn--primary" onclick="alert('This is a placeholder link to the live demo.')">Live Demo</a>
    //     <a href="#" class="btn btn--secondary" onclick="alert('This is a placeholder link to the code.')">View Code</a>
    // `;

    modalContent.innerHTML = `
        <h3 class="modal__title">${project.title}</h3>
        <p class="modal__description">${project.desc}</p>
        <div class="modal__tech-list">${techStack}</div>
        <p class="modal__details">${project.details}</p>
    `;
}

function openModal() {
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
    // Save current focus
    // Trap focus logic can be added here for full a11y
}

// Close Modal
closeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.remove('modal--open');
        modal.setAttribute('aria-hidden', 'true');
    });
});

// Close when clicking outside content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('modal--open');
        modal.setAttribute('aria-hidden', 'true');
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
        modal.classList.remove('modal--open');
        modal.setAttribute('aria-hidden', 'true');
    }
});


