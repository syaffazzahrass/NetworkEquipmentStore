/**
 * ============================================================
 * CART.JS - Sistem Keranjang Belanja NES
 * ============================================================
 * Mengelola keranjang belanja menggunakan localStorage:
 * - Tambah produk ke keranjang
 * - Update quantity
 * - Hapus item
 * - Hitung total
 * - Badge count di navbar
 * ============================================================
 */

/* =============================================
   CART DATA MANAGEMENT
   Menggunakan localStorage key: "nes_cart"
   ============================================= */

/**
 * Ambil data keranjang dari localStorage
 * @returns {array} Array item keranjang
 */
function getCart() {
    const data = localStorage.getItem("nes_cart");
    return data ? JSON.parse(data) : [];
}

/**
 * Simpan data keranjang ke localStorage
 * @param {array} cart - Array item keranjang
 */
function saveCart(cart) {
    localStorage.setItem("nes_cart", JSON.stringify(cart));
    updateCartBadge();
}

/**
 * Tambah produk ke keranjang
 * Jika produk sudah ada, tambah quantity-nya
 * @param {number} idProduk - ID produk
 * @param {number} qty - Jumlah yang ditambahkan
 * @returns {object} {success: boolean, message: string}
 */
function addToCart(idProduk, qty = 1) {
    const session = getSession();
    if (!session) {
        return { success: false, message: "Silakan login terlebih dahulu!" };
    }

    const produk = getProdukById(idProduk);
    if (!produk) {
        return { success: false, message: "Produk tidak ditemukan!" };
    }

    if (produk.stok <= 0) {
        return { success: false, message: "Stok produk habis!" };
    }

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id_produk === parseInt(idProduk) && item.id_user === session.id_user);

    if (existingIndex >= 0) {
        // Produk sudah ada, tambah quantity
        const newQty = cart[existingIndex].qty + parseInt(qty);
        if (newQty > produk.stok) {
            return { success: false, message: "Jumlah melebihi stok tersedia!" };
        }
        cart[existingIndex].qty = newQty;
    } else {
        // Produk baru, tambahkan ke keranjang
        cart.push({
            id_keranjang: Date.now(),
            id_user: session.id_user,
            id_produk: parseInt(idProduk),
            qty: parseInt(qty),
            nama_produk: produk.nama_produk,
            harga: produk.harga,
            gambar: produk.gambar
        });
    }

    saveCart(cart);
    return { success: true, message: "Berhasil ditambahkan ke keranjang!" };
}

/**
 * Update quantity item di keranjang
 * @param {number} idKeranjang - ID item keranjang
 * @param {string} action - "tambah" atau "kurang"
 */
function updateCartQty(idKeranjang, action) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id_keranjang === parseInt(idKeranjang));

    if (index >= 0) {
        const produk = getProdukById(cart[index].id_produk);
        if (action === "tambah") {
            if (produk && cart[index].qty < produk.stok) {
                cart[index].qty += 1;
            }
        } else if (action === "kurang") {
            cart[index].qty -= 1;
            if (cart[index].qty <= 0) {
                cart.splice(index, 1);
            }
        }
        saveCart(cart);
    }
}

/**
 * Hapus item dari keranjang
 * @param {number} idKeranjang - ID item keranjang
 */
function removeFromCart(idKeranjang) {
    let cart = getCart();
    cart = cart.filter(item => item.id_keranjang !== parseInt(idKeranjang));
    saveCart(cart);
}

/**
 * Ambil item keranjang untuk user yang sedang login
 * @returns {array} Array item keranjang user saat ini
 */
function getMyCart() {
    const session = getSession();
    if (!session) return [];
    return getCart().filter(item => item.id_user === session.id_user);
}

/**
 * Hitung jumlah item di keranjang user saat ini
 * @returns {number} Jumlah item
 */
function getCartCount() {
    return getMyCart().length;
}

/**
 * Hitung total harga item yang dicentang
 * @param {array} selectedIds - Array ID keranjang yang dicentang
 * @returns {number} Total harga
 */
function calculateCartTotal(selectedIds) {
    const cart = getMyCart();
    let total = 0;
    selectedIds.forEach(id => {
        const item = cart.find(c => c.id_keranjang === parseInt(id));
        if (item) {
            total += item.harga * item.qty;
        }
    });
    return total;
}

/**
 * Update badge count keranjang di navbar
 */
function updateCartBadge() {
    const badge = document.getElementById("cart-badge");
    if (badge) {
        const count = getCartCount();
        badge.textContent = count;
        badge.style.display = count > 0 ? "flex" : "none";
    }
}

/**
 * Kosongkan item keranjang yang sudah di-checkout
 * @param {array} selectedIds - Array ID keranjang yang sudah dibayar
 */
function clearCheckedOutItems(selectedIds) {
    let cart = getCart();
    cart = cart.filter(item => !selectedIds.includes(item.id_keranjang));
    saveCart(cart);
}
