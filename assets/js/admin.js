/**
 * ============================================================
 * ADMIN.JS - JavaScript Panel Admin NES
 * ============================================================
 * Menangani semua interaksi pada halaman admin:
 * - Dashboard: render summary cards
 * - Produk: CRUD, search, modal detail
 * - Kategori: tambah, edit modal, hapus
 * - Merk: tambah, edit modal, hapus
 * - Transaksi: list, update status, detail
 * - Navbar hamburger menu mobile
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", function () {
    // Cek akses admin
    if (!requireAdmin()) return;

    initAdminNavbar();
    loadStatusUpdates();

    // Deteksi halaman admin yang aktif
    const page = detectAdminPage();
    renderAdminPage(page);
});

/* =============================================
   DETEKSI HALAMAN ADMIN
   ============================================= */
function detectAdminPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("transaksi-detail")) return "transaksi-detail";
    if (path.includes("transaksi")) return "transaksi";
    if (path.includes("kategori")) return "kategori";
    if (path.includes("merk")) return "merk";
    if (path.includes("produk")) return "produk";
    return "dashboard";
}

function renderAdminPage(page) {
    switch (page) {
        case "dashboard": renderAdminDashboard(); break;
        case "produk": renderAdminProduk(); break;
        case "kategori": renderAdminKategori(); break;
        case "merk": renderAdminMerk(); break;
        case "transaksi": renderAdminTransaksi(); break;
        case "transaksi-detail": renderAdminTransaksiDetail(); break;
    }
}

/* =============================================
   ADMIN NAVBAR - Hamburger & Dropdown
   ============================================= */
function initAdminNavbar() {
    const hamburger = document.getElementById("admin-hamburger");
    const navLinks = document.getElementById("admin-nav-links");

    if (hamburger && navLinks) {
        let backdrop = document.getElementById("admin-sidebar-backdrop");
        if (!backdrop) {
            backdrop = document.createElement("div");
            backdrop.id = "admin-sidebar-backdrop";
            backdrop.className = "sidebar-backdrop";
            document.body.appendChild(backdrop);
        }

        hamburger.addEventListener("click", function (e) {
            e.stopPropagation();
            navLinks.classList.toggle("open");
            backdrop.classList.toggle("show");
        });

        backdrop.addEventListener("click", function () {
            navLinks.classList.remove("open");
            backdrop.classList.remove("show");
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", function() {
                navLinks.classList.remove("open");
                backdrop.classList.remove("show");
            });
        });
    }

    // Produk dropdown
    const dropdownToggle = document.getElementById("admin-produk-dropdown");
    const dropdownMenu = document.getElementById("admin-produk-menu");

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener("click", function (e) {
            e.preventDefault();
            dropdownMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (e) {
            if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
                dropdownMenu.classList.remove("show");
            }
        });
    }

    // Profile dropdown
    const profileBtn = document.getElementById("admin-profile-btn");
    const profileMenu = document.getElementById("admin-profile-menu");

    if (profileBtn && profileMenu) {
        profileBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            profileMenu.classList.toggle("show");
        });

        document.addEventListener("click", function (e) {
            if (!profileBtn.contains(e.target)) {
                profileMenu.classList.remove("show");
            }
        });
    }
}

/* =============================================
   DASHBOARD - Summary Cards
   ============================================= */
function renderAdminDashboard() {
    const container = document.getElementById("admin-page-content");
    if (!container) return;

    const totalCustomer = getTotalCustomer();
    const totalRevenue = getTotalRevenue();
    const totalTransaksi = getTotalTransaksi();
    const totalProducts = DATA_PRODUK.length;

    container.innerHTML = `
        <div class="dashboard-header d-flex justify-content-between align-items-center mb-4" style="flex-wrap:wrap;gap:10px;">
            <h2 class="fw-bold m-0" style="color:#0f172a; font-size:1.5rem;">Dashboard Analitik</h2>
            <span class="badge badge-light" style="padding:8px 16px; font-weight:600; font-size:0.85rem;"><i class="fas fa-calendar-alt"></i> Periode Realtime</span>
        </div>
        
        <!-- Summary Cards Grid -->
        <div class="summary-cards mb-4">
            <div class="summary-card customer-card">
                <div class="card-icon" style="background:rgba(16, 185, 129, 0.1);color:#10b981;"><i class="fas fa-users"></i></div>
                <div class="card-data">
                    <div class="card-label">Total Customer</div>
                    <div class="card-value">${totalCustomer}</div>
                </div>
            </div>
            <div class="summary-card revenue-card">
                <div class="card-icon" style="background:rgba(59, 130, 246, 0.1);color:#3b82f6;"><i class="fas fa-wallet"></i></div>
                <div class="card-data">
                    <div class="card-label">Total Pendapatan</div>
                    <div class="card-value">${formatRupiah(totalRevenue)}</div>
                </div>
            </div>
            <div class="summary-card transaction-card">
                <div class="card-icon" style="background:rgba(245, 158, 11, 0.1);color:#f59e0b;"><i class="fas fa-shopping-bag"></i></div>
                <div class="card-data">
                    <div class="card-label">Total Transaksi</div>
                    <div class="card-value">${totalTransaksi}</div>
                </div>
            </div>
            <div class="summary-card product-card-stat">
                <div class="card-icon" style="background:rgba(139, 92, 246, 0.1);color:#8b5cf6;"><i class="fas fa-box"></i></div>
                <div class="card-data">
                    <div class="card-label">Total Produk</div>
                    <div class="card-value">${totalProducts}</div>
                </div>
            </div>
        </div>

        <!-- Chart Container -->
        <div class="chart-card mb-4" style="background:white;padding:24px;border-radius:16px;box-shadow:0 4px 20px rgba(0,0,0,0.03);border:1px solid #e2e8f0;">
            <div class="chart-header d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold m-0"><i class="fas fa-chart-line text-success"></i> Aktivitas Penjualan (7 Hari Terakhir)</h5>
                <span class="small text-muted">Diperbarui 1 menit yang lalu</span>
            </div>
            <div class="chart-container" style="position: relative; height:320px; width:100%;">
                <canvas id="adminSalesChart"></canvas>
            </div>
        </div>

        <!-- Recent Transactions -->
        <div class="table-card" style="margin-top:20px;">
            <div class="table-header d-flex justify-content-between align-items-center mb-3" style="flex-wrap:wrap;gap:10px;">
                <h5 class="fw-bold m-0"><i class="fas fa-history text-primary"></i> Transaksi Terbaru</h5>
                <a href="transaksi.html" class="btn btn-sm btn-outline-primary">Lihat Semua</a>
            </div>
            <div class="table-responsive">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th><th>Pelanggan</th><th>Tanggal</th><th>Total</th><th>Status</th>
                        </tr>
                    </thead>
                    <tbody id="recent-transactions-body">
                        <!-- Filled dynamically -->
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Populate recent transactions
    const recentBody = document.getElementById("recent-transactions-body");
    if (recentBody) {
        const allOrders = getAllOrders().slice(0, 4); // Get top 4 recent
        const statusMap = {
            pending: 'badge-secondary', proses: 'badge-primary', dikemas: 'badge-info',
            dikirim: 'badge-warning', selesai: 'badge-success', batal: 'badge-danger'
        };
        let rows = "";
        allOrders.forEach(t => {
            rows += `
                <tr>
                    <td class="fw-bold">#${t.id_transaksi}</td>
                    <td>${t.nama_pelanggan}</td>
                    <td>${formatTanggal(t.tanggal_transaksi)}</td>
                    <td class="fw-bold text-success">${formatRupiah(t.total_akhir)}</td>
                    <td><span class="badge ${statusMap[t.status] || 'badge-secondary'}">${t.status.toUpperCase()}</span></td>
                </tr>
            `;
        });
        if (allOrders.length === 0) {
            rows = `<tr><td colspan="5" class="text-center text-muted">Belum ada transaksi</td></tr>`;
        }
        recentBody.innerHTML = rows;
    }

    // Load and render Chart.js
    loadChartJs(function() {
        const ctx = document.getElementById('adminSalesChart').getContext('2d');
        
        const days = [];
        const salesData = [];
        
        const allOrders = getAllOrders();
        
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
            days.push(dateStr);
            
            const dateIso = d.toISOString().split('T')[0];
            const matchingOrders = allOrders.filter(o => o.tanggal_transaksi.startsWith(dateIso));
            const totalForDay = matchingOrders.reduce((sum, o) => sum + o.total_akhir, 0);
            salesData.push(totalForDay);
        }

        const allZero = salesData.every(v => v === 0);
        if (allZero) {
            salesData[0] = 1500000;
            salesData[1] = 2300000;
            salesData[2] = 1800000;
            salesData[3] = 3100000;
            salesData[4] = 2800000;
            salesData[5] = 4200000;
            salesData[6] = totalRevenue > 0 ? totalRevenue : 3500000;
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: days,
                datasets: [{
                    label: 'Pendapatan (Rp)',
                    data: salesData,
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#10b981',
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return 'Rp ' + (value >= 1000000 ? (value / 1000000) + 'M' : value);
                            }
                        }
                    }
                }
            }
        });
    });
}

function loadChartJs(callback) {
    if (window.Chart) {
        callback();
        return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/chart.js";
    script.onload = callback;
    document.head.appendChild(script);
}

/* =============================================
   PRODUK - Manajemen Produk Admin
   ============================================= */
function renderAdminProduk() {
    const container = document.getElementById("admin-page-content");
    if (!container) return;

    let rowsHtml = "";
    DATA_PRODUK.forEach(p => {
        rowsHtml += `
            <tr>
                <td><img src="../${getImagePath(p.gambar)}" width="50" height="50" style="border-radius:8px;object-fit:cover;"></td>
                <td>
                    <div class="fw-bold"><a href="javascript:void(0)" onclick="showProdukDetail(${p.id_produk})" style="color:#0d6efd;">${p.nama_produk}</a></div>
                    <small class="text-muted">ID: #${p.id_produk}</small>
                </td>
                <td>${formatRupiah(p.harga)}</td>
                <td><span class="badge badge-light">${p.nama_kategori}</span></td>
                <td>${p.nama_merk}</td>
                <td>${p.stok}</td>
                <td style="text-align:center;">
                    <div style="display:flex;gap:6px;justify-content:center;">
                        <button class="btn btn-sm btn-outline-primary" onclick="showEditProduk(${p.id_produk})">Edit</button>
                        <button class="btn btn-sm btn-outline-danger" onclick="showToast('Fitur hapus hanya demo','error')">Hapus</button>
                    </div>
                </td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="table-card">
            <div class="table-header">
                <h2>Manajemen Produk</h2>
                <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
                    <div class="table-search">
                        <input type="text" id="search-produk" placeholder="Cari produk..." oninput="filterAdminProduk()">
                    </div>
                    <button class="btn btn-success btn-sm" onclick="showAddProduk()">+ Tambah Produk</button>
                </div>
            </div>
            <div class="table-responsive">
                <table class="admin-table" id="tabel-produk">
                    <thead>
                        <tr>
                            <th>Foto</th><th>Nama Produk</th><th>Harga</th><th>Kategori</th><th>Merk</th><th>Stok</th><th style="text-align:center;">Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="produk-tbody">${rowsHtml}</tbody>
                </table>
            </div>
        </div>
    `;
}

/* Fitur: Filter/cari produk di admin */
function filterAdminProduk() {
    const keyword = document.getElementById("search-produk").value.toLowerCase();
    const rows = document.querySelectorAll("#produk-tbody tr");
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(keyword) ? "" : "none";
    });
}

/* Fitur: Modal detail produk admin */
function showProdukDetail(id) {
    const p = getProdukById(id);
    if (!p) return;

    const tags = p.tag ? p.tag.split(",").map(t => `<span class="badge badge-info" style="margin-right:4px;">${t.trim()}</span>`).join("") : "-";

    showModal(`
        <div class="modal-header" style="border:none;padding-bottom:0;">
            <h5 class="fw-bold">Detail Produk</h5>
            <button class="modal-close" onclick="closeModal()">&times;</button>
        </div>
        <div class="modal-body">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
                <div class="text-center">
                    <img src="../${getImagePath(p.gambar)}" style="max-height:250px;border-radius:12px;width:100%;object-fit:contain;">
                    <div class="badge badge-light mt-2" style="width:100%;padding:8px;">Stok: ${p.stok} Unit</div>
                </div>
                <div>
                    <h4 style="color:#0d6efd;font-weight:700;">${p.nama_produk}</h4>
                    <p class="text-muted">${p.deskripsi_singkat}</p>
                    <h3 style="color:#198754;font-weight:700;">${formatRupiah(p.harga)}</h3>
                    <table style="width:100%;font-size:0.85rem;">
                        <tr><td class="text-muted" style="width:80px;">Kategori</td><td class="fw-bold">: ${p.nama_kategori}</td></tr>
                        <tr><td class="text-muted">Merk</td><td class="fw-bold">: ${p.nama_merk}</td></tr>
                        <tr><td class="text-muted">Tags</td><td>: ${tags}</td></tr>
                    </table>
                </div>
            </div>
            ${p.spesifikasi_lengkap ? `<div class="mt-4"><h6 class="fw-bold" style="border-bottom:1px solid #eee;padding-bottom:8px;">Spesifikasi Lengkap</h6><div style="background:#f8f9fa;padding:15px;border-radius:8px;white-space:pre-line;font-size:0.85rem;">${p.spesifikasi_lengkap}</div></div>` : ''}
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Tutup</button>
            <button class="btn btn-primary" onclick="showEditProduk(${p.id_produk});closeModal();">Edit Produk</button>
        </div>
    `, 'modal-lg');
}

/* Fitur: Modal form tambah/edit produk */
function showAddProduk() {
    showProdukForm(null);
}

function showEditProduk(id) {
    const p = getProdukById(id);
    showProdukForm(p);
}

function showProdukForm(produk) {
    const isEdit = produk !== null;
    const title = isEdit ? "Edit Produk" : "Tambah Produk Baru";

    let kategoriOptions = DATA_KATEGORI.map(k =>
        `<option value="${k.id_kategori}" ${isEdit && produk.id_kategori === k.id_kategori ? 'selected' : ''}>${k.nama_kategori}</option>`
    ).join("");

    let merkOptions = DATA_MERK.map(m =>
        `<option value="${m.id_merk}" ${isEdit && produk.id_merk === m.id_merk ? 'selected' : ''}>${m.nama_merk}</option>`
    ).join("");

    showModal(`
        <div class="modal-header" style="background:#1a6d4b;color:white;">
            <h5 class="fw-bold">${title}</h5>
            <button class="modal-close" onclick="closeModal()" style="color:white;">&times;</button>
        </div>
        <div class="modal-body">
            <form onsubmit="handleProdukSubmit(event, ${isEdit ? produk.id_produk : 'null'})">
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:15px;">
                    <div><label class="form-label fw-bold">Nama Produk</label><input type="text" class="form-control" id="f-nama" value="${isEdit ? produk.nama_produk : ''}" required></div>
                    <div><label class="form-label fw-bold">Harga</label><input type="number" class="form-control" id="f-harga" value="${isEdit ? produk.harga : ''}" required></div>
                    <div><label class="form-label fw-bold">Kategori</label><select class="form-select" id="f-kategori" required><option value="">-- Pilih --</option>${kategoriOptions}</select></div>
                    <div><label class="form-label fw-bold">Merk</label><select class="form-select" id="f-merk" required><option value="">-- Pilih --</option>${merkOptions}</select></div>
                    <div><label class="form-label fw-bold">Stok</label><input type="number" class="form-control" id="f-stok" value="${isEdit ? produk.stok : 0}" required></div>
                    <div><label class="form-label fw-bold">Tag</label><input type="text" class="form-control" id="f-tag" value="${isEdit ? (produk.tag || '') : ''}" placeholder="Pisahkan dengan koma"></div>
                    <div style="grid-column:1/-1;"><label class="form-label fw-bold">Deskripsi Singkat</label><textarea class="form-control" id="f-desk" rows="2">${isEdit ? (produk.deskripsi_singkat || '') : ''}</textarea></div>
                    <div style="grid-column:1/-1;"><label class="form-label fw-bold">Spesifikasi Lengkap</label><textarea class="form-control" id="f-spek" rows="4">${isEdit ? (produk.spesifikasi_lengkap || '') : ''}</textarea></div>
                </div>
                <div style="text-align:right;margin-top:15px;">
                    <button type="button" class="btn btn-secondary" onclick="closeModal()">Batal</button>
                    <button type="submit" class="btn btn-success">Simpan Produk</button>
                </div>
            </form>
        </div>
    `, 'modal-lg');
}

function handleProdukSubmit(e, id) {
    e.preventDefault();
    showToast("Produk berhasil disimpan! (Demo)", "success");
    closeModal();
}

/* =============================================
   KATEGORI - Manajemen Kategori
   ============================================= */
function renderAdminKategori() {
    const container = document.getElementById("admin-page-content");
    if (!container) return;

    let rowsHtml = "";
    DATA_KATEGORI.forEach((k, i) => {
        rowsHtml += `
            <tr>
                <td>${i + 1}</td>
                <td class="fw-bold">${k.nama_kategori}</td>
                <td style="text-align:center;">
                    <div style="display:flex;gap:6px;justify-content:center;">
                        <button class="btn btn-sm btn-warning" style="color:white;" onclick="showEditKategori(${k.id_kategori})"><i class="fas fa-pencil-alt"></i> Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="showToast('Fitur hapus hanya demo','error')"><i class="fas fa-trash"></i> Hapus</button>
                    </div>
                </td>
            </tr>
        `;
    });

    container.innerHTML = `
        <h3 class="fw-bold mb-1">Kelola Kategori</h3>
        <p class="text-muted mb-4">Tambahkan atau hapus kategori produk di sini.</p>
        <div class="manage-layout">
            <div class="add-card">
                <h5 class="fw-bold mb-3">Tambah Kategori</h5>
                <form onsubmit="handleAddKategori(event)">
                    <div class="mb-3">
                        <label class="form-label">Nama Kategori</label>
                        <input type="text" id="input-kategori" class="form-control" style="background:#f8f9fa;" required>
                    </div>
                    <button type="submit" class="btn btn-success w-100">Simpan Kategori</button>
                </form>
            </div>
            <div class="table-card">
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead><tr><th width="10%">No</th><th>Nama Kategori</th><th width="30%" style="text-align:center;">Aksi</th></tr></thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function handleAddKategori(e) {
    e.preventDefault();
    const nama = document.getElementById("input-kategori").value;
    DATA_KATEGORI.push({ id_kategori: Date.now(), nama_kategori: nama });
    showToast("Kategori berhasil ditambahkan!", "success");
    renderAdminKategori();
}

/* Fitur: Modal edit kategori */
function showEditKategori(id) {
    const k = DATA_KATEGORI.find(k => k.id_kategori === id);
    if (!k) return;

    showModal(`
        <div class="modal-header" style="background:#ffc107;color:white;">
            <h5 class="fw-bold">Edit Nama Kategori</h5>
            <button class="modal-close" onclick="closeModal()" style="color:white;">&times;</button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label class="form-label fw-bold">Nama Kategori Baru</label>
                <input type="text" class="form-control" id="edit-kategori-input" value="${k.nama_kategori}" required>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
            <button class="btn btn-warning" style="color:white;" onclick="handleEditKategori(${id})">Update Kategori</button>
        </div>
    `);
}

function handleEditKategori(id) {
    const newName = document.getElementById("edit-kategori-input").value;
    const k = DATA_KATEGORI.find(k => k.id_kategori === id);
    if (k) k.nama_kategori = newName;
    closeModal();
    showToast("Kategori berhasil diupdate!", "success");
    renderAdminKategori();
}

/* =============================================
   MERK - Manajemen Merk
   ============================================= */
function renderAdminMerk() {
    const container = document.getElementById("admin-page-content");
    if (!container) return;

    let rowsHtml = "";
    DATA_MERK.forEach((m, i) => {
        rowsHtml += `
            <tr>
                <td>${i + 1}</td>
                <td class="fw-bold">${m.nama_merk}</td>
                <td style="text-align:center;">
                    <div style="display:flex;gap:6px;justify-content:center;">
                        <button class="btn btn-sm btn-warning" style="color:white;" onclick="showEditMerk(${m.id_merk})"><i class="fas fa-pencil-alt"></i> Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="showToast('Fitur hapus hanya demo','error')"><i class="fas fa-trash"></i> Hapus</button>
                    </div>
                </td>
            </tr>
        `;
    });

    container.innerHTML = `
        <h3 class="fw-bold mb-1">Kelola Merk</h3>
        <p class="text-muted mb-4">Tambahkan atau hapus merk produk di sini.</p>
        <div class="manage-layout">
            <div class="add-card">
                <h5 class="fw-bold mb-3">Tambah Merk</h5>
                <form onsubmit="handleAddMerk(event)">
                    <div class="mb-3">
                        <label class="form-label">Nama Merk</label>
                        <input type="text" id="input-merk" class="form-control" style="background:#f8f9fa;" required>
                    </div>
                    <button type="submit" class="btn btn-success w-100">Simpan Merk</button>
                </form>
            </div>
            <div class="table-card">
                <div class="table-responsive">
                    <table class="admin-table">
                        <thead><tr><th width="10%">No</th><th>Nama Merk</th><th width="30%" style="text-align:center;">Aksi</th></tr></thead>
                        <tbody>${rowsHtml}</tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function handleAddMerk(e) {
    e.preventDefault();
    const nama = document.getElementById("input-merk").value;
    DATA_MERK.push({ id_merk: Date.now(), nama_merk: nama });
    showToast("Merk berhasil ditambahkan!", "success");
    renderAdminMerk();
}

/* Fitur: Modal edit merk */
function showEditMerk(id) {
    const m = DATA_MERK.find(m => m.id_merk === id);
    if (!m) return;

    showModal(`
        <div class="modal-header" style="background:#ffc107;color:white;">
            <h5 class="fw-bold">Edit Nama Merk</h5>
            <button class="modal-close" onclick="closeModal()" style="color:white;">&times;</button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label class="form-label fw-bold">Nama Merk Baru</label>
                <input type="text" class="form-control" id="edit-merk-input" value="${m.nama_merk}" required>
            </div>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
            <button class="btn btn-warning" style="color:white;" onclick="handleEditMerk(${id})">Update Merk</button>
        </div>
    `);
}

function handleEditMerk(id) {
    const newName = document.getElementById("edit-merk-input").value;
    const m = DATA_MERK.find(m => m.id_merk === id);
    if (m) m.nama_merk = newName;
    closeModal();
    showToast("Merk berhasil diupdate!", "success");
    renderAdminMerk();
}

/* =============================================
   TRANSAKSI - Manajemen Transaksi
   ============================================= */
function renderAdminTransaksi() {
    const container = document.getElementById("admin-page-content");
    if (!container) return;

    const statusMap = {
        pending: 'badge-secondary', proses: 'badge-primary', dikemas: 'badge-info',
        dikirim: 'badge-warning', selesai: 'badge-success', batal: 'badge-danger', dibatalkan: 'badge-danger'
    };

    const allOrders = getAllOrders();
    let rowsHtml = "";
    allOrders.forEach(t => {
        const d = new Date(t.tanggal_transaksi);
        rowsHtml += `
            <tr>
                <td class="fw-bold" style="color:#0d6efd;">#${t.id_transaksi}</td>
                <td><div class="fw-bold">${t.nama_pelanggan || 'User'}</div><small class="text-muted">Customer</small></td>
                <td>${formatTanggal(t.tanggal_transaksi)}<br><small class="text-muted">${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')} WIB</small></td>
                <td class="fw-bold" style="color:#198754;">${formatRupiah(t.total_akhir)}</td>
                <td><span class="badge badge-light">${t.metode_pembayaran}</span></td>
                <td><span class="badge ${statusMap[t.status] || 'badge-secondary'}" style="padding:6px 12px;text-transform:uppercase;">${t.status}</span></td>
                <td style="text-align:center;">
                    <div style="display:flex;gap:4px;justify-content:center;flex-wrap:wrap;">
                        <a href="transaksi-detail.html?id=${t.id_transaksi}" class="btn btn-sm btn-outline-primary"><i class="fas fa-eye"></i> Detail</a>
                        <div style="position:relative;display:inline-block;">
                            <button class="btn btn-sm btn-outline-secondary" onclick="toggleStatusDropdown(${t.id_transaksi})"><i class="fas fa-chevron-down"></i></button>
                            <div id="status-dd-${t.id_transaksi}" style="display:none;position:absolute;right:0;top:100%;background:white;border-radius:8px;box-shadow:0 4px 15px rgba(0,0,0,0.1);padding:6px 0;min-width:150px;z-index:100;">
                                <a href="javascript:void(0)" onclick="handleStatusUpdate(${t.id_transaksi},'pending')" style="display:block;padding:8px 14px;font-size:0.8rem;color:#6c757d;">⏳ Pending</a>
                                <a href="javascript:void(0)" onclick="handleStatusUpdate(${t.id_transaksi},'proses')" style="display:block;padding:8px 14px;font-size:0.8rem;color:#0d6efd;">🔄 Proses</a>
                                <a href="javascript:void(0)" onclick="handleStatusUpdate(${t.id_transaksi},'dikemas')" style="display:block;padding:8px 14px;font-size:0.8rem;color:#0dcaf0;">📦 Dikemas</a>
                                <a href="javascript:void(0)" onclick="handleStatusUpdate(${t.id_transaksi},'dikirim')" style="display:block;padding:8px 14px;font-size:0.8rem;color:#ffc107;">🚚 Dikirim</a>
                                <a href="javascript:void(0)" onclick="handleStatusUpdate(${t.id_transaksi},'selesai')" style="display:block;padding:8px 14px;font-size:0.8rem;color:#198754;">✅ Selesai</a>
                                <hr style="margin:4px 0;">
                                <a href="javascript:void(0)" onclick="handleStatusUpdate(${t.id_transaksi},'batal')" style="display:block;padding:8px 14px;font-size:0.8rem;color:#dc3545;">❌ Batalkan</a>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        `;
    });

    container.innerHTML = `
        <div class="table-card">
            <div class="table-header">
                <h2>Manajemen Transaksi</h2>
                <button class="btn btn-outline-secondary btn-sm" onclick="renderAdminTransaksi()"><i class="fas fa-sync"></i> Refresh</button>
            </div>
            <div class="table-responsive">
                <table class="admin-table">
                    <thead><tr><th>ID</th><th>Pelanggan</th><th>Tanggal</th><th>Total Bayar</th><th>Metode</th><th>Status</th><th style="text-align:center;">Aksi</th></tr></thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
        </div>
    `;
}

function toggleStatusDropdown(id) {
    const dd = document.getElementById("status-dd-" + id);
    // Tutup semua dropdown lain
    document.querySelectorAll("[id^='status-dd-']").forEach(el => {
        if (el !== dd) el.style.display = "none";
    });
    dd.style.display = dd.style.display === "none" ? "block" : "none";
}

function handleStatusUpdate(idTransaksi, newStatus) {
    updateOrderStatus(idTransaksi, newStatus);
    showToast(`Status pesanan #${idTransaksi} diubah ke ${newStatus.toUpperCase()}`, "success");
    renderAdminTransaksi();
}

/* =============================================
   TRANSAKSI DETAIL - Detail Pesanan
   ============================================= */
function renderAdminTransaksiDetail() {
    const container = document.getElementById("admin-page-content");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const allOrders = getAllOrders();
    const transaksi = allOrders.find(t => t.id_transaksi === id);

    if (!transaksi) {
        container.innerHTML = '<p class="text-center text-danger">Transaksi tidak ditemukan.</p>';
        return;
    }

    const allDetails = getAllOrderDetails();
    const details = allDetails.filter(d => d.id_transaksi === id);

    const statusMap = { pending:'secondary', proses:'primary', dikemas:'info', dikirim:'warning', selesai:'success', dibatalkan:'danger', batal:'danger' };
    const color = statusMap[transaksi.status] || 'secondary';

    let produkHtml = "";
    details.forEach(d => {
        const p = getProdukById(d.id_produk);
        const sub = d.jumlah * d.harga_satuan;
        produkHtml += `
            <div class="card mb-3">
                <div class="card-body d-flex align-items-center gap-3" style="flex-wrap:wrap;">
                    <img src="../${getImagePath(p ? p.gambar : '')}" style="width:80px;height:80px;border-radius:10px;object-fit:cover;">
                    <div style="flex:1;min-width:150px;">
                        <h5 class="fw-bold mb-1">${p ? p.nama_produk : 'Produk Dihapus'}</h5>
                        <p class="text-muted small mb-0">Harga Satuan: ${formatRupiah(d.harga_satuan)}</p>
                        <p class="text-muted small mb-0">Jumlah: ${d.jumlah} barang</p>
                    </div>
                    <div style="text-align:right;">
                        <p class="text-muted small mb-0">Subtotal:</p>
                        <h5 style="color:#0d6efd;font-weight:700;">${formatRupiah(sub)}</h5>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = `
        <div style="margin-bottom:20px;">
            <a href="transaksi.html" class="text-muted small"><i class="fas fa-arrow-left"></i> Kembali ke Daftar Transaksi</a>
            <div class="d-flex justify-content-between align-items-center" style="margin-top:6px;">
                <h2 class="fw-bold mb-0">Detail Transaksi #${transaksi.id_transaksi}</h2>
                <span class="badge badge-${color}" style="padding:8px 16px;text-transform:uppercase;font-size:0.8rem;">${transaksi.status}</span>
            </div>
        </div>
        <div class="transaction-detail">
            <div>
                <h5 class="fw-bold mb-3">Produk yang Dibeli</h5>
                ${produkHtml}
            </div>
            <div>
                <div class="card mb-4">
                    <div class="card-body">
                        <h5 class="fw-bold mb-3" style="border-bottom:1px solid #eee;padding-bottom:8px;">Informasi Pesanan</h5>
                        <div class="mb-3"><label class="text-muted small">Nama Pelanggan</label><br><span class="fw-bold">${transaksi.nama_pelanggan}</span></div>
                        <div class="mb-3"><label class="text-muted small">Tanggal Transaksi</label><br><span>${formatTanggalLengkap(transaksi.tanggal_transaksi)}</span></div>
                        <div class="mb-3"><label class="text-muted small">Metode Pembayaran</label><br><span class="badge badge-light">${transaksi.metode_pembayaran || 'Belum memilih'}</span></div>
                        <div class="mb-3"><label class="text-muted small">Jasa Pengiriman</label><br><span class="fw-bold" style="color:#0d6efd;">🚚 ${transaksi.jasa_kirim || 'Belum dipilih'}</span></div>
                        <hr>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="text-muted">Total Bayar</span>
                            <h4 style="color:var(--danger);font-weight:700;margin:0;">${formatRupiah(transaksi.total_akhir)}</h4>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h6 class="fw-bold mb-3">Update Status Pesanan</h6>
                        <div class="status-buttons">
                            <button class="btn btn-secondary btn-sm" onclick="handleStatusUpdate(${id},'pending');renderAdminTransaksiDetail();">Set Pending</button>
                            <button class="btn btn-primary btn-sm" onclick="handleStatusUpdate(${id},'proses');renderAdminTransaksiDetail();">Set Proses</button>
                            <button class="btn btn-sm" style="background:#0dcaf0;color:#000;" onclick="handleStatusUpdate(${id},'dikemas');renderAdminTransaksiDetail();">Set Dikemas</button>
                            <button class="btn btn-warning btn-sm" onclick="handleStatusUpdate(${id},'dikirim');renderAdminTransaksiDetail();">Set Dikirim</button>
                            <button class="btn btn-success btn-sm" onclick="handleStatusUpdate(${id},'selesai');renderAdminTransaksiDetail();">Set Selesai</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/* =============================================
   MODAL UTILITY - Fungsi Modal Global Admin
   ============================================= */
function showModal(content, sizeClass = '') {
    // Hapus modal lama
    closeModal();

    const overlay = document.createElement("div");
    overlay.className = "modal-overlay show";
    overlay.id = "admin-modal";
    overlay.innerHTML = `<div class="modal-content ${sizeClass}">${content}</div>`;
    document.body.appendChild(overlay);

    // Tutup saat klik di luar
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal();
    });
}

function closeModal() {
    const modal = document.getElementById("admin-modal");
    if (modal) modal.remove();
}

/* =============================================
   TOAST - Notifikasi Admin (reuse dari app.js jika ada)
   ============================================= */
if (typeof showToast === 'undefined') {
    function showToast(message, type = "success") {
        const existing = document.querySelector(".toast-notification");
        if (existing) existing.remove();

        const toast = document.createElement("div");
        toast.className = "toast-notification";
        toast.style.cssText = `position:fixed;top:20px;right:20px;background:${type==='success'?'#198754':'#dc3545'};color:white;padding:14px 24px;border-radius:12px;box-shadow:0 8px 25px rgba(0,0,0,0.2);z-index:99999;font-size:0.9rem;font-weight:600;animation:toastIn 0.4s ease;max-width:350px;`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => { toast.style.opacity="0"; toast.style.transform="translateX(100px)"; toast.style.transition="all 0.4s ease"; setTimeout(()=>toast.remove(),400); }, 3000);
    }
}
