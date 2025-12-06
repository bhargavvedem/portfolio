/* ==================================
   1. VARIABLES & SETUP
   ================================== */
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const themeButton = document.getElementById('theme-toggle');
const darkTheme = 'dark';
const iconTheme = 'light-icon';

/* ==================================
   2. DATA LOADING & RENDERING
   ================================== */
async function loadData() {
    try {
        const response = await fetch('data.json');
        const data = await response.json();

        renderHero(data.hero);
        renderAbout(data.about);
        renderSkills(data.skills);
        renderExperience(data.experience);
        renderProjects(data.projects);
        renderEducation(data.education, data.certifications);
        renderContact(data.contact);
        renderFooter(data.contact);

        // Re-initialize event listeners for dynamic content
        initializeProjectModals(data.projects);

    } catch (error) {
        console.error('Error loading data:', error);
        document.body.innerHTML = '<p class="error-msg" style="text-align:center; padding: 2rem;">Error loading portfolio data. Please ensure you are running a local server.</p>';
    }
}

function renderHero(hero) {
    const container = document.getElementById('hero-container');
    container.innerHTML = `
        <div class="hero__content">
            <h1 class="hero__title">${hero.title}</h1>
            <h2 class="hero__subtitle">${hero.subtitle}</h2>
            <p class="hero__description">${hero.description}</p>
            <div class="hero__btns">
                ${hero.buttons.map(btn => `<a href="${btn.link}" class="btn ${btn.class}">${btn.text}</a>`).join('')}
            </div>
        </div>
        <div class="hero__image-wrapper">
            <div class="hero__blob"></div>
            <img src="${hero.profileImage}" alt="Profile" class="hero__img" width="300" height="400" loading="eager">
        </div>
    `;
}

function renderAbout(about) {
    document.getElementById('about-title').textContent = about.title;
    document.getElementById('about-data').innerHTML = about.paragraphs.map(p => `<p class="about__description">${p}</p>`).join('');
}

function renderSkills(skills) {
    const container = document.getElementById('skills-container');
    container.innerHTML = skills.map(category => `
        <div class="skills__content">
            <h3 class="skills__title">${category.category}</h3>
            <div class="skills__box">
                <div class="skills__group">
                    ${category.items.map(skill => `
                        <div class="skills__data">
                            <h4 class="skills__name">${skill.name}</h4>
                            <div class="skills__bar"><span class="skills__percentage" style="width: ${skill.percentage};"></span></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function renderExperience(experience) {
    const container = document.getElementById('experience-container');
    container.innerHTML = experience.map(job => `
        <div class="experience__card">
            <div class="experience__header">
                <h3 class="experience__role">${job.role}</h3>
                <span class="experience__company">${job.company}</span>
                <span class="experience__date">${job.date}</span>
            </div>
            <ul class="experience__list">
                ${job.tasks.map(task => `<li>${task}</li>`).join('')}
            </ul>
        </div>
    `).join('');
}

function renderProjects(projects) {
    const container = document.getElementById('projects-container');
    container.innerHTML = projects.map(project => `
        <article class="project__card" data-id="${project.id}">
            <div class="project__img-box">
                <div class="project__placeholder-img">${project.img}</div>
            </div>
            <div class="project__content">
                <h3 class="project__title">${project.title}</h3>
                <p class="project__description">${project.desc.substring(0, 100)}...</p>
                <div class="project__tags">
                    ${project.tech.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
                </div>
                <button class="btn btn--sm btn--outline project__modal-btn">View Details</button>
            </div>
        </article>
    `).join('');
}

function renderEducation(education, certifications) {
    document.getElementById('education-container').innerHTML = education.map(edu => `
        <div class="education__card">
            <h3 class="education__degree">${edu.degree}</h3>
            <p class="education__school">${edu.school}</p>
            <p class="education__year">${edu.year}</p>
        </div>
    `).join('');

    document.getElementById('certifications-list').innerHTML = certifications.map(cert => `<li>${cert}</li>`).join('');
}

function renderContact(contact) {
    document.getElementById('contact-container').innerHTML = `
        <div class="contact__card">
            <i class="contact__icon">✉</i>
            <h3 class="contact__card-title">Email</h3>
            <span class="contact__card-data">${contact.email}</span>
            <a href="https://mail.google.com" target="_blank" class="contact__button">Write me <span class="contact__arrow">→</span></a>
        </div>
        <div class="contact__card">
            <i class="contact__icon">📱</i>
            <h3 class="contact__card-title">Phone</h3>
            <span class="contact__card-data">${contact.phone}</span>
        </div>
        <div class="contact__card">
            <i class="contact__icon">💼</i>
            <h3 class="contact__card-title">LinkedIn</h3>
            <span class="contact__card-data">${contact.linkedin.text.replace('https://', '')}</span>
            <a href="${contact.linkedin.url}" target="_blank" rel="noreferrer" class="contact__button">Connect <span class="contact__arrow">→</span></a>
        </div>
    `;
}

function renderFooter(contact) {
    document.getElementById('footer-social').innerHTML = `
        <a href="${contact.linkedin.url}" class="footer__social-link" target="_blank" aria-label="LinkedIn">LinkedIn</a>
    `;
}

/* ==================================
   3. MENU SHOW / HIDE
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
const navLink = document.querySelectorAll('.nav__link');
function linkAction() {
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ==================================
   4. THEME TOGGLE
   ================================== */
const selectedTheme = localStorage.getItem('selected-theme');
const getCurrentTheme = () => document.documentElement.classList.contains(darkTheme) ? 'dark' : 'light';

if (selectedTheme) document.documentElement.className = selectedTheme;

themeButton.addEventListener('click', () => {
    document.documentElement.classList.toggle(darkTheme);
    document.documentElement.classList.toggle('light');
    localStorage.setItem('selected-theme', getCurrentTheme());
});

/* ==================================
   5. MODAL LOGIC
   ================================== */
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelectorAll('[data-close]');

function initializeProjectModals(projectsData) {
    const projectsContainer = document.getElementById('projects-container');

    projectsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('project__modal-btn')) {
            const card = e.target.closest('.project__card');
            const id = parseInt(card.dataset.id);
            const project = projectsData.find(p => p.id === id);

            if (project) {
                renderModalContent(project);
                openModal();
            }
        }
    });
}

function renderModalContent(project) {
    const techStack = project.tech.map(t => `<span class="modal__tech-item">${t}</span>`).join('');
    modalContent.innerHTML = `
        <h3 class="modal__title">${project.title}</h3>
        <p class="modal__description">${project.desc}</p>
        <div class="modal__tech-list">${techStack}</div>
        <p class="modal__details">${project.details}</p>
        <br>
        <a href="#" class="btn btn--primary" onclick="alert('This is a placeholder link to the live demo.')">Live Demo</a>
        <a href="#" class="btn btn--secondary" onclick="alert('This is a placeholder link to the code.')">View Code</a>
    `;
}

function openModal() {
    modal.classList.add('modal--open');
    modal.setAttribute('aria-hidden', 'false');
}

closeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.classList.remove('modal--open');
        modal.setAttribute('aria-hidden', 'true');
    });
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('modal--open');
        modal.setAttribute('aria-hidden', 'true');
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('modal--open')) {
        modal.classList.remove('modal--open');
        modal.setAttribute('aria-hidden', 'true');
    }
});

// Initialize
loadData();
