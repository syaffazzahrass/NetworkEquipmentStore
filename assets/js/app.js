/**
 * ============================================================
 * APP.JS - JavaScript Utama Website Customer NES
 * ============================================================
 * Menangani semua interaksi pada halaman customer:
 * - Navbar (hamburger menu, dropdown, active state)
 * - Banner carousel auto-slide
 * - Scroll reveal animation (1x trigger)
 * - Render produk, detail produk, cart, checkout, pesanan
 * - Search filter produk
 * - Profile management
 * ============================================================
 */

/* =============================================
   DOM READY - Eksekusi saat halaman siap
   ============================================= */
document.addEventListener("DOMContentLoaded", function () {
    // Inisialisasi komponen utama
    initNavbar();
    initCarousel();
    initScrollReveal();
    updateCartBadge();
    updateNavbarAuth();

    // Deteksi halaman dan render konten
    const page = detectPage();
    renderPage(page);
});

/* =============================================
   PAGE DETECTION - Deteksi halaman aktif
   ============================================= */
function detectPage() {
    const path = window.location.pathname.toLowerCase();
    const search = window.location.search;

    if (path.includes("contact")) return "contact";
    if (path.includes("information")) return "information";
    if (path.includes("shipping")) return "shipping";
    if (path.includes("cart")) return "cart";
    if (path.includes("checkout")) return "checkout";
    if (path.includes("pesanan")) return "pesanan";
    if (path.includes("profile")) return "profile";
    if (path.includes("index") || path.endsWith("/") || path.endsWith("\\")) {
        if (search.includes("produk=")) return "detail";
        if (search.includes("kategori=")) return "kategori";
        return "home";
    }
    // Check for query params on any page
    if (search.includes("produk=")) return "detail";
    if (search.includes("kategori=")) return "kategori";
    return "home";
}

/* =============================================
   PAGE RENDERER - Render konten berdasarkan halaman
   ============================================= */
function renderPage(page) {
    const banner = document.getElementById("banner-section");
    if (banner) {
        if (page === "home") {
            banner.style.display = "block";
        } else {
            banner.style.display = "none";
        }
    }

    switch (page) {
        case "home": renderHome(); break;
        case "detail": renderDetail(); break;
        case "kategori": renderKategori(); break;
        case "cart": renderCart(); break;
        case "checkout": renderCheckout(); break;
        case "pesanan": renderPesanan(); break;
        case "profile": renderProfile(); break;
    }
}

/* =============================================
   NAVBAR - Hamburger Menu & Dropdown
   ============================================= */
function initNavbar() {
    // Hamburger toggle
    const hamburger = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    const overlay = document.getElementById("nav-overlay");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", function () {
            this.classList.toggle("active");
            navMenu.classList.toggle("open");
            if (overlay) overlay.classList.toggle("show");
        });

        // Tutup menu saat klik overlay
        if (overlay) {
            overlay.addEventListener("click", function () {
                hamburger.classList.remove("active");
                navMenu.classList.remove("open");
                overlay.classList.remove("show");
            });
        }
    }

    // Product dropdown toggle
    const dropdownToggle = document.getElementById("dropdown-toggle");
    const dropdownMenu = document.getElementById("dropdown-menu");

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener("click", function (e) {
            e.preventDefault();
            dropdownMenu.classList.toggle("show");
        });

        // Tutup dropdown saat klik di luar
        document.addEventListener("click", function (e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove("show");
            }
        });
    }

    // Profile dropdown
    const profileBtn = document.getElementById("profile-btn");
    const profileDropdown = document.getElementById("profile-dropdown");

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            profileDropdown.classList.toggle("show");
        });

        document.addEventListener("click", function (e) {
            if (!profileBtn.contains(e.target)) {
                profileDropdown.classList.remove("show");
            }
        });
    }

    // Set active nav berdasarkan halaman
    setActiveNav();
}

/**
 * Set class active pada link navigasi sesuai halaman
 */
function setActiveNav() {
    const path = window.location.pathname.toLowerCase();
    const links = document.querySelectorAll(".nav-menu a");
    links.forEach(link => {
        const href = link.getAttribute("href");
        if (href && path.includes(href.replace("./", "").replace(".html", "").toLowerCase())) {
            link.classList.add("active");
        }
    });
}

/**
 * Update navbar berdasarkan status login
 * Tampilkan nama user jika login, atau link Login/Register jika belum
 */
function updateNavbarAuth() {
    const authArea = document.getElementById("auth-area");
    if (!authArea) return;

    const session = getSession();

    if (session && session.logged_in) {
        authArea.innerHTML = `
            <div id="profile-btn" class="nav-profile" style="cursor:pointer;">
                <span class="user-name d-none-mobile">${session.nama}</span>
                <i class="bi bi-person-circle profile-icon"></i>
            </div>
            <div id="profile-dropdown" class="profile-dropdown">
                <a href="profile.html">Profil Saya</a>
                <a href="pesanan-saya.html">Pesanan Saya</a>
                <div class="divider"></div>
                <a href="javascript:void(0)" onclick="logout()" class="text-danger">Logout</a>
            </div>
        `;

        // Re-init profile dropdown
        const profileBtn = document.getElementById("profile-btn");
        const profileDropdown = document.getElementById("profile-dropdown");
        if (profileBtn && profileDropdown) {
            profileBtn.addEventListener("click", function (e) {
                e.stopPropagation();
                profileDropdown.classList.toggle("show");
            });
            document.addEventListener("click", function (e) {
                if (!profileBtn.contains(e.target)) {
                    profileDropdown.classList.remove("show");
                }
            });
        }
    } else {
        authArea.innerHTML = `
            <div class="nav-profile">
                <div class="auth-links">
                    <a href="login.html">Login</a> / <a href="register.html">Register</a>
                </div>
                <i class="bi bi-person-circle profile-icon"></i>
            </div>
        `;
    }
}

/* =============================================
   CAROUSEL - Banner Auto-Slide
   ============================================= */
function initCarousel() {
    const carousel = document.getElementById("banner-carousel");
    if (!carousel) return;

    const items = carousel.querySelectorAll(".carousel-item");
    const indicators = carousel.querySelectorAll(".carousel-indicators button");
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        items.forEach((item, i) => {
            item.classList.toggle("active", i === index);
        });
        indicators.forEach((btn, i) => {
            btn.classList.toggle("active", i === index);
        });
        currentIndex = index;
    }

    function nextSlide() {
        showSlide((currentIndex + 1) % items.length);
    }

    // Auto-slide setiap 4 detik
    function startAutoSlide() {
        interval = setInterval(nextSlide, 4000);
    }

    // Klik indicator
    indicators.forEach((btn, i) => {
        btn.addEventListener("click", () => {
            clearInterval(interval);
            showSlide(i);
            startAutoSlide();
        });
    });

    if (items.length > 0) {
        showSlide(0);
        startAutoSlide();
    }
}

/* =============================================
   SCROLL REVEAL ANIMATION
   Elemen muncul dari bawah saat scroll (hanya 1x)
   Menggunakan IntersectionObserver
   ============================================= */
function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                // Unobserve agar animasi hanya 1x
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(el => observer.observe(el));
}

/* =============================================
   RENDER HOME - Halaman Katalog Produk
   ============================================= */
function renderHome() {
    const container = document.getElementById("product-grid");
    if (!container) return;

    let html = "";
    DATA_PRODUK.forEach((p, index) => {
        html += `
            <a href="index.html?produk=${p.id_produk}" class="product-card reveal reveal-delay-${(index % 4) + 1}">
                <div class="product-img-wrapper">
                    ${p.stok <= 0 ? '<span class="out-of-stock-badge">Stok Habis</span>' : ''}
                    <img src="${getImagePath(p.gambar)}" alt="${p.nama_produk}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-name">${p.nama_produk}</div>
                    <div class="product-price">${formatRupiah(p.harga)}</div>
                </div>
            </a>
        `;
    });

    container.innerHTML = html;
    // Re-init scroll reveal untuk elemen baru
    initScrollReveal();
}

/* =============================================
   RENDER DETAIL - Halaman Detail Produk
   Menggunakan 1 file index.html dengan query parameter
   ============================================= */
function renderDetail() {
    const container = document.getElementById("page-content");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = params.get("produk");
    const produk = getProdukById(id);

    if (!produk) {
        container.innerHTML = '<div class="text-center py-5"><h4>Produk tidak ditemukan</h4><a href="index.html" class="btn btn-primary mt-3">Kembali ke Toko</a></div>';
        return;
    }

    const session = getSession();
    const isInStock = produk.stok > 0;

    container.innerHTML = `
        <div class="page-fade-in">
            <!-- Breadcrumb / Back link -->
            <div class="mb-4">
                <a href="index.html" style="color:var(--text-dark); font-weight:700;">
                    <i class="bi bi-arrow-left"></i> Product
                </a>
            </div>

            <!-- Detail Produk: Gambar + Info -->
            <div class="row row-5-7 reveal" style="gap:40px;">
                <div class="text-center">
                    <img src="${getImagePath(produk.gambar)}" alt="${produk.nama_produk}" class="detail-img">
                </div>
                <div>
                    <h2 style="font-weight:800; margin-bottom:6px;">${produk.nama_produk}</h2>
                    <h3 style="color:#0d6efd; font-weight:700; margin-bottom:20px;">${formatRupiah(produk.harga)}</h3>

                    <div class="mb-4">
                        <h6 class="fw-bold">Deskripsi Singkat:</h6>
                        <p class="text-muted">${produk.deskripsi_singkat}</p>
                    </div>

                    <div class="mb-4 small">
                        ${isInStock
                            ? `<div style="color:#198754; margin-bottom:4px;"><i class="bi bi-check-circle-fill"></i> This item is in stock (${produk.stok} units)</div>`
                            : `<div style="color:var(--danger); font-weight:700; margin-bottom:4px;"><i class="bi bi-x-circle-fill"></i> This item is out of stock</div>`
                        }
                        <div class="text-muted"><strong>Categories :</strong> ${produk.nama_kategori}</div>
                        <div class="text-muted"><strong>Tag :</strong> ${produk.tag || '-'}</div>
                    </div>

                    <!-- Quantity & Action Buttons -->
                    <div class="d-flex gap-2 align-items-center" style="flex-wrap:wrap;">
                        <div class="qty-group">
                            <button type="button" id="btn-minus" ${!isInStock ? 'disabled' : ''}>-</button>
                            <input type="number" id="qty-input" value="${isInStock ? 1 : 0}" min="${isInStock ? 1 : 0}" max="${produk.stok}" readonly>
                            <button type="button" id="btn-plus" ${!isInStock ? 'disabled' : ''}>+</button>
                        </div>

                        <button class="btn btn-warning fw-bold" id="btn-add-cart" ${!isInStock ? 'disabled' : ''} onclick="handleAddToCart(${produk.id_produk})">
                            <i class="bi bi-cart-plus"></i> Add to Cart
                        </button>

                        <button class="btn btn-danger fw-bold" id="btn-checkout" ${!isInStock ? 'disabled' : ''} onclick="handleDirectCheckout(${produk.id_produk})">
                            Checkout
                        </button>
                    </div>
                </div>
            </div>

            <!-- Tab: Description / Review -->
            <div class="mt-5 border-top" style="padding-top:20px;">
                <div class="detail-tabs">
                    <h5 id="tab-desc" class="active" onclick="switchDetailTab('desc')">Description</h5>
                    <h5 id="tab-review" onclick="switchDetailTab('review')">Review</h5>
                </div>

                <div id="content-desc">
                    <h6 class="fw-bold mb-3">Product Description</h6>
                    <div class="text-muted" style="white-space:pre-line;">${produk.spesifikasi_lengkap || 'Tidak ada spesifikasi.'}</div>
                </div>

                <div id="content-review" style="display:none;">
                    <h6 class="fw-bold mb-3">Customer Reviews</h6>
                    <div class="card" style="padding:15px;background:#f8f9fa;border:1px solid #eee;">
                        <b>@Jawir :</b> Barangnya bagus min, sesuai pesanan, ril no fek 🤩👍
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup qty buttons
    setupQtyButtons(produk.stok);
    initScrollReveal();
}

/**
 * Setup tombol +/- quantity
 */
function setupQtyButtons(maxStok) {
    const qtyInput = document.getElementById("qty-input");
    const btnPlus = document.getElementById("btn-plus");
    const btnMinus = document.getElementById("btn-minus");

    if (btnPlus && maxStok > 0) {
        btnPlus.addEventListener("click", function () {
            let val = parseInt(qtyInput.value);
            if (val < maxStok) qtyInput.value = val + 1;
        });
    }

    if (btnMinus && maxStok > 0) {
        btnMinus.addEventListener("click", function () {
            let val = parseInt(qtyInput.value);
            if (val > 1) qtyInput.value = val - 1;
        });
    }
}

/**
 * Switch tab Description / Review
 */
function switchDetailTab(type) {
    const tabDesc = document.getElementById("tab-desc");
    const tabReview = document.getElementById("tab-review");
    const contentDesc = document.getElementById("content-desc");
    const contentReview = document.getElementById("content-review");

    if (type === "desc") {
        tabDesc.classList.add("active");
        tabReview.classList.remove("active");
        contentDesc.style.display = "block";
        contentReview.style.display = "none";
    } else {
        tabReview.classList.add("active");
        tabDesc.classList.remove("active");
        contentReview.style.display = "block";
        contentDesc.style.display = "none";
    }
}

/**
 * Handle Add to Cart button
 */
function handleAddToCart(idProduk) {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
        return;
    }
    const qty = document.getElementById("qty-input").value;
    const result = addToCart(idProduk, qty);
    showToast(result.message, result.success ? "success" : "error");
}

/**
 * Handle Direct Checkout button
 */
function handleDirectCheckout(idProduk) {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
        return;
    }
    const qty = document.getElementById("qty-input").value;
    window.location.href = `checkout.html?produk=${idProduk}&qty=${qty}`;
}

/* =============================================
   RENDER KATEGORI - Filter produk by kategori
   ============================================= */
function renderKategori() {
    const container = document.getElementById("product-grid");
    const titleEl = document.getElementById("page-title");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const idKat = params.get("kategori");
    const namaKat = getKategoriName(idKat);
    const produkList = getProdukByKategori(idKat);

    if (titleEl) titleEl.textContent = namaKat;

    if (produkList.length === 0) {
        container.innerHTML = '<div class="text-center py-5" style="grid-column:1/-1;"><p class="text-muted" style="font-size:1.1rem;">Belum ada produk yang tersedia.</p></div>';
        return;
    }

    let html = "";
    produkList.forEach((p, index) => {
        html += `
            <a href="index.html?produk=${p.id_produk}" class="product-card reveal reveal-delay-${(index % 4) + 1}">
                <div class="product-img-wrapper">
                    ${p.stok <= 0 ? '<span class="out-of-stock-badge">Stok Habis</span>' : ''}
                    <img src="${getImagePath(p.gambar)}" alt="${p.nama_produk}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-name">${p.nama_produk}</div>
                    <div class="product-price">${formatRupiah(p.harga)}</div>
                </div>
            </a>
        `;
    });

    container.innerHTML = html;
    initScrollReveal();
}

/* =============================================
   RENDER CART - Halaman Keranjang Belanja
   ============================================= */
function renderCart() {
    if (!requireLogin()) return;

    const container = document.getElementById("cart-content");
    if (!container) return;

    const items = getMyCart();

    if (items.length === 0) {
        container.innerHTML = `
            <div class="text-center py-5">
                <i class="bi bi-cart-x" style="font-size:4rem; color:#ddd;"></i>
                <h5 class="text-muted mt-3">Keranjang kosong</h5>
                <a href="index.html" class="btn btn-primary mt-3">Mulai Belanja</a>
            </div>
        `;
        return;
    }

    let itemsHtml = "";
    items.forEach(item => {
        const subtotal = item.harga * item.qty;
        itemsHtml += `
            <div class="card mb-3 reveal">
                <div class="card-body">
                    <div class="d-flex align-items-center gap-3" style="flex-wrap:wrap;">
                        <input type="checkbox" class="item-checkbox" value="${item.id_keranjang}" data-subtotal="${subtotal}" style="width:18px;height:18px;cursor:pointer;">
                        <img src="${getImagePath(item.gambar)}" style="width:70px;height:70px;object-fit:cover;border-radius:8px;">
                        <div style="flex:1;min-width:120px;">
                            <h6 class="fw-bold mb-0">${item.nama_produk}</h6>
                            <p style="color:#198754;font-size:0.85rem;margin:0;">${formatRupiah(item.harga)}</p>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <button class="btn btn-sm btn-outline-secondary" onclick="handleCartQty(${item.id_keranjang},'kurang')">-</button>
                            <span class="fw-bold">${item.qty}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="handleCartQty(${item.id_keranjang},'tambah')">+</button>
                        </div>
                        <div style="min-width:120px;text-align:right;">
                            <p class="fw-bold mb-0">${formatRupiah(subtotal)}</p>
                            <a href="javascript:void(0)" onclick="handleRemoveCart(${item.id_keranjang})" style="color:var(--danger);font-size:0.8rem;">Hapus</a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div class="row-8-4">
            <div>
                <div class="card mb-3">
                    <div class="card-body py-2">
                        <label style="display:flex;align-items:center;gap:8px;cursor:pointer;">
                            <input type="checkbox" id="check-all" style="width:18px;height:18px;">
                            <span class="fw-bold">Pilih Semua</span>
                        </label>
                    </div>
                </div>
                ${itemsHtml}
            </div>
            <div>
                <div class="card position-sticky">
                    <div class="card-body">
                        <h5 class="fw-bold">Ringkasan Belanja</h5>
                        <hr>
                        <div class="d-flex justify-content-between mb-3">
                            <span class="text-muted">Total Terpilih</span>
                            <h5 style="color:#198754;font-weight:700;" id="total-selected">Rp 0</h5>
                        </div>
                        <button class="btn btn-success btn-block fw-bold" id="btn-checkout-cart" disabled onclick="handleCartCheckout()">
                            Lanjut ke Pembayaran
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Setup checkbox logic
    setupCartCheckboxes();
    initScrollReveal();
}

/**
 * Setup checkbox logic di halaman cart
 */
function setupCartCheckboxes() {
    const checkAll = document.getElementById("check-all");
    const checkboxes = document.querySelectorAll(".item-checkbox");
    const totalDisplay = document.getElementById("total-selected");
    const btnCheckout = document.getElementById("btn-checkout-cart");

    function calculate() {
        let total = 0;
        let count = 0;
        checkboxes.forEach(cb => {
            if (cb.checked) {
                total += parseInt(cb.getAttribute("data-subtotal"));
                count++;
            }
        });
        totalDisplay.textContent = formatRupiah(total);
        btnCheckout.disabled = count === 0;
    }

    if (checkAll) {
        checkAll.addEventListener("change", function () {
            checkboxes.forEach(cb => { cb.checked = this.checked; });
            calculate();
        });
    }

    checkboxes.forEach(cb => {
        cb.addEventListener("change", function () {
            const allChecked = Array.from(checkboxes).every(c => c.checked);
            if (checkAll) checkAll.checked = allChecked;
            calculate();
        });
    });
}

function handleCartQty(id, action) {
    updateCartQty(id, action);
    renderCart();
}

function handleRemoveCart(id) {
    if (confirm("Hapus barang ini?")) {
        removeFromCart(id);
        renderCart();
    }
}

function handleCartCheckout() {
    const checked = document.querySelectorAll(".item-checkbox:checked");
    const ids = Array.from(checked).map(cb => parseInt(cb.value));
    if (ids.length === 0) return;
    // Simpan selected IDs ke session storage
    sessionStorage.setItem("checkout_cart_ids", JSON.stringify(ids));
    window.location.href = "checkout.html?from=cart";
}

/* =============================================
   RENDER CHECKOUT - Halaman Checkout
   Sekarang dengan opsi M-Banking (QR Code + PIN)
   ============================================= */
function renderCheckout() {
    if (!requireLogin()) return;

    const container = document.getElementById("checkout-content");
    if (!container) return;

    const session = getSession();
    const params = new URLSearchParams(window.location.search);
    const fromCart = params.get("from") === "cart";

    let items = [];
    let subtotal = 0;

    if (fromCart) {
        // Checkout dari keranjang
        const cartIds = JSON.parse(sessionStorage.getItem("checkout_cart_ids") || "[]");
        const cart = getMyCart();
        items = cart.filter(item => cartIds.includes(item.id_keranjang));
        subtotal = items.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    } else {
        // Checkout langsung dari detail produk
        const idProduk = params.get("produk");
        const qty = parseInt(params.get("qty") || 1);
        const produk = getProdukById(idProduk);
        if (!produk) {
            container.innerHTML = '<p class="text-center text-danger">Produk tidak ditemukan!</p>';
            return;
        }
        items = [{
            id_produk: produk.id_produk,
            nama_produk: produk.nama_produk,
            harga: produk.harga,
            gambar: produk.gambar,
            qty: qty
        }];
        subtotal = produk.harga * qty;
    }

    const ongkir = (session.kota && session.kota.includes("Jakarta") && !session.kota.includes("Luar")) ? 0 : 10000;
    const total = subtotal + ongkir;

    // Render items list
    let itemsHtml = items.map(item => `
        <div class="d-flex mb-3 align-items-center gap-3" style="border-bottom:1px solid #eee;padding-bottom:12px;flex-wrap:wrap;">
            <img src="${getImagePath(item.gambar)}" style="width:80px;height:80px;border-radius:8px;object-fit:cover;box-shadow:var(--shadow-sm);">
            <div style="flex:1;min-width:120px;">
                <h6 class="fw-bold mb-1">${item.nama_produk}</h6>
                <p class="text-muted small mb-0">${item.qty} x ${formatRupiah(item.harga)}</p>
            </div>
            <div class="fw-bold">${formatRupiah(item.harga * item.qty)}</div>
        </div>
    `).join("");

    container.innerHTML = `
        <div class="page-fade-in">
            <!-- Alamat Pengiriman -->
            <div class="card mb-3 reveal">
                <div class="card-body">
                    <h6 style="color:var(--danger);font-weight:700;"><i class="bi bi-geo-alt-fill me-2"></i>Alamat Pengiriman</h6>
                    <div class="d-flex gap-3" style="flex-wrap:wrap;">
                        <div>
                            <span class="fw-bold">${session.nama}</span><br>
                            <span class="text-muted small">ID User: #${session.id_user}</span>
                        </div>
                        <div style="flex:1;border-left:2px solid #eee;padding-left:15px;min-width:200px;">
                            <p class="mb-1">${session.alamat || '<em style="color:var(--danger);">Alamat belum diatur</em>'}</p>
                            <span class="badge badge-danger">${session.kota || 'Kota Tidak Terdeteksi'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row-8-4">
                <!-- Produk -->
                <div class="card reveal">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Produk yang Dibeli</h5>
                        ${itemsHtml}
                    </div>
                </div>

                <!-- Ringkasan Bayar -->
                <div class="card position-sticky reveal">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3">Ringkasan Bayar</h5>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Total Harga Barang</span>
                            <span>${formatRupiah(subtotal)}</span>
                        </div>
                        <div class="d-flex justify-content-between mb-2">
                            <span class="text-muted">Ongkos Kirim (${session.kota || 'Jakarta'})</span>
                            <span style="${ongkir > 0 ? '' : 'color:#198754;font-weight:700;'}">${ongkir > 0 ? formatRupiah(ongkir) : 'Gratis Ongkir'}</span>
                        </div>
                        <hr>
                        <div class="d-flex justify-content-between mb-4">
                            <span class="fw-bold" style="font-size:1.1rem;">Total Tagihan</span>
                            <span class="fw-bold text-danger" style="font-size:1.1rem;">${formatRupiah(total)}</span>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold">Metode Pembayaran</label>
                            <div class="payment-method-cards" id="payment-method-cards">
                                <div class="payment-method-card" data-method="transfer" onclick="selectPaymentMethod(this, 'transfer')">
                                    <i class="bi bi-bank"></i>
                                    <div class="method-name">Transfer Bank</div>
                                    <div class="method-desc">BCA, BNI, BRI, Mandiri</div>
                                </div>
                                <div class="payment-method-card" data-method="mbanking" onclick="selectPaymentMethod(this, 'mbanking')">
                                    <i class="bi bi-phone"></i>
                                    <div class="method-name">M-Banking</div>
                                    <div class="method-desc">Scan QR & PIN</div>
                                </div>
                            </div>
                        </div>

                        <!-- Bank selection (for transfer) -->
                        <div class="mb-3" id="bank-select-wrapper">
                            <label class="form-label fw-bold">Pilih Bank</label>
                            <select id="select-bank" class="form-select" required>
                                <option value="">-- Pilih Bank --</option>
                                <option value="BCA">Transfer BCA</option>
                                <option value="BNI">Transfer BNI</option>
                                <option value="BRI">Transfer BRI</option>
                                <option value="Mandiri">Transfer Mandiri</option>
                            </select>
                        </div>

                        <!-- M-Banking bank selection (hidden by default) -->
                        <div class="mb-3" id="mbanking-select-wrapper" style="display:none;">
                            <label class="form-label fw-bold">Pilih Bank M-Banking</label>
                            <select id="select-mbanking" class="form-select">
                                <option value="">-- Pilih Bank --</option>
                                <option value="BCA">BCA Mobile</option>
                                <option value="BNI">BNI Mobile</option>
                                <option value="BRI">BRImo</option>
                                <option value="Mandiri">Livin' by Mandiri</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label class="form-label fw-bold">Jasa Pengiriman</label>
                            <select id="select-kurir" class="form-select" required>
                                <option value="">-- Pilih Kurir --</option>
                                <option value="JNE">JNE (Reguler)</option>
                                <option value="J&T">J&T Express</option>
                                <option value="SiCepat">SiCepat</option>
                            </select>
                        </div>

                        <button class="btn btn-success btn-block fw-bold" id="btn-bayar" onclick="handleCheckoutSubmit(${fromCart})">
                            <i class="bi bi-shield-check"></i> Bayar & Buat Pesanan
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Payment Modal Overlay (QR Code / PIN) -->
        <div class="payment-modal-overlay" id="payment-modal-overlay">
            <div class="payment-modal" id="payment-modal">
                <!-- Content diisi secara dinamis oleh JavaScript -->
            </div>
        </div>
    `;

    // Set default payment method to transfer
    window._selectedPaymentMethod = 'transfer';
    selectPaymentMethod(document.querySelector('[data-method="transfer"]'), 'transfer');

    initScrollReveal();
}

/**
 * Pilih metode pembayaran (Transfer / M-Banking)
 */
function selectPaymentMethod(el, method) {
    // Reset semua cards
    document.querySelectorAll('.payment-method-card').forEach(c => c.classList.remove('selected'));
    el.classList.add('selected');
    window._selectedPaymentMethod = method;

    const bankWrapper = document.getElementById('bank-select-wrapper');
    const mbankingWrapper = document.getElementById('mbanking-select-wrapper');

    if (method === 'transfer') {
        bankWrapper.style.display = 'block';
        mbankingWrapper.style.display = 'none';
    } else {
        bankWrapper.style.display = 'none';
        mbankingWrapper.style.display = 'block';
    }
}

/**
 * Handle submit checkout - sekarang dengan flow M-Banking
 */
function handleCheckoutSubmit(fromCart) {
    const method = window._selectedPaymentMethod || 'transfer';
    const kurir = document.getElementById("select-kurir").value;

    if (!kurir) { showToast("Pilih jasa pengiriman!", "error"); return; }

    if (method === 'transfer') {
        // Flow transfer bank biasa
        const bank = document.getElementById("select-bank").value;
        if (!bank) { showToast("Pilih bank untuk transfer!", "error"); return; }

        let result;
        if (fromCart) {
            const cartIds = JSON.parse(sessionStorage.getItem("checkout_cart_ids") || "[]");
            result = processCartCheckout(cartIds, bank, kurir);
        } else {
            const params = new URLSearchParams(window.location.search);
            const idProduk = params.get("produk");
            const qty = params.get("qty") || 1;
            result = processDirectCheckout(idProduk, qty, "Transfer " + bank, getSession().pin_pembayaran);
        }

        if (result.success) {
            showPaymentSuccess(result, "Transfer " + bank, kurir);
        } else {
            showToast(result.message, "error");
        }
    } else {
        // Flow M-Banking: QR Code → PIN → Success
        const mbank = document.getElementById("select-mbanking").value;
        if (!mbank) { showToast("Pilih bank M-Banking!", "error"); return; }

        showQRCodeModal(mbank, fromCart, kurir);
    }
}

/**
 * Generate QR Code SVG unik
 */
function generateQRCodeSVG(text) {
    // Generate pseudo-random QR code pattern based on text hash
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        const char = text.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }

    const size = 21;
    const cellSize = 200 / size;
    let svg = `<svg class="qr-code-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">`;
    svg += `<rect width="200" height="200" fill="white"/>`;

    // Corner squares (finder patterns)
    function drawFinder(x, y) {
        // Outer border
        svg += `<rect x="${x * cellSize}" y="${y * cellSize}" width="${7 * cellSize}" height="${7 * cellSize}" fill="#1a6d4b"/>`;
        svg += `<rect x="${(x + 1) * cellSize}" y="${(y + 1) * cellSize}" width="${5 * cellSize}" height="${5 * cellSize}" fill="white"/>`;
        svg += `<rect x="${(x + 2) * cellSize}" y="${(y + 2) * cellSize}" width="${3 * cellSize}" height="${3 * cellSize}" fill="#1a6d4b"/>`;
    }

    drawFinder(0, 0);   // Top-left
    drawFinder(14, 0);  // Top-right
    drawFinder(0, 14);  // Bottom-left

    // Data pattern (pseudo-random based on hash)
    let seed = Math.abs(hash);
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            // Skip finder pattern areas
            if ((row < 8 && col < 8) || (row < 8 && col > 12) || (row > 12 && col < 8)) continue;

            seed = (seed * 16807 + 7) % 2147483647;
            if (seed % 3 !== 0) {
                svg += `<rect x="${col * cellSize}" y="${row * cellSize}" width="${cellSize}" height="${cellSize}" fill="#1a6d4b" rx="1"/>`;
            }
        }
    }

    svg += `</svg>`;
    return svg;
}

/**
 * Tampilkan modal QR Code untuk M-Banking
 */
function showQRCodeModal(bank, fromCart, kurir) {
    const overlay = document.getElementById("payment-modal-overlay");
    const modal = document.getElementById("payment-modal");

    // Hitung total
    const session = getSession();
    const params = new URLSearchParams(window.location.search);
    let total = 0;

    if (fromCart) {
        const cartIds = JSON.parse(sessionStorage.getItem("checkout_cart_ids") || "[]");
        const cart = getMyCart();
        const selectedItems = cart.filter(item => cartIds.includes(item.id_keranjang));
        const subtotal = selectedItems.reduce((sum, item) => sum + (item.harga * item.qty), 0);
        const ongkir = (session.kota && session.kota.includes("Jakarta") && !session.kota.includes("Luar")) ? 0 : 10000;
        total = subtotal + ongkir;
    } else {
        const idProduk = params.get("produk");
        const qty = parseInt(params.get("qty") || 1);
        const produk = getProdukById(idProduk);
        if (produk) {
            const ongkir = (session.kota && session.kota.includes("Jakarta") && !session.kota.includes("Luar")) ? 0 : 10000;
            total = (produk.harga * qty) + ongkir;
        }
    }

    const qrText = `NES-PAY-${bank}-${Date.now()}-${total}`;
    const qrSvg = generateQRCodeSVG(qrText);

    modal.innerHTML = `
        <div class="payment-modal-header">
            <h4><i class="bi bi-phone me-2"></i>Pembayaran M-Banking</h4>
            <p>Scan QR Code dengan ${bank} Mobile</p>
        </div>
        <div class="payment-modal-body">
            <div class="qr-code-container">
                ${qrSvg}
                <div class="qr-label">Scan dengan ${bank} Mobile</div>
            </div>

            <div class="payment-amount-display">
                <div class="label">Total Pembayaran</div>
                <div class="amount">${formatRupiah(total)}</div>
            </div>

            <div class="countdown-timer" id="qr-countdown">
                <i class="bi bi-clock-fill"></i>
                <span id="countdown-text">Berlaku 05:00</span>
            </div>

            <p class="text-muted small">Buka aplikasi ${bank} Mobile, pilih menu <strong>Scan QR</strong>, lalu arahkan kamera ke QR code di atas.</p>
        </div>
        <div class="payment-modal-footer">
            <button class="btn btn-outline-secondary" onclick="closePaymentModal()">Batal</button>
            <button class="btn btn-success fw-bold" onclick="showPINModal('${bank}', ${fromCart}, '${kurir}')">
                <i class="bi bi-check-circle"></i> Sudah Scan
            </button>
        </div>
    `;

    overlay.classList.add("show");

    // Start countdown
    startQRCountdown(300);
}

/**
 * Countdown timer untuk QR Code
 */
let _countdownInterval = null;
function startQRCountdown(seconds) {
    if (_countdownInterval) clearInterval(_countdownInterval);
    let remaining = seconds;

    function updateDisplay() {
        const min = Math.floor(remaining / 60);
        const sec = remaining % 60;
        const textEl = document.getElementById("countdown-text");
        const timerEl = document.getElementById("qr-countdown");
        if (textEl) {
            textEl.textContent = `Berlaku ${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
        }
        if (remaining <= 0 && timerEl) {
            timerEl.classList.add("expired");
            if (textEl) textEl.textContent = "QR Code kadaluarsa";
            clearInterval(_countdownInterval);
        }
    }

    updateDisplay();
    _countdownInterval = setInterval(() => {
        remaining--;
        updateDisplay();
    }, 1000);
}

/**
 * Tampilkan modal input PIN
 */
function showPINModal(bank, fromCart, kurir) {
    if (_countdownInterval) clearInterval(_countdownInterval);

    const modal = document.getElementById("payment-modal");

    modal.innerHTML = `
        <div class="payment-modal-header">
            <h4><i class="bi bi-shield-lock-fill me-2"></i>Masukkan PIN</h4>
            <p>Verifikasi PIN ${bank} Mobile Anda</p>
        </div>
        <div class="payment-modal-body">
            <div style="margin-bottom:20px;">
                <i class="bi bi-lock-fill" style="font-size:2.5rem;color:var(--primary);opacity:0.7;"></i>
            </div>

            <div class="pin-input-group" id="pin-inputs">
                <input type="password" maxlength="1" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                <input type="password" maxlength="1" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                <input type="password" maxlength="1" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                <input type="password" maxlength="1" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                <input type="password" maxlength="1" inputmode="numeric" pattern="[0-9]" autocomplete="off">
                <input type="password" maxlength="1" inputmode="numeric" pattern="[0-9]" autocomplete="off">
            </div>

            <div class="pin-error-msg" id="pin-error">
                <i class="bi bi-exclamation-circle-fill me-1"></i> PIN salah, silakan coba lagi
            </div>

            <p class="pin-hint">Masukkan 6 digit PIN M-Banking Anda<br><span style="font-size:0.7rem;color:#999;">(Gunakan PIN: 123456 untuk demo)</span></p>
        </div>
        <div class="payment-modal-footer">
            <button class="btn btn-outline-secondary" onclick="showQRCodeModal('${bank}', ${fromCart}, '${kurir}')">
                <i class="bi bi-arrow-left"></i> Kembali
            </button>
            <button class="btn btn-success fw-bold" id="btn-verify-pin" onclick="verifyPIN('${bank}', ${fromCart}, '${kurir}')">
                <i class="bi bi-check2-circle"></i> Konfirmasi
            </button>
        </div>
    `;

    // Setup PIN input auto-focus
    setupPINInputs();
}

/**
 * Setup auto-focus pada input PIN
 */
function setupPINInputs() {
    const inputs = document.querySelectorAll('#pin-inputs input');

    inputs.forEach((input, index) => {
        input.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        input.addEventListener('keydown', function (e) {
            if (e.key === 'Backspace' && !this.value && index > 0) {
                inputs[index - 1].focus();
            }
            if (e.key === 'Enter') {
                const btn = document.getElementById('btn-verify-pin');
                if (btn) btn.click();
            }
        });

        input.addEventListener('focus', function () {
            this.select();
        });
    });

    // Focus first input
    setTimeout(() => { inputs[0].focus(); }, 100);
}

/**
 * Verifikasi PIN M-Banking
 */
function verifyPIN(bank, fromCart, kurir) {
    const inputs = document.querySelectorAll('#pin-inputs input');
    let pin = '';
    inputs.forEach(inp => { pin += inp.value; });

    if (pin.length < 6) {
        showToast("Masukkan 6 digit PIN!", "error");
        return;
    }

    // PIN demo: 123456 (atau PIN dari session)
    const session = getSession();
    const validPIN = session.pin_pembayaran || '123456';

    if (pin !== validPIN) {
        // Tampilkan error
        const errorEl = document.getElementById("pin-error");
        if (errorEl) errorEl.classList.add("show");
        inputs.forEach(inp => {
            inp.classList.add("error");
            inp.value = '';
        });
        setTimeout(() => {
            inputs.forEach(inp => inp.classList.remove("error"));
            inputs[0].focus();
        }, 500);
        return;
    }

    // PIN benar - proses checkout
    const btnVerify = document.getElementById("btn-verify-pin");
    if (btnVerify) {
        btnVerify.innerHTML = '<div class="spinner" style="width:20px;height:20px;border-width:3px;margin:0 auto;"></div>';
        btnVerify.disabled = true;
    }

    setTimeout(() => {
        let result;
        if (fromCart) {
            const cartIds = JSON.parse(sessionStorage.getItem("checkout_cart_ids") || "[]");
            result = processCartCheckout(cartIds, bank, kurir);
        } else {
            const params = new URLSearchParams(window.location.search);
            const idProduk = params.get("produk");
            const qty = params.get("qty") || 1;
            result = processDirectCheckout(idProduk, qty, "M-Banking " + bank, validPIN);
        }

        closePaymentModal();

        if (result.success) {
            showPaymentSuccess(result, "M-Banking " + bank, kurir);
        } else {
            showToast(result.message, "error");
        }
    }, 1500);
}

/**
 * Tutup modal pembayaran
 */
function closePaymentModal() {
    if (_countdownInterval) clearInterval(_countdownInterval);
    const overlay = document.getElementById("payment-modal-overlay");
    if (overlay) overlay.classList.remove("show");
}

/**
 * Tampilkan halaman sukses pembayaran
 */
function showPaymentSuccess(result, metode, kurir) {
    const container = document.getElementById("checkout-content");
    const titleEl = document.querySelector(".section-title");
    if (titleEl) titleEl.style.display = "none";

    // Ambil data pesanan
    const session = getSession();
    const params = new URLSearchParams(window.location.search);
    const fromCart = params.get("from") === "cart";

    let total = 0;
    let itemCount = 0;

    if (fromCart) {
        const cartIds = JSON.parse(sessionStorage.getItem("checkout_cart_ids") || "[]");
        const cart = getMyCart();
        const selectedItems = cart.filter(item => cartIds.includes(item.id_keranjang));
        total = selectedItems.reduce((sum, item) => sum + (item.harga * item.qty), 0);
        itemCount = selectedItems.length;
    } else {
        const idProduk = params.get("produk");
        const qty = parseInt(params.get("qty") || 1);
        const produk = getProdukById(idProduk);
        if (produk) {
            total = produk.harga * qty;
            itemCount = 1;
        }
    }

    const ongkir = (session.kota && session.kota.includes("Jakarta") && !session.kota.includes("Luar")) ? 0 : 10000;
    const grandTotal = total + ongkir;
    const orderId = "NES-" + Date.now().toString().slice(-8);
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    container.innerHTML = `
        <div class="payment-success-container">
            <div class="payment-success-card">
                <div class="success-icon-area">
                    <div class="success-checkmark">
                        <i class="bi bi-check-lg"></i>
                    </div>
                    <h3>Pembayaran Berhasil!</h3>
                    <p>Pesanan Anda sedang diproses</p>
                </div>

                <div class="success-details">
                    <div class="success-detail-row">
                        <span class="label">No. Pesanan</span>
                        <span class="value">#${orderId}</span>
                    </div>
                    <div class="success-detail-row">
                        <span class="label">Tanggal</span>
                        <span class="value">${dateStr}, ${timeStr}</span>
                    </div>
                    <div class="success-detail-row">
                        <span class="label">Metode Bayar</span>
                        <span class="value">${metode}</span>
                    </div>
                    <div class="success-detail-row">
                        <span class="label">Jasa Kirim</span>
                        <span class="value">${kurir}</span>
                    </div>
                    <div class="success-detail-row">
                        <span class="label">Jumlah Produk</span>
                        <span class="value">${itemCount} item</span>
                    </div>
                    <div class="success-detail-row">
                        <span class="label">Total Pembayaran</span>
                        <span class="value total-amount">${formatRupiah(grandTotal)}</span>
                    </div>
                </div>

                <div class="success-actions">
                    <a href="pesanan-saya.html" class="btn btn-success fw-bold">
                        <i class="bi bi-receipt me-2"></i>Lihat Pesanan Saya
                    </a>
                    <a href="index.html" class="btn btn-outline-primary fw-bold">
                        <i class="bi bi-shop me-2"></i>Lanjut Belanja
                    </a>
                </div>
            </div>
        </div>
    `;

    // Spawn confetti 🎉
    spawnConfetti();
}

/**
 * Spawn confetti animation
 */
function spawnConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#1a6d4b', '#ffd700', '#dc3545', '#0d6efd', '#198754', '#ff6b6b', '#48dbfb', '#ff9ff3'];

    for (let i = 0; i < 50; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.width = (6 + Math.random() * 8) + 'px';
        piece.style.height = (6 + Math.random() * 8) + 'px';
        if (Math.random() > 0.5) piece.style.borderRadius = '50%';
        container.appendChild(piece);
    }

    // Hapus setelah animasi selesai
    setTimeout(() => container.remove(), 5000);
}


/* =============================================
   RENDER PESANAN SAYA - Daftar Pesanan
   ============================================= */
function renderPesanan() {
    if (!requireLogin()) return;

    const container = document.getElementById("pesanan-content");
    if (!container) return;

    renderPesananByStatus("all");

    // Tab filter
    const tabs = document.querySelectorAll(".order-tabs a");
    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");
            renderPesananByStatus(this.dataset.status);
        });
    });
}

function renderPesananByStatus(status) {
    const container = document.getElementById("pesanan-list");
    if (!container) return;

    const orders = getMyOrders(status);

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="card text-center py-5">
                <div class="card-body">
                    <i class="bi bi-receipt" style="font-size:4rem;color:#ddd;"></i>
                    <h5 class="text-muted mt-2">Belum ada transaksi</h5>
                    <p class="small text-muted">Pesanan dengan status ini tidak ditemukan.</p>
                </div>
            </div>
        `;
        return;
    }

    const statusStyle = {
        pending: "badge-secondary",
        proses: "badge-primary",
        dikemas: "badge-info",
        dikirim: "badge-warning",
        selesai: "badge-success",
        dibatalkan: "badge-danger"
    };

    let html = "";
    orders.forEach(p => {
        html += `
            <div class="card mb-3 reveal">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-center mb-3" style="border-bottom:1px solid #eee;padding-bottom:8px;">
                        <span class="text-muted small fw-bold">#${p.id_transaksi} | ${formatTanggal(p.tanggal_transaksi)}</span>
                        <span class="badge ${statusStyle[p.status] || 'badge-secondary'}" style="text-transform:uppercase;padding:6px 12px;">${p.status}</span>
                    </div>
                    <div class="d-flex align-items-center gap-3" style="flex-wrap:wrap;">
                        ${p.gambar ? `<img src="${getImagePath(p.gambar)}" style="width:70px;height:70px;border-radius:8px;object-fit:cover;border:1px solid #eee;">` : ''}
                        <div style="flex:1;min-width:150px;">
                            <h5 class="fw-bold mb-1">${p.nama_produk || 'Pesanan'}</h5>
                            ${p.jumlah ? `<p class="text-muted small mb-0">${p.jumlah} Produk x ${formatRupiah(p.harga_satuan)}</p>` : ''}
                            <p class="text-muted small mb-0">Pembayaran: <strong>${p.metode_pembayaran}</strong></p>
                            <p class="text-muted small mb-0">Kurir: <strong>${p.jasa_kirim || '-'}</strong></p>
                        </div>
                        <div style="text-align:right;">
                            <p class="text-muted small mb-0">Total Tagihan:</p>
                            <h4 style="color:var(--danger);font-weight:700;margin:0;">${formatRupiah(p.total_akhir)}</h4>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    initScrollReveal();
}

/* =============================================
   RENDER PROFILE - Halaman Profil Customer
   ============================================= */
function renderProfile() {
    if (!requireLogin()) return;

    const container = document.getElementById("profile-content");
    if (!container) return;

    const session = getSession();

    container.innerHTML = `
        <div class="page-fade-in" style="max-width:500px;margin:0 auto;">
            <div class="card reveal">
                <div class="card-body p-4">
                    <h4 class="fw-bold mb-4 text-center">Pengaturan Profil</h4>

                    <div class="text-center mb-4">
                        <div style="display:inline-block;position:relative;">
                            <img id="img-preview" src="${session.foto ? getImagePath('profile/' + session.foto) : 'https://ui-avatars.com/api/?name=' + encodeURIComponent(session.nama) + '&background=1a6d4b&color=fff&size=110'}"
                                 style="width:110px;height:110px;border-radius:50%;object-fit:cover;border:3px solid #eee;">
                        </div>
                    </div>

                    <form onsubmit="handleProfileUpdate(event)">
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Nama Lengkap</label>
                            <input type="text" id="profile-nama" class="form-control" value="${session.nama}" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Nomor WhatsApp / HP</label>
                            <input type="text" id="profile-hp" class="form-control" value="${session.no_hp || ''}" placeholder="Contoh: 08123456789">
                        </div>
                        <div class="mb-3">
                            <label class="form-label fw-semibold">Alamat Lengkap</label>
                            <textarea id="profile-alamat" class="form-control" rows="3">${session.alamat || ''}</textarea>
                        </div>
                        <div class="mb-4">
                            <label class="form-label fw-semibold">Wilayah (Ongkir)</label>
                            <select id="profile-kota" class="form-select">
                                <option value="Jakarta" ${session.kota === 'Jakarta' ? 'selected' : ''}>Jakarta (Gratis Ongkir)</option>
                                <option value="Luar Jakarta (Ongkir Rp 10.000)" ${session.kota && session.kota.includes('Luar') ? 'selected' : ''}>Luar Jakarta (Ongkir Rp 10.000)</option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-success btn-block fw-bold">Simpan Perubahan</button>
                    </form>
                </div>
            </div>
        </div>
    `;

    initScrollReveal();
}

function handleProfileUpdate(e) {
    e.preventDefault();
    updateSession({
        nama: document.getElementById("profile-nama").value,
        no_hp: document.getElementById("profile-hp").value,
        alamat: document.getElementById("profile-alamat").value,
        kota: document.getElementById("profile-kota").value
    });
    showToast("Profil berhasil diperbarui!", "success");
    updateNavbarAuth();
}

/* =============================================
   SEARCH FILTER - Filter Produk
   ============================================= */
function handleSearch(e) {
    e.preventDefault();
    const keyword = document.getElementById("search-input").value.toLowerCase().trim();
    const container = document.getElementById("product-grid");
    if (!container) return;

    const filtered = DATA_PRODUK.filter(p =>
        p.nama_produk.toLowerCase().includes(keyword) ||
        p.nama_kategori.toLowerCase().includes(keyword) ||
        (p.tag && p.tag.toLowerCase().includes(keyword))
    );

    if (filtered.length === 0) {
        container.innerHTML = '<div class="text-center py-5" style="grid-column:1/-1;"><p class="text-muted">Produk tidak ditemukan.</p></div>';
        return;
    }

    let html = "";
    filtered.forEach((p, index) => {
        html += `
            <a href="index.html?produk=${p.id_produk}" class="product-card reveal reveal-delay-${(index % 4) + 1}">
                <div class="product-img-wrapper">
                    ${p.stok <= 0 ? '<span class="out-of-stock-badge">Stok Habis</span>' : ''}
                    <img src="${getImagePath(p.gambar)}" alt="${p.nama_produk}" loading="lazy">
                </div>
                <div class="product-info">
                    <div class="product-name">${p.nama_produk}</div>
                    <div class="product-price">${formatRupiah(p.harga)}</div>
                </div>
            </a>
        `;
    });

    container.innerHTML = html;
    initScrollReveal();
}

/* =============================================
   TOAST NOTIFICATION - Notifikasi Popup
   ============================================= */
function showToast(message, type = "success") {
    // Hapus toast yang ada
    const existing = document.querySelector(".toast-notification");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.className = "toast-notification";
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#198754' : '#dc3545'};
        color: white;
        padding: 14px 24px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.2);
        z-index: 99999;
        font-size: 0.9rem;
        font-weight: 600;
        font-family: 'Inter', sans-serif;
        animation: toastIn 0.4s ease;
        max-width: 350px;
    `;
    toast.innerHTML = `<i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'}-fill me-2"></i>${message}`;
    document.body.appendChild(toast);

    // Auto-remove setelah 3 detik
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateX(100px)";
        toast.style.transition = "all 0.4s ease";
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

// Tambahkan style untuk toast animation
const toastStyle = document.createElement("style");
toastStyle.textContent = `
    @keyframes toastIn {
        from { opacity: 0; transform: translateX(100px); }
        to { opacity: 1; transform: translateX(0); }
    }
    .d-none-mobile { }
    @media (max-width: 768px) {
        .d-none-mobile { display: none !important; }
    }
`;
document.head.appendChild(toastStyle);

/* =============================================
   WELCOME / NOTIFY POP
   Popup selamat datang setelah login, register, logout
   ============================================= */

/**
 * Inject animasi & style untuk welcome pop dan cursor effect
 */
(function injectGlobalStyles() {
    const s = document.createElement("style");
    s.textContent = `
        /* --- Welcome Pop --- */
        @keyframes nesPopIn {
            0%   { opacity:0; transform:translate(-50%,-50%) scale(0.7); }
            70%  { transform:translate(-50%,-50%) scale(1.05); }
            100% { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }
        @keyframes nesPopOut {
            0%   { opacity:1; transform:translate(-50%,-50%) scale(1); }
            100% { opacity:0; transform:translate(-50%,-50%) scale(0.8); }
        }
        @keyframes nesModalBgIn {
            from { opacity:0; } to { opacity:1; }
        }
        @keyframes nesModalIn {
            0%   { opacity:0; transform:scale(0.8); }
            100% { opacity:1; transform:scale(1); }
        }
        @keyframes nesIconPop {
            0%   { opacity:0; transform:scale(0.5); }
            70%  { transform:scale(1.15); }
            100% { opacity:1; transform:scale(1); }
        }
        #nes-welcome-pop {
            position:fixed;top:50%;left:50%;
            transform:translate(-50%,-50%);
            z-index:99998;
            animation:nesPopIn 0.4s cubic-bezier(.34,1.56,.64,1) forwards;
            pointer-events:none;
        }
        #nes-welcome-pop.hiding {
            animation:nesPopOut 0.3s ease forwards;
        }
        #nes-welcome-pop .pop-box {
            background:#fff;
            border-radius:20px;
            padding:36px 40px;
            text-align:center;
            box-shadow:0 24px 80px rgba(0,0,0,0.2);
            min-width:300px;
            position:relative;
        }
        #nes-welcome-pop .pop-logo-container {
            margin-bottom:12px;
        }
        #nes-welcome-pop .pop-logo {
            width:80px;
            height:80px;
            object-fit:contain;
            margin:0 auto;
            display:block;
        }
        #nes-welcome-pop .pop-icon {
            position:absolute;
            top:14px;
            left:16px;
            font-size:26px;
            margin:0;
            animation:nesIconPop 0.5s 0.1s both cubic-bezier(.34,1.56,.64,1);
        }
        #nes-welcome-pop .pop-title {
            font-size:1.3rem;font-weight:800;
            color:#1a6d4b;margin-bottom:6px;
        }
        #nes-welcome-pop .pop-sub {
            font-size:0.9rem;color:#6c757d;
        }

    `;
    document.head.appendChild(s);
})();



/**
 * Tampilkan welcome pop
 * @param {"login"|"register"|"logout"} type
 * @param {string} nama - Nama user
 */
function showWelcomePop(type, nama) {
    const existing = document.getElementById("nes-welcome-pop");
    if (existing) existing.remove();

    const configs = {
        login: {
            icon: "👋",
            title: `Selamat datang, ${nama}!`,
            logo: "public/uploads/profile/LOGO_NES.png",
            sub: "Kamu berhasil masuk ke akun NES."
        },
        register: {
            icon: "🎉",
            title: `Halo, ${nama}!`,
            logo: "public/uploads/profile/LOGO_NES.png",
            sub: "Akun kamu berhasil dibuat. Selamat belanja!"
        },
        logout: {
            icon: "👋",
            title: "Sampai jumpa!",
           logo: "public/uploads/profile/LOGO_NES.png",
            sub: nama ? `Kamu telah keluar dari akun ${nama}.` : "Kamu telah berhasil keluar."
        }
    };

    const cfg = configs[type] || configs.login;
    const pop = document.createElement("div");
    pop.id = "nes-welcome-pop";
    const logoHtml = cfg.logo 
    ? `<div class="pop-logo-container"><img src="${cfg.logo}" alt="Logo NES" class="pop-logo" /></div>` 
    : '';
    pop.innerHTML = `
        <div class="pop-box">
            ${logoHtml}
            <span class="pop-icon">${cfg.icon}</span>
            <div class="pop-title">${cfg.title}</div>
            <div class="pop-sub">${cfg.sub}</div>
        </div>
    `;
    document.body.appendChild(pop);

    setTimeout(() => {
        pop.classList.add("hiding");
        setTimeout(() => pop.remove(), 320);
    }, 2500);
}

/**
 * Cek dan tampilkan notify dari localStorage (diset oleh login/register/logout redirect)
 */
(function checkNesNotify() {
    const raw = localStorage.getItem("nes_notify");
    if (!raw) return;
    try {
        const notif = JSON.parse(raw);
        localStorage.removeItem("nes_notify");
        // Delay sedikit agar halaman sudah render
        setTimeout(() => showWelcomePop(notif.type, notif.nama), 400);
    } catch(e) {}
})();