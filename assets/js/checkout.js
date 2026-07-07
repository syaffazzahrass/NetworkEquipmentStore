/**
 * ============================================================
 * CHECKOUT.JS - Sistem Checkout & Pesanan NES
 * ============================================================
 * Mengelola proses checkout dan data pesanan:
 * - Checkout dari detail produk (langsung beli)
 * - Checkout dari keranjang (multi item)
 * - Simpan pesanan ke localStorage
 * - Ambil pesanan per user
 * ============================================================
 */

/* =============================================
   ORDER DATA MANAGEMENT
   Key localStorage: "nes_orders"
   ============================================= */

/**
 * Ambil semua data pesanan
 * @returns {array} Array pesanan
 */
function getAllOrders() {
    const data = localStorage.getItem("nes_orders");
    const orders = data ? JSON.parse(data) : [];
    // Gabungkan dengan DATA_TRANSAKSI dummy
    return [...DATA_TRANSAKSI, ...orders];
}

/**
 * Ambil semua detail pesanan
 * @returns {array} Array detail pesanan
 */
function getAllOrderDetails() {
    const data = localStorage.getItem("nes_order_details");
    const details = data ? JSON.parse(data) : [];
    return [...DATA_TRANSAKSI_DETAIL, ...details];
}

/**
 * Simpan pesanan baru
 * @param {object} order - Data pesanan
 * @param {array} details - Array detail item
 */
function saveOrder(order, details) {
    // Simpan pesanan
    const orders = localStorage.getItem("nes_orders");
    const orderList = orders ? JSON.parse(orders) : [];
    orderList.push(order);
    localStorage.setItem("nes_orders", JSON.stringify(orderList));

    // Simpan detail
    const orderDetails = localStorage.getItem("nes_order_details");
    const detailList = orderDetails ? JSON.parse(orderDetails) : [];
    details.forEach(d => detailList.push(d));
    localStorage.setItem("nes_order_details", JSON.stringify(detailList));
}

/**
 * Ambil pesanan milik user yang sedang login
 * @param {string} statusFilter - Filter status ("all", "proses", "dikemas", "dikirim", "selesai")
 * @returns {array} Array pesanan user
 */
function getMyOrders(statusFilter = "all") {
    const session = getSession();
    if (!session) return [];

    let orders = getAllOrders().filter(o => o.id_user === session.id_user);
    
    if (statusFilter !== "all") {
        orders = orders.filter(o => o.status === statusFilter);
    }

    // Tambahkan info produk dari detail
    const allDetails = getAllOrderDetails();
    orders = orders.map(order => {
        const detail = allDetails.find(d => d.id_transaksi === order.id_transaksi);
        if (detail) {
            const produk = getProdukById(detail.id_produk);
            return {
                ...order,
                nama_produk: produk ? produk.nama_produk : "Produk Dihapus",
                gambar: produk ? produk.gambar : "",
                jumlah: detail.jumlah,
                harga_satuan: detail.harga_satuan
            };
        }
        return order;
    });

    // Sort by tanggal terbaru
    orders.sort((a, b) => new Date(b.tanggal_transaksi) - new Date(a.tanggal_transaksi));

    return orders;
}

/**
 * Proses checkout langsung dari detail produk
 * @param {number} idProduk - ID produk
 * @param {number} jumlah - Jumlah unit
 * @param {string} metodePembayaran - Metode pembayaran
 * @param {string} pin - PIN konfirmasi
 * @returns {object} {success: boolean, message: string}
 */
function processDirectCheckout(idProduk, jumlah, metodePembayaran, pin) {
    const session = getSession();
    if (!session) return { success: false, message: "Silakan login!" };

    // Validasi PIN
    if (pin !== session.pin_pembayaran) {
        return { success: false, message: "PIN salah!" };
    }

    const produk = getProdukById(idProduk);
    if (!produk) return { success: false, message: "Produk tidak ditemukan!" };

    // Hitung ongkir
    const ongkir = (session.kota && session.kota.includes("Jakarta") && !session.kota.includes("Luar")) ? 0 : 10000;
    const subtotal = produk.harga * jumlah;
    const total = subtotal + ongkir;

    // Buat pesanan
    const order = {
        id_transaksi: Date.now(),
        id_user: session.id_user,
        total_harga: subtotal,
        total_akhir: total,
        status: "proses",
        metode_pembayaran: metodePembayaran,
        jasa_kirim: "JNE",
        tanggal_transaksi: new Date().toISOString().replace("T", " ").substring(0, 19),
        nama_pelanggan: session.nama
    };

    const detail = {
        id_detail: Date.now() + 1,
        id_transaksi: order.id_transaksi,
        id_produk: parseInt(idProduk),
        jumlah: parseInt(jumlah),
        harga_satuan: produk.harga
    };

    saveOrder(order, [detail]);
    return { success: true, message: "Pesanan berhasil dibuat!" };
}

/**
 * Proses checkout dari keranjang (multi item)
 * @param {array} cartItemIds - Array ID keranjang yang akan di-checkout
 * @param {string} bank - Bank pembayaran
 * @param {string} jasaKirim - Jasa pengiriman
 * @returns {object} {success: boolean, message: string}
 */
function processCartCheckout(cartItemIds, bank, jasaKirim) {
    const session = getSession();
    if (!session) return { success: false, message: "Silakan login!" };

    const cart = getMyCart();
    const selectedItems = cart.filter(item => cartItemIds.includes(item.id_keranjang));

    if (selectedItems.length === 0) {
        return { success: false, message: "Tidak ada item yang dipilih!" };
    }

    // Hitung total
    const ongkir = (session.kota && session.kota.includes("Jakarta") && !session.kota.includes("Luar")) ? 0 : 10000;
    const subtotal = selectedItems.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const total = subtotal + ongkir;

    // Buat pesanan
    const orderId = Date.now();
    const order = {
        id_transaksi: orderId,
        id_user: session.id_user,
        total_harga: subtotal,
        total_akhir: total,
        status: "proses",
        metode_pembayaran: "Transfer " + bank,
        jasa_kirim: jasaKirim,
        tanggal_transaksi: new Date().toISOString().replace("T", " ").substring(0, 19),
        nama_pelanggan: session.nama
    };

    // Buat detail per item
    const details = selectedItems.map((item, i) => ({
        id_detail: orderId + i + 1,
        id_transaksi: orderId,
        id_produk: item.id_produk,
        jumlah: item.qty,
        harga_satuan: item.harga
    }));

    saveOrder(order, details);
    clearCheckedOutItems(cartItemIds);

    return { success: true, message: "Pesanan berhasil dibuat!" };
}

/**
 * Update status pesanan (untuk admin)
 * @param {number} idTransaksi - ID transaksi
 * @param {string} newStatus - Status baru
 */
function updateOrderStatus(idTransaksi, newStatus) {
    // Update di DATA_TRANSAKSI (dummy)
    const dummyIndex = DATA_TRANSAKSI.findIndex(t => t.id_transaksi === parseInt(idTransaksi));
    if (dummyIndex >= 0) {
        DATA_TRANSAKSI[dummyIndex].status = newStatus;
        // Simpan perubahan dummy ke localStorage agar persist
        localStorage.setItem("nes_transaksi_updates", JSON.stringify(
            DATA_TRANSAKSI.map(t => ({ id: t.id_transaksi, status: t.status }))
        ));
        return;
    }

    // Update di custom orders
    const orders = localStorage.getItem("nes_orders");
    if (orders) {
        const orderList = JSON.parse(orders);
        const index = orderList.findIndex(o => o.id_transaksi === parseInt(idTransaksi));
        if (index >= 0) {
            orderList[index].status = newStatus;
            localStorage.setItem("nes_orders", JSON.stringify(orderList));
        }
    }
}

/**
 * Load status updates yang sudah disimpan
 * Dipanggil saat halaman dimuat
 */
function loadStatusUpdates() {
    const updates = localStorage.getItem("nes_transaksi_updates");
    if (updates) {
        const statusList = JSON.parse(updates);
        statusList.forEach(update => {
            const t = DATA_TRANSAKSI.find(t => t.id_transaksi === update.id);
            if (t) t.status = update.status;
        });
    }
}

// Auto-load status updates
if (typeof DATA_TRANSAKSI !== 'undefined') {
    loadStatusUpdates();
}
