// Simple front-end cart using localStorage
const CART_KEY = "mkp_cart";

// ===== Helper functions =====

function getCart() {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    try {
        return JSON.parse(raw);
    } catch {
        return [];
    }
}

function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function findItem(cart, id) {
    return cart.find((item) => item.id === id);
}

function formatMoney(amount) {
    return amount.toFixed(2);
}

// Update cart badge on all pages
function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
    badge.textContent = totalQty;
}

// ===== Add to cart (from any page) =====

function handleAddToCartButtons() {
    const buttons = document.querySelectorAll(".add-to-cart");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            const price = parseFloat(btn.dataset.price || "0");

            let cart = getCart();
            const existing = findItem(cart, id);

            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ id, name, price, qty: 1 });
            }

            saveCart(cart);
            updateCartBadge();
            btn.blur();

            // Simple feedback
            btn.textContent = "Added!";
            setTimeout(() => {
                btn.textContent = "Add to Cart";
            }, 700);
        });
    });
}

// ===== Products page data & filtering =====

// Static product list for produt.html (you can expand this)
const ALL_PRODUCTS = [
    {
        id: "P001",
        name: "Paracetamol 650mg (15 tab)",
        price: 35,
        category: "medicines",
        desc: "Relief from fever & mild pain.",
        pack: "Strip of 15 tablets",
    },
    {
        id: "P002",
        name: "ORS Glucose Powder (10 sachets)",
        price: 120,
        category: "syrups",
        desc: "Rehydration during dehydration & heat.",
        pack: "Pack of 10 sachets",
    },
    {
        id: "P003",
        name: "Antiseptic Liquid 500ml",
        price: 95,
        category: "otc",
        desc: "For first-aid, cuts & wounds.",
        pack: "Bottle of 500 ml",
    },
    {
        id: "P004",
        name: "Baby Diapers M (40 pcs)",
        price: 480,
        category: "baby-care",
        desc: "Soft and super absorbent diapers.",
        pack: "Pack of 40",
    },
    {
        id: "P005",
        name: "Vitamin C Chewable Tablets",
        price: 150,
        category: "otc",
        desc: "Support immunity and wellness.",
        pack: "Bottle of 60 tablets",
    },
    {
        id: "P006",
        name: "Cough Syrup (Sugar Free)",
        price: 90,
        category: "syrups",
        desc: "For dry & wet cough relief.",
        pack: "Bottle of 100 ml",
    },
    {
        id: "P007",
        name: "Moisturizing Body Lotion",
        price: 210,
        category: "personal-care",
        desc: "Hydrates and softens dry skin.",
        pack: "Bottle of 250 ml",
    },
];

// Render product list on produt.html
function initProductsPage() {
    const container = document.getElementById("product-list");
    if (!container) return;

    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");

    function renderProducts() {
        const searchTerm = (searchInput?.value || "").toLowerCase();
        const category = categoryFilter?.value || "all";

        container.innerHTML = "";

        const filtered = ALL_PRODUCTS.filter((p) => {
            const matchesCategory =
                category === "all" ? true : p.category === category;
            const matchesSearch = p.name.toLowerCase().includes(searchTerm);
            return matchesCategory && matchesSearch;
        });

        if (!filtered.length) {
            container.innerHTML = `<p style="color:#6b7280;font-size:0.9rem;">No products found. Try a different keyword.</p>`;
            return;
        }

        filtered.forEach((p) => {
            const card = document.createElement("article");
            card.className = "product-card";
            card.innerHTML = `
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="product-desc">${p.desc}</p>
                    <p class="product-pack">${p.pack}</p>
                    <p class="product-price">₹${formatMoney(p.price)}</p>
                </div>
                <button
                    class="btn-primary add-to-cart"
                    data-id="${p.id}"
                    data-name="${p.name}"
                    data-price="${p.price}"
                >
                    Add to Cart
                </button>
            `;
            container.appendChild(card);
        });

        // re-bind add to cart after re-render
        handleAddToCartButtons();
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderProducts);
    }
    if (categoryFilter) {
        categoryFilter.addEventListener("change", renderProducts);
    }

    renderProducts();
}

// ===== Cart page rendering =====

function renderCartPage() {
    const tbody = document.getElementById("cart-items");
    const emptyBox = document.getElementById("cart-empty");
    const wrapper = document.getElementById("cart-wrapper");
    const subtotalEl = document.getElementById("summary-subtotal");
    const gstEl = document.getElementById("summary-gst");
    const totalEl = document.getElementById("summary-total");

    if (!tbody || !emptyBox || !wrapper) return;

    let cart = getCart();

    if (!cart.length) {
        emptyBox.classList.remove("hidden");
        wrapper.classList.add("hidden");
        updateCartBadge();
        return;
    } else {
        emptyBox.classList.add("hidden");
        wrapper.classList.remove("hidden");
    }

    tbody.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item) => {
        const row = document.createElement("tr");
        const itemSubtotal = item.price * item.qty;
        subtotal += itemSubtotal;

        row.innerHTML = `
            <td>
                <span class="cart-product-name">${item.name}</span>
            </td>
            <td>${formatMoney(item.price)}</td>
            <td>
                <input
                    type="number"
                    min="1"
                    class="cart-qty-input"
                    data-id="${item.id}"
                    value="${item.qty}"
                />
            </td>
            <td>${formatMoney(itemSubtotal)}</td>
            <td>
                <button class="btn-remove" data-id="${item.id}">Remove</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    const gst = subtotal * 0.12;
    const total = subtotal + gst;

    if (subtotalEl) subtotalEl.textContent = formatMoney(subtotal);
    if (gstEl) gstEl.textContent = formatMoney(gst);
    if (totalEl) totalEl.textContent = formatMoney(total);

    // Event delegation for qty change & remove
    tbody.addEventListener("input", (e) => {
        const target = e.target;
        if (target.classList.contains("cart-qty-input")) {
            const id = target.dataset.id;
            let val = parseInt(target.value || "1", 10);
            if (isNaN(val) || val < 1) val = 1;
            target.value = val;

            let cart = getCart();
            const item = findItem(cart, id);
            if (item) {
                item.qty = val;
                saveCart(cart);
                renderCartPage(); // re-render totals & rows
                updateCartBadge();
            }
        }
    });

    tbody.addEventListener("click", (e) => {
        const target = e.target;
        if (target.classList.contains("btn-remove")) {
            const id = target.dataset.id;
            let cart = getCart().filter((it) => it.id !== id);
            saveCart(cart);
            updateCartBadge();
            renderCartPage();
        }
    });
}

// Checkout demo
function initCheckoutButton() {
    const btn = document.getElementById("btn-checkout");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const cart = getCart();
        if (!cart.length) {
            alert("Your cart is empty!");
            return;
        }
        alert(
            "This is a demo checkout.\n\nIn a real project you would save the order to database or redirect to payment gateway."
        );
    });
}

// ===== Common on all pages =====

function setYearInFooter() {
    const yearSpans = document.querySelectorAll("#year");
    const year = new Date().getFullYear();
    yearSpans.forEach((el) => (el.textContent = year));
}

// Init based on page
document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    handleAddToCartButtons();
    setYearInFooter();

    const page = document.body.dataset.page;

    if (page === "products") {
        initProductsPage();
    } else if (page === "cart") {
        renderCartPage();
        initCheckoutButton();
    }
});
