// =======================
// CART HELPERS (localStorage)
// =======================
const CART_KEY = "mkp_cart";

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

function findCartItem(cart, id) {
    return cart.find((item) => item.id === id);
}

function formatMoney(amount) {
    const num = Number(amount || 0);
    return num.toFixed(2);
}

function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (!badge) return;
    const cart = getCart();
    const totalQty = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    badge.textContent = totalQty;
}

// =======================
// ADD TO CART (buttons)
// =======================
function bindAddToCartButtons() {
    const buttons = document.querySelectorAll(".add-to-cart");
    if (!buttons.length) return;

    buttons.forEach((btn) => {
        // same button par baar-baar event na lage
        if (btn.dataset.bound === "1") return;
        btn.dataset.bound = "1";

        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const name = btn.dataset.name || "Item";
            const price = parseFloat(btn.dataset.price || "0");

            let cart = getCart();
            const existing = findCartItem(cart, id);

            if (existing) {
                existing.qty += 1;
            } else {
                cart.push({ id, name, price, qty: 1 });
            }

            saveCart(cart);
            updateCartBadge();

            const oldText = btn.textContent;
            btn.textContent = "Added!";
            btn.disabled = true;
            setTimeout(() => {
                btn.textContent = oldText;
                btn.disabled = false;
            }, 600);
        });
    });
}

// =======================
// MASTER PRODUCT LIST
// =======================
// Fields: id, name, pack, mrp, price, category, brand, desc

const ALL_PRODUCTS = [
    // ---------- TABLETS ----------
    {
        id: "TAB001",
        name: "ACEMED-SERA SP",
        pack: "1×30",
        mrp: 119,
        price: 13,
        category: "tablets",
        brand: "other",
        desc: "Serra-based anti-inflammatory tablet."
    },
    {
        id: "TAB002",
        name: "ACEEPAR-M",
        pack: "30×2×10",
        mrp: 94,
        price: 7.5,
        category: "tablets",
        brand: "other",
        desc: "Pain and inflammation relief tablet."
    },
    {
        id: "TAB003",
        name: "ACRCLODOL-SP (Medley)",
        pack: "20×10",
        mrp: 119.2,
        price: 12.5,
        category: "tablets",
        brand: "medley",
        desc: "Aceclofenac + Paracetamol + Serratio."
    },
    {
        id: "TAB004",
        name: "AXI VER-SP (15 Serra)",
        pack: "20×10",
        mrp: 130,
        price: 13,
        category: "tablets",
        brand: "other",
        desc: "Anti-inflammatory with serratiopeptidase."
    },
    {
        id: "TAB005",
        name: "ACEFEN-PLUS (GPP)",
        pack: "20×10",
        mrp: 77,
        price: 8.5,
        category: "tablets",
        brand: "gpp",
        desc: "Pain relief combination (GPP)."
    },
    {
        id: "TAB006",
        name: "ALMOX-CV 625 (Alkem)",
        pack: "1×10",
        mrp: 204.68,
        price: 75,
        category: "tablets",
        brand: "alkem",
        desc: "Amoxicillin + Clavulanic acid."
    },
    {
        id: "TAB007",
        name: "AMOXYCLAV 625 (Abbott)",
        pack: "1×3×10",
        mrp: 204.93,
        price: 90,
        category: "tablets",
        brand: "abbott",
        desc: "Amoxiclav antibiotic tablet."
    },
    {
        id: "TAB008",
        name: "B-MOX Capsule",
        pack: "1×20",
        mrp: 40.2,
        price: 19,
        category: "tablets",
        brand: "other",
        desc: "Amoxicillin capsule."
    },
    {
        id: "TAB009",
        name: "C.T.Z Tablet",
        pack: "1×5×20",
        mrp: 21,
        price: 6.5,
        category: "tablets",
        brand: "other",
        desc: "Cetirizine antiallergic tablet."
    },
    {
        id: "TAB010",
        name: "D Cold Total",
        pack: "4×6",
        mrp: 102.8,
        price: 72,
        category: "tablets",
        brand: "other",
        desc: "Cold-relief combination tablet."
    },

    // ---------- SYRUP / TONIC ----------
    {
        id: "SYP001",
        name: "ARISTODRYL Syrup",
        pack: "100 ml",
        mrp: 129,
        price: 17,
        category: "syrup-tonic",
        brand: "aristo",
        desc: "Cough & allergy relief syrup."
    },
    {
        id: "SYP002",
        name: "ARISTO Ventilex",
        pack: "100 ml",
        mrp: 124,
        price: 24,
        category: "syrup-tonic",
        brand: "aristo",
        desc: "Bronchodilator cough syrup."
    },
    {
        id: "SYP003",
        name: "CETEREST Cold DS (Aristo)",
        pack: "60 ml",
        mrp: 90,
        price: 0,
        category: "syrup-tonic",
        brand: "aristo",
        desc: "Cold & cough syrup (double strength)."
    },
    {
        id: "SYP004",
        name: "COLDMINE Syrup (Leeford)",
        pack: "60 ml",
        mrp: 75,
        price: 0,
        category: "syrup-tonic",
        brand: "other",
        desc: "Cold relief syrup."
    },
    {
        id: "SYP005",
        name: "GACINO MPS (Orange/Mint)",
        pack: "170 ml",
        mrp: 130,
        price: 25,
        category: "syrup-tonic",
        brand: "other",
        desc: "Antacid & anti-gas suspension."
    },
    {
        id: "SYP006",
        name: "HEMPUSHPA (Small)",
        pack: "170 ml",
        mrp: 278,
        price: 205,
        category: "syrup-tonic",
        brand: "other",
        desc: "Female health tonic (small pack)."
    },
    {
        id: "SYP007",
        name: "SACHI SAHELI",
        pack: "205 ml",
        mrp: 215,
        price: 155,
        category: "syrup-tonic",
        brand: "other",
        desc: "Women’s health tonic."
    },
    {
        id: "SYP008",
        name: "Cypro-L Syrup (Parth)",
        pack: "200 ml",
        mrp: 125,
        price: 31,
        category: "syrup-tonic",
        brand: "other",
        desc: "Cyproheptadine + Lysine appetite tonic."
    },

    // ---------- GENERAL / OTC ----------
    {
        id: "OTC001",
        name: "BONNE Bottle (40)",
        pack: "150 ml",
        mrp: 40,
        price: 0,
        category: "general-otc",
        brand: "other",
        desc: "Baby feeding bottle size 40."
    },
    {
        id: "OTC002",
        name: "BONNE Bottle (50)",
        pack: "250 ml",
        mrp: 50,
        price: 0,
        category: "general-otc",
        brand: "other",
        desc: "Baby feeding bottle size 50."
    },
    {
        id: "OTC003",
        name: "B-TEX White Ointment",
        pack: "14 g",
        mrp: 30,
        price: 23,
        category: "general-otc",
        brand: "other",
        desc: "Skin ointment for itching."
    },
    {
        id: "OTC004",
        name: "PET SAFA (Big)",
        pack: "120 g",
        mrp: 106,
        price: 88,
        category: "general-otc",
        brand: "other",
        desc: "Herbal laxative powder (big)."
    },
    {
        id: "OTC005",
        name: "PET SAFA (Small)",
        pack: "60 g",
        mrp: 60,
        price: 45,
        category: "general-otc",
        brand: "other",
        desc: "Herbal laxative powder (small)."
    },
    {
        id: "OTC006",
        name: "KAYAM Churna (Big)",
        pack: "100 g",
        mrp: 99,
        price: 82,
        category: "general-otc",
        brand: "other",
        desc: "Laxative powder big pack."
    },
    {
        id: "OTC007",
        name: "KAYAM Churna (Small)",
        pack: "50 g",
        mrp: 55,
        price: 42,
        category: "general-otc",
        brand: "other",
        desc: "Laxative powder small pack."
    },
    {
        id: "OTC008",
        name: "VICKS VapoRub 5 ml",
        pack: "5 ml",
        mrp: 24,
        price: 18.5,
        category: "general-otc",
        brand: "other",
        desc: "Cold balm 5 ml."
    },
    {
        id: "OTC009",
        name: "VICKS VapoRub 10 ml",
        pack: "10 ml",
        mrp: 45,
        price: 37,
        category: "general-otc",
        brand: "other",
        desc: "Cold balm 10 ml."
    },
    {
        id: "OTC010",
        name: "VICKS BabyRub 10 ml",
        pack: "10 ml",
        mrp: 55,
        price: 43,
        category: "general-otc",
        brand: "other",
        desc: "Gentle rub for babies."
    },

    // ---------- PAIN RELIEF ----------
    {
        id: "PAIN001",
        name: "ATTACK Gel (GPP)",
        pack: "30 g",
        mrp: 114.75,
        price: 28,
        category: "pain-relief",
        brand: "gpp",
        desc: "Topical pain relief gel."
    },
    {
        id: "PAIN002",
        name: "SUMO Gel (Alkem)",
        pack: "15 g",
        mrp: 66,
        price: 19.5,
        category: "pain-relief",
        brand: "alkem",
        desc: "Pain relief gel."
    },
    {
        id: "PAIN003",
        name: "SUMO Spray (Medium)",
        pack: "35 g",
        mrp: 136,
        price: 75,
        category: "pain-relief",
        brand: "alkem",
        desc: "Topical pain relief spray (medium)."
    },
    {
        id: "PAIN004",
        name: "SUMO Spray (Small)",
        pack: "20 g",
        mrp: 90,
        price: 48,
        category: "pain-relief",
        brand: "alkem",
        desc: "Topical pain relief spray (small)."
    },
    {
        id: "PAIN005",
        name: "DOLNIC Gel (R.T Pharma)",
        pack: "30 g",
        mrp: 105.05,
        price: 55,
        category: "pain-relief",
        brand: "other",
        desc: "Pain relieving gel."
    },
    {
        id: "PAIN006",
        name: "OMNI HOT Gel (Cipla)",
        pack: "15 g",
        mrp: 43.56,
        price: 29,
        category: "pain-relief",
        brand: "cipla",
        desc: "Warm analgesic gel."
    },
    {
        id: "PAIN007",
        name: "NIMULID Strong Gel",
        pack: "30 g",
        mrp: 133,
        price: 110,
        category: "pain-relief",
        brand: "other",
        desc: "Topical nimesulide pain gel."
    },

    // ---------- GLUCOSE / ORS ----------
    {
        id: "ORS001",
        name: "PROLYTE ORS Liquid",
        pack: "200 ml",
        mrp: 29.4,
        price: 13,
        category: "glucose-ors",
        brand: "other",
        desc: "Ready-to-drink ORS liquid."
    },
    {
        id: "ORS002",
        name: "ORS Powder (Glenmark)",
        pack: "30×21.8 g",
        mrp: 25.29,
        price: 195,
        category: "glucose-ors",
        brand: "glenmark",
        desc: "ORS powder sachet pack."
    },
    {
        id: "ORS003",
        name: "MEDWIN ORS",
        pack: "1×25",
        mrp: 0,
        price: 100,
        category: "glucose-ors",
        brand: "other",
        desc: "ORS powder pack of 25."
    },
    {
        id: "ORS004",
        name: "GLUCOSE-D (Gandhi)",
        pack: "100 g",
        mrp: 40,
        price: 14,
        category: "glucose-ors",
        brand: "other",
        desc: "Glucose-D energy powder."
    },
    {
        id: "ORS005",
        name: "ENERGIC Powder (Gandhi)",
        pack: "55 g",
        mrp: 55,
        price: 16,
        category: "glucose-ors",
        brand: "other",
        desc: "Energy powder."
    },
    {
        id: "ORS006",
        name: "DIV Cool Energy",
        pack: "105 g",
        mrp: 60,
        price: 14,
        category: "glucose-ors",
        brand: "other",
        desc: "Flavoured energy drink powder."
    },

    // ---------- CANDY / LOZENGES ----------
    {
        id: "CANDY001",
        name: "COFSILS Candy",
        pack: "210 g",
        mrp: 210,
        price: 135,
        category: "candy-lozenges",
        brand: "other",
        desc: "Cough soothing candy."
    },
    {
        id: "CANDY002",
        name: "LARLA Candy Imli Mix (Wings)",
        pack: "250 g",
        mrp: 250,
        price: 180,
        category: "candy-lozenges",
        brand: "other",
        desc: "Imli flavoured candy."
    },
    {
        id: "CANDY003",
        name: "LARLA Candy Jeera (Wings)",
        pack: "250 g",
        mrp: 250,
        price: 180,
        category: "candy-lozenges",
        brand: "other",
        desc: "Jeera flavoured candy."
    },
    {
        id: "CANDY004",
        name: "VICKS Candy Cough Drop",
        pack: "210 g",
        mrp: 210,
        price: 175,
        category: "candy-lozenges",
        brand: "other",
        desc: "Cough relief lozenges."
    },

    // ---------- CONDOMS / SILDENAFIL ----------
    {
        id: "COND001",
        name: "FIRE 100 Tablets (PHSI)",
        pack: "10×1×4",
        mrp: 177,
        price: 560,
        category: "condoms-sildenafil",
        brand: "phsi",
        desc: "Sildenafil 100 mg tablet."
    },
    {
        id: "COND002",
        name: "ZYGORA FORCE Tablets (GPP)",
        pack: "20×1×4",
        mrp: 175,
        price: 21,
        category: "condoms-sildenafil",
        brand: "gpp",
        desc: "Erectile dysfunction tablet."
    },
    {
        id: "COND003",
        name: "MANFORCE 100 Tablet (Mankind)",
        pack: "1×4",
        mrp: 255,
        price: 0,
        category: "condoms-sildenafil",
        brand: "mankind",
        desc: "Sildenafil 100 mg tablet."
    },
    {
        id: "COND004",
        name: "MANFORCE 50 Tablet (Mankind)",
        pack: "1 pack",
        mrp: 297,
        price: 0,
        category: "condoms-sildenafil",
        brand: "mankind",
        desc: "Sildenafil 50 mg tablet."
    },
    {
        id: "COND005",
        name: "MOODS Dotted (10)",
        pack: "1×10",
        mrp: 100,
        price: 50,
        category: "condoms-sildenafil",
        brand: "other",
        desc: "Dotted condoms pack of 10."
    },
    {
        id: "COND006",
        name: "KAMASUTRA Dotted (Flavoured)",
        pack: "1×3",
        mrp: 30,
        price: 14,
        category: "condoms-sildenafil",
        brand: "other",
        desc: "Flavoured dotted condoms."
    },
    {
        id: "COND007",
        name: "MANFORCE Extra Dotted",
        pack: "1×3",
        mrp: 20,
        price: 12.75,
        category: "condoms-sildenafil",
        brand: "mankind",
        desc: "Extra dotted condoms."
    }
];

// =======================
// HOME PAGE: FEATURED PRODUCTS
// =======================
function renderHomeFeatured() {
    const container = document.getElementById("home-featured");
    if (!container) return;

    const featured = ALL_PRODUCTS.slice(0, 8);

    container.innerHTML = "";
    featured.forEach((p) => {
        const card = document.createElement("article");
        card.className = "product-card";
        card.innerHTML = `
            <div class="product-info">
                <h3>${p.name}</h3>
                <p class="product-pack">Pack: ${p.pack || "-"}</p>
                <p class="product-price">Dealer Rate: ₹${formatMoney(p.price)}</p>
            </div>
            <button
                class="btn-primary add-to-cart"
                data-id="${p.id}"
                data-name="${p.name}"
                data-price="${p.price || 0}"
            >
                Add to Cart
            </button>
        `;
        container.appendChild(card);
    });

    bindAddToCartButtons();
}

// =======================
// HERO SLIDER
// =======================
function initHeroSlider() {
    const slides = document.querySelectorAll(".hero-slide");
    if (!slides.length) return;

    let index = 0;
    slides[index].classList.add("active");

    setInterval(() => {
        slides[index].classList.remove("active");
        index = (index + 1) % slides.length;
        slides[index].classList.add("active");
    }, 4000);
}

// =======================
// PRODUCTS PAGE
// =======================
function initProductsPage() {
    const container = document.getElementById("product-list");
    if (!container) return;

    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");

    function renderProducts() {
        const searchTerm = (searchInput?.value || "").toLowerCase().trim();
        const category = categoryFilter?.value || "all";

        const filtered = ALL_PRODUCTS.filter((p) => {
            const matchesCategory =
                category === "all" ? true : p.category === category;

            const text = (
                p.name +
                " " +
                (p.desc || "") +
                " " +
                (p.pack || "")
            ).toLowerCase();
            const matchesSearch = searchTerm ? text.includes(searchTerm) : true;

            return matchesCategory && matchesSearch;
        });

        if (!filtered.length) {
            container.innerHTML =
                `<p style="color:#6b7280;font-size:0.9rem;grid-column:1/-1;text-align:center;">
                    No products found. Try a different keyword or category.
                 </p>`;
            return;
        }

        container.innerHTML = "";
        filtered.forEach((p) => {
            const card = document.createElement("article");
            card.className = "product-card";

            const mrpText = p.mrp ? `MRP: ₹${formatMoney(p.mrp)}` : "";
            const dealerText = p.price ? `Dealer Rate: ₹${formatMoney(p.price)}` : "";

            card.innerHTML = `
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p class="product-pack">Pack: ${p.pack || "-"}</p>
                    <p class="product-desc">${p.desc || ""}</p>
                    <p class="product-pack">${mrpText}</p>
                    <p class="product-price">${dealerText}</p>
                </div>
                <button
                    class="btn-primary add-to-cart"
                    data-id="${p.id}"
                    data-name="${p.name}"
                    data-price="${p.price || 0}"
                >
                    Add to Cart
                </button>
            `;
            container.appendChild(card);
        });

        bindAddToCartButtons();
    }

    searchInput?.addEventListener("input", renderProducts);
    categoryFilter?.addEventListener("change", renderProducts);

    renderProducts();
}

// =======================
// CART PAGE
// =======================
function renderCartPage() {
    const tbody = document.getElementById("cart-items");
    const emptyBox = document.getElementById("cart-empty");
    const wrapper = document.getElementById("cart-wrapper");
    const subtotalEl = document.getElementById("summary-subtotal");
    const gstEl = document.getElementById("summary-gst");
    const totalEl = document.getElementById("summary-total");

    if (!tbody || !emptyBox || !wrapper) return;

    const cart = getCart();

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
        const itemSubtotal = (item.price || 0) * (item.qty || 0);
        subtotal += itemSubtotal;

        row.innerHTML = `
            <td><span class="cart-product-name">${item.name}</span></td>
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

    // Qty change
    document.querySelectorAll(".cart-qty-input").forEach((input) => {
        input.addEventListener("input", () => {
            const id = input.dataset.id;
            let val = parseInt(input.value || "1", 10);
            if (isNaN(val) || val < 1) val = 1;
            input.value = val;

            const cart = getCart();
            const item = findCartItem(cart, id);
            if (item) {
                item.qty = val;
                saveCart(cart);
                renderCartPage();
                updateCartBadge();
            }
        });
    });

    // Remove buttons
    document.querySelectorAll(".btn-remove").forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.id;
            const cart = getCart().filter((it) => it.id !== id);
            saveCart(cart);
            updateCartBadge();
            renderCartPage();
        });
    });
}

// WhatsApp based checkout
function initCheckoutButton() {
    const btn = document.getElementById("btn-checkout");
    if (!btn) return;

    btn.addEventListener("click", () => {
        const cart = getCart();
        if (!cart.length) {
            alert("Your cart is empty!");
            return;
        }

        const shopNameInput = document.getElementById("shop-name");
        const shopPhoneInput = document.getElementById("shop-phone");

        const shopName = shopNameInput?.value.trim() || "Not provided";
        const shopPhone = shopPhoneInput?.value.trim() || "Not provided";

        let message = "New Order Request - Maa Kripa Pharma\n\n";
        message += "Medical / Shop: " + shopName + "\n";
        message += "Mobile: " + shopPhone + "\n\n";
        message += "Items:\n";

        let subtotal = 0;
        cart.forEach((item, index) => {
            const qty = item.qty || 0;
            const lineTotal = (item.price || 0) * qty;
            subtotal += lineTotal;

            message +=
                (index + 1) +
                ") " +
                item.name +
                " x " +
                qty +
                " = ₹" +
                formatMoney(lineTotal) +
                "\n";
        });

        const gst = subtotal * 0.12;
        const total = subtotal + gst;

        message += "\nSubtotal: ₹" + formatMoney(subtotal);
        message += "\nApprox GST (12%): ₹" + formatMoney(gst);
        message += "\nTotal (approx): ₹" + formatMoney(total);
        message += "\n\nPlease confirm invoice & delivery.";

        const phone = "919407150830"; // 91 + 9407150830
        const url =
            "https://wa.me/" + phone + "?text=" + encodeURIComponent(message);

        window.open(url, "_blank");
    });
}

// =======================
// COMMON
// =======================
function setYearInFooter() {
    const yearSpans = document.querySelectorAll("#year");
    const year = new Date().getFullYear();
    yearSpans.forEach((el) => (el.textContent = year));
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
    setYearInFooter();

    const page = document.body.dataset.page;

    if (page === "home") {
        renderHomeFeatured();
        initHeroSlider();
    } else if (page === "products") {
        initProductsPage();
    } else if (page === "cart") {
        renderCartPage();
        initCheckoutButton();
    }

    // safety: agar kisi bhi page par static Add to Cart button ho
    bindAddToCartButtons();
});
