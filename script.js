document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.product-grid');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const cartCountElement = document.querySelector('.cart-count');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const heroBtn = document.querySelector('.hero-btn');
    const contactForm = document.querySelector('.contact-form form');
    const navbar = document.querySelector('.navbar');

    let cartCount = 0;
    let allProducts = [];
    let searchTimeout;

    function formatPrice(price) {
        return `₹${Number(price).toLocaleString('en-IN')}`;
    }

    function pulseButton(button, active = true) {
        button.style.transform = active ? 'translateY(-2px) scale(1.02)' : '';
        button.style.boxShadow = active
            ? '0 18px 35px rgba(124, 92, 255, 0.28)'
            : '';
    }

    function setButtonFeedback(button, state) {
        if (state === 'success') {
            button.textContent = '✓ Added';
            button.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
            button.style.boxShadow = '0 16px 30px rgba(34, 197, 94, 0.28)';
        } else if (state === 'loading') {
            button.textContent = 'Adding...';
            button.style.opacity = '0.9';
        } else {
            button.textContent = button.dataset.originalText || 'Add to Cart';
            button.style.background = '';
            button.style.boxShadow = '';
            button.style.opacity = '';
        }
    }

    function enhanceButton(button) {
        button.addEventListener('mouseenter', () => pulseButton(button, true));
        button.addEventListener('mouseleave', () => pulseButton(button, false));
        button.addEventListener('focus', () => pulseButton(button, true));
        button.addEventListener('blur', () => pulseButton(button, false));
    }

    function renderProducts(products) {
        productsGrid.innerHTML = products.map(product => `
            <article class="product-card" data-name="${product.name.toLowerCase()}" data-category="${product.category.toLowerCase()}">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="product-desc">${product.description}</p>
                    <div class="product-price">
                        <span class="price">${formatPrice(product.price)}</span>
                        <span class="original-price">${formatPrice(product.originalPrice)}</span>
                    </div>
                    <button class="add-cart-btn" type="button" data-id="${product.id}">Add to Cart</button>
                </div>
            </article>
        `).join('');

        document.querySelectorAll('.add-cart-btn').forEach(button => {
            button.dataset.originalText = button.textContent;
            enhanceButton(button);

            button.addEventListener('click', function () {
                if (this.classList.contains('busy')) return;

                this.classList.add('busy');
                setButtonFeedback(this, 'loading');

                setTimeout(() => {
                    cartCount++;
                    cartCountElement.textContent = cartCount;

                    setButtonFeedback(this, 'success');

                    setTimeout(() => {
                        setButtonFeedback(this, 'reset');
                        this.classList.remove('busy');
                    }, 1200);
                }, 180);
            });
        });
    }

    async function loadProducts() {
        try {
            const response = await fetch('assets/data/products.json');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            allProducts = await response.json();
            renderProducts(allProducts);
        } catch (error) {
            console.error('Products could not be loaded:', error);
            productsGrid.innerHTML = '<p style="padding:20px;text-align:center;">Products could not be loaded.</p>';
        }
    }

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        const filtered = allProducts.filter(product => {
            const name = product.name.toLowerCase();
            const desc = product.description.toLowerCase();
            const category = product.category.toLowerCase();
            return (
                name.includes(searchTerm) ||
                desc.includes(searchTerm) ||
                category.includes(searchTerm) ||
                searchTerm === ''
            );
        });

        productsGrid.animate(
            [{ opacity: 0.65, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
            { duration: 220, easing: 'ease-out' }
        );

        renderProducts(filtered);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    function updateActiveLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            if (window.scrollY >= sectionTop) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }

    function updateNavbar() {
        navbar.style.boxShadow = window.scrollY > 40
            ? '0 14px 35px rgba(0, 0, 0, 0.18)'
            : '0 10px 30px rgba(0, 0, 0, 0.12)';
    }

    menuBtn.addEventListener('click', () => {
        const isOpen = navLinksContainer.style.display === 'flex';

        navLinksContainer.style.display = isOpen ? 'none' : 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '70px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.padding = '1rem';
        navLinksContainer.style.zIndex = '999';
        navLinksContainer.style.background = 'rgba(9, 13, 26, 0.96)';
        navLinksContainer.style.backdropFilter = 'blur(18px)';
        navLinksContainer.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    });

    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 180);
    });

    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') performSearch();
        if (e.key === 'Escape') {
            searchInput.value = '';
            renderProducts(allProducts);
        }
    });

    heroBtn.addEventListener('mouseenter', () => pulseButton(heroBtn, true));
    heroBtn.addEventListener('mouseleave', () => pulseButton(heroBtn, false));
    heroBtn.addEventListener('click', () => {
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const original = btn.textContent;
        btn.textContent = 'Message Sent ✓';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
            contactForm.reset();
        }, 1800);
    });

    window.addEventListener('scroll', () => {
        updateActiveLink();
        updateNavbar();
    });

    loadProducts();
});