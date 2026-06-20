document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // Cart counter
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');
    const addCartButtons = document.querySelectorAll('.add-cart-btn');

    addCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            cartCount++;
            cartCountElement.textContent = cartCount;

            const originalText = this.textContent;
            this.textContent = '✓ Added';
            this.style.background = '#22c55e';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 1500);
        });
    });

    // Search products
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const productCards = document.querySelectorAll('.product-card');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        productCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const desc = card.querySelector('.product-desc').textContent.toLowerCase();

            if (title.includes(searchTerm) || desc.includes(searchTerm) || searchTerm === '') {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Mobile menu toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    menuBtn.addEventListener('click', () => {
        const isOpen = navLinksContainer.style.display === 'flex';

        navLinksContainer.style.display = isOpen ? 'none' : 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '70px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        navLinksContainer.style.padding = '1rem';
        navLinksContainer.style.zIndex = '999';
    });

    // Contact form
    const contactForm = document.querySelector('.contact-form form');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Your message has been sent.');
        contactForm.reset();
    });

    // Navbar shadow on scroll
    const navbar = document.querySelector('.navbar');

    function updateNavbar() {
        if (window.scrollY > 40) {
            navbar.style.boxShadow = '0 14px 35px rgba(0, 0, 0, 0.18)';
        } else {
            navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.12)';
        }
    }

    window.addEventListener('scroll', updateNavbar);

    // Hero CTA
    const heroBtn = document.querySelector('.hero-btn');
    heroBtn.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({
            behavior: 'smooth'
        });
    });
});