document.addEventListener('DOMContentLoaded', () => {
    const productsGrid = document.querySelector('.product-grid');
    const cartCountEl = document.querySelector('.cart-count');
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const heroBtn = document.querySelector('.hero-btn');
    const contactForm = document.querySelector('.contact-form form');
    const navbar = document.querySelector('.navbar');

    let cartCount = 0;
    let allProducts = [];

    function formatPrice(price) {
        return `₹${Number(price).toLocaleString('en-IN')}`;
    }

    function renderProducts(products) {
        if (!productsGrid) return;

        productsGrid.innerHTML = products.map(p => `
            <article class="product-card" data-name="${p.name.toLowerCase()}" data-category="${p.category.toLowerCase()}">
                <div class="product-image">
                    <img src="${p.image}" alt="${p.name}">
                    ${p.badge ? `<div class="product-badge">${p.badge}</div>` : ''}
                </div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="product-desc">${p.description}</p>
                    <div class="product-price">
                        <span class="price">${formatPrice(p.price)}</span>
                        <span class="original-price">${formatPrice(p.originalPrice)}</span>
                    </div>
                    <button type="button" class="add-cart-btn" data-id="${p.id}">Add to Cart</button>
                </div>
            </article>
        `).join('');

        attachCartListeners();
    }

    function attachCartListeners() {
        const buttons = document.querySelectorAll('.add-cart-btn');
        if (!buttons.length) return;

        buttons.forEach(btn => {
            btn.addEventListener('click', function () {
                cartCount++;
                if (cartCountEl) cartCountEl.textContent = cartCount;

                const original = this.textContent;
                this.textContent = '✓ Added';
                this.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
                this.style.boxShadow = '0 16px 30px rgba(34, 197, 94, 0.28)';

                setTimeout(() => {
                    this.textContent = original;
                    this.style.background = '';
                    this.style.boxShadow = '';
                }, 1200);
            });
        });
    }

    async function loadProducts() {
        try {
            const res = await fetch('assets/data/products.json');
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            allProducts = await res.json();
            renderProducts(allProducts);
        } catch (e) {
            console.error('Products load failed:', e);
            if (productsGrid) {
                productsGrid.innerHTML = '<p style="padding:20px;text-align:center;color:#fff;">Products could not be loaded.</p>';
            }
        }
    }

    function performSearch() {
        const term = searchInput.value.toLowerCase().trim();
        const filtered = allProducts.filter(p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term) ||
            p.category.toLowerCase().includes(term) ||
            term === ''
        );
        renderProducts(filtered);
    }

    searchButton?.addEventListener('click', performSearch);
    searchInput?.addEventListener('keyup', e => {
        if (e.key === 'Enter') performSearch();
        if (e.key === 'Escape') {
            searchInput.value = '';
            renderProducts(allProducts);
        }
    });

    menuBtn?.addEventListener('click', () => {
        const isOpen = navLinksContainer.style.display === 'flex';
        navLinksContainer.style.display = isOpen ? 'none' : 'flex';
        navLinksContainer.style.flexDirection = 'column';
        navLinksContainer.style.position = 'absolute';
        navLinksContainer.style.top = '70px';
        navLinksContainer.style.left = '0';
        navLinksContainer.style.width = '100%';
        navLinksContainer.style.padding = '1rem';
        navLinksContainer.style.zIndex = '999';
        navLinksContainer.style.background = 'rgba(9,13,26,0.96)';
        navLinksContainer.style.backdropFilter = 'blur(18px)';
        navLinksContainer.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
    });

    heroBtn?.addEventListener('click', () => {
        document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    });

    contactForm?.addEventListener('submit', e => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const original = btn?.textContent || 'Send Message';
        if (btn) {
            btn.textContent = 'Message Sent ✓';
            btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        }
        setTimeout(() => {
            if (btn) {
                btn.textContent = original;
                btn.style.background = '';
            }
            contactForm.reset();
        }, 1600);
    });

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 40
                ? '0 14px 35px rgba(0,0,0,0.18)'
                : '0 10px 30px rgba(0,0,0,0.12)';
        }
    });

    loadProducts();
});
