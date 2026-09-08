// Project Database with detailed information
const projectDetails = {
    ecommerce: {
        title: "E-Commerce Web Platform",
        category: "Full Stack",
        description: "A production-ready eCommerce web application featuring a modern React frontend and a scalable Node.js/Express backend with MongoDB. Implements complete product discovery, dynamic cart state management, secure checkout, and full order processing.",
        features: [
            "JWT-based user authentication and protected customer routes",
            "Dynamic product search, categorization, and pricing filters",
            "Shopping cart with instant quantity updates & local persistence",
            "Integrated payment flow and responsive checkout design",
            "RESTful API endpoints with modular controller architecture"
        ],
        tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "JWT", "REST API"],
        github: "https://github.com/Akashkumar415"
    },
    taskmanager: {
        title: "Task & Project Management System",
        category: "Full Stack",
        description: "A comprehensive project workflow application built with Django and MySQL. Designed to streamline team collaboration through Kanban-style task boards, priority tracking, deadline reminders, and role-based permissions.",
        features: [
            "Role-based access control (Admin, Project Lead, Developer)",
            "Interactive Kanban task progression (To Do, In Progress, Review, Completed)",
            "Automated activity logging and sprint completion stats",
            "Django REST Framework backend powering asynchronous UI updates",
            "Relational database schema with optimized MySQL queries"
        ],
        tags: ["Python", "Django", "Django REST Framework", "MySQL", "JavaScript", "Bootstrap"],
        github: "https://github.com/Akashkumar415"
    },
    realtimechat: {
        title: "Real-Time Chat & Collaboration App",
        category: "Full Stack",
        description: "An instant messaging platform engineered with React and Socket.io for low-latency bi-directional communication. Enables users to connect in real-time with group chat rooms, direct messaging, and active presence indicators.",
        features: [
            "Real-time event-driven messaging with Socket.io WebSockets",
            "Private 1-on-1 direct messages and multi-user room channels",
            "Online / offline status detection and live typing notifications",
            "MongoDB persistence for chat histories and timestamps",
            "Clean, dark-mode glassmorphic interface with mobile responsiveness"
        ],
        tags: ["React.js", "Socket.io", "Node.js", "Express.js", "MongoDB", "CSS3"],
        github: "https://github.com/Akashkumar415"
    },
    restauth: {
        title: "RESTful API & Authentication Microservice",
        category: "Backend",
        description: "A secure, decoupled backend authentication and resource service. Implements modern security standards including JSON Web Tokens (JWT) with automated refresh rotation, rate limiting, and comprehensive OpenAPI / Swagger documentation.",
        features: [
            "Token-based authentication with access and refresh token lifecycle",
            "Password hashing using Argon2 / bcrypt with strict validation",
            "API rate limiting and throttling to prevent abuse and brute force",
            "Interactive Swagger / OpenAPI UI for endpoint testing",
            "Modular database models with automated test suite"
        ],
        tags: ["Python", "Django REST", "PostgreSQL", "JWT", "Swagger UI", "REST APIs"],
        github: "https://github.com/Akashkumar415"
    },
    devportfolio: {
        title: "Developer Portfolio Website",
        category: "Frontend",
        description: "A fast, sleek, and high-performance personal portfolio built from the ground up. Highlights technical expertise, featured work, and interactive details with modern UI aesthetics, glassmorphism, and responsive design.",
        features: [
            "Modern dark theme with neon emerald accents and glassmorphism",
            "Interactive project category filtering and modal detail popups",
            "Smooth scroll navigation and scroll-triggered navbar effects",
            "Zero third-party framework dependencies for blazing fast load speed",
            "Fully responsive across mobile, tablet, and desktop viewports"
        ],
        tags: ["HTML5", "CSS3", "JavaScript", "FontAwesome", "Responsive Design"],
        github: "https://github.com/Akashkumar415/portfolio-website"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });
    }

    // 2. Smooth Scrolling with Safe Null Checks
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    const icon = menuToggle?.querySelector('i');
                    if (icon) {
                        icon.classList.add('fa-bars');
                        icon.classList.remove('fa-times');
                    }
                }

                // If target is inside or is modal, close modal first
                closeModal();

                // Scroll smoothly with offset for fixed navbar
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navbarHeight + 10;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Navbar background and active section indicator on scroll
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        // Navbar blur intensity on scroll
        if (navbar) {
            window.scrollY > 50
                ? navbar.style.backgroundColor = 'rgba(10,10,10,0.98)'
                : navbar.style.backgroundColor = 'rgba(10,10,10,0.95)';
        }

        // Active link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active-nav');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-nav');
            }
        });
    });

    // 4. Project Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.transition = 'all 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 5. Project Details Modal Logic
    const modal = document.getElementById('projectModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalFeatures = document.getElementById('modalFeatures');
    const modalTags = document.getElementById('modalTags');
    const modalGithubLink = document.getElementById('modalGithubLink');

    function openModal(projectId) {
        const data = projectDetails[projectId];
        if (!data || !modal) return;

        modalTitle.textContent = data.title;
        modalCategory.textContent = data.category;
        modalDescription.textContent = data.description;

        // Render features list
        modalFeatures.innerHTML = '';
        data.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            modalFeatures.appendChild(li);
        });

        // Render tech tags
        modalTags.innerHTML = '';
        data.tags.forEach(tag => {
            const span = document.createElement('span');
            span.textContent = tag;
            modalTags.appendChild(span);
        });

        if (modalGithubLink) {
            modalGithubLink.href = data.github;
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Attach click event to Details buttons
    document.querySelectorAll('.details-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const projectId = button.getAttribute('data-project');
            if (projectId) {
                e.preventDefault();
                openModal(projectId);
            }
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Escape key closes modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // 6. Contact Form Submission & Direct Message Handlers
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    const whatsappSendBtn = document.getElementById('whatsappSendBtn');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;

            const name = document.getElementById('contactName').value;
            const email = document.getElementById('contactEmail').value;
            const subject = document.getElementById('contactSubject').value;
            const message = document.getElementById('contactMessage').value;

            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Email...';
            submitBtn.disabled = true;

            try {
                const response = await fetch("https://formsubmit.co/ajax/8e2c42d048189913948ba4e5db4978f8", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        _subject: `New Message from Portfolio: ${subject}`,
                        subject_title: subject,
                        message: message,
                        _captcha: false,
                        _template: "table"
                    })
                });

                const data = await response.json();

                if (response.ok || data.success === "true" || data.success === true) {
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! Your email has been delivered to <strong>akashkumar22112005@gmail.com</strong>.';
                    contactForm.reset();
                } else {
                    formStatus.className = 'form-status';
                    formStatus.style.background = 'rgba(239, 68, 68, 0.15)';
                    formStatus.style.border = '1px solid #ef4444';
                    formStatus.style.color = '#fca5a5';
                    formStatus.style.display = 'block';
                    formStatus.innerHTML = `<i class="fas fa-info-circle"></i> ${data.message || 'Please tap "ACTIVATE FORM" in your Gmail inbox to complete setup.'}`;
                }
            } catch (err) {
                formStatus.className = 'form-status';
                formStatus.style.background = 'rgba(59, 130, 246, 0.15)';
                formStatus.style.border = '1px solid #3b82f6';
                formStatus.style.color = '#93c5fd';
                formStatus.style.display = 'block';
                formStatus.innerHTML = '<i class="fas fa-info-circle"></i> Tap <strong>"Chat on WhatsApp"</strong> or check your Gmail for the activation confirmation.';
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                setTimeout(() => {
                    formStatus.style.display = 'none';
                }, 12000);
            }
        });
    }

    // WhatsApp Direct Send Button Handler
    if (whatsappSendBtn) {
        whatsappSendBtn.addEventListener('click', () => {
            const name = document.getElementById('contactName')?.value || '';
            const email = document.getElementById('contactEmail')?.value || '';
            const subject = document.getElementById('contactSubject')?.value || '';
            const message = document.getElementById('contactMessage')?.value || '';

            let waText = `Hi Akash! I saw your portfolio.`;
            if (name) waText += ` My name is ${name}.`;
            if (email) waText += ` (Email: ${email})`;
            if (subject) waText += ` Subject: ${subject}.`;
            if (message) waText += ` Message: ${message}`;

            window.open(`https://wa.me/917050328688?text=${encodeURIComponent(waText)}`, '_blank');
        });
    }
});
