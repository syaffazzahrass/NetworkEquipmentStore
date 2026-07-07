/**
 * ============================================================
 * OWNER.JS - JavaScript Panel Owner NES
 * ============================================================
 * Menangani halaman owner:
 * - Dashboard: summary cards (Customer, Revenue, Transaction)
 * - Product: tabel produk read-only
 * - Transaksi: tabel transaksi selesai
 * - Navbar hamburger menu mobile
 * ============================================================
 */

document.addEventListener("DOMContentLoaded", function () {
    // Cek akses owner
    if (!requireOwner()) return;

    initOwnerNavbar();
    loadStatusUpdates();

    const page = detectOwnerPage();
    renderOwnerPage(page);
});

/* =============================================
   DETEKSI HALAMAN OWNER
   ============================================= */
function detectOwnerPage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes("transaksi")) return "transaksi";
    if (path.includes("produk")) return "produk";
    return "dashboard";
}

function renderOwnerPage(page) {
    switch (page) {
        case "dashboard": renderOwnerDashboard(); break;
        case "produk": renderOwnerProduk(); break;
        case "transaksi": renderOwnerTransaksi(); break;
    }
}

/* =============================================
   OWNER NAVBAR - Hamburger Menu
   ============================================= */
function initOwnerNavbar() {
    const hamburger = document.getElementById("owner-hamburger");
    const navLinks = document.getElementById("owner-nav-links");

    if (hamburger && navLinks) {
        let backdrop = document.getElementById("owner-sidebar-backdrop");
        if (!backdrop) {
            backdrop = document.createElement("div");
            backdrop.id = "owner-sidebar-backdrop";
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

    // Profile dropdown
    const profileBtn = document.getElementById("owner-profile-btn");
    const profileMenu = document.getElementById("owner-profile-menu");

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
   DASHBOARD OWNER - Summary Cards
   ============================================= */
function renderOwnerDashboard() {
    const container = document.getElementById("owner-page-content");
    if (!container) return;

    const totalCustomer = getTotalCustomer();
    const totalRevenue = getTotalRevenue();
    const totalTransaksi = getTotalTransaksi();
    const totalProducts = DATA_PRODUK.length;

    container.innerHTML = `
        <div class="dashboard-header d-flex justify-content-between align-items-center mb-4" style="flex-wrap:wrap;gap:10px;">
            <h2 class="fw-bold m-0" style="color:#0f172a; font-size:1.5rem;">Dashboard Eksekutif Owner</h2>
            <span class="badge badge-light" style="padding:8px 16px; font-weight:600; font-size:0.85rem;"><i class="fas fa-chart-pie"></i> Laporan Finansial</span>
        </div>
        
        <!-- Summary Cards Grid -->
        <div class="owner-summary-cards mb-4">
            <div class="owner-summary-card" style="background:#eff6ff; border: 1px solid #dbeafe; padding: 24px; border-radius: 12px;">
                <div class="card-label" style="color:#1e3a8a; font-weight:700; font-size:0.85rem; margin-bottom:8px;">Customer Terdaftar</div>
                <div class="card-value" style="color:#1e40af; font-size:1.5rem; font-weight:800;">${totalCustomer} User</div>
            </div>
            <div class="owner-summary-card" style="background:#f0fdf4; border: 1px solid #bbf7d0; padding: 24px; border-radius: 12px;">
                <div class="card-label" style="color:#065f46; font-weight:700; font-size:0.85rem; margin-bottom:8px;">Total Omset</div>
                <div class="card-value" style="color:#15803d; font-size:1.5rem; font-weight:800;">${formatRupiah(totalRevenue)}</div>
            </div>
            <div class="owner-summary-card" style="background:#fffbeb; border: 1px solid #fef08a; padding: 24px; border-radius: 12px;">
                <div class="card-label" style="color:#78350f; font-weight:700; font-size:0.85rem; margin-bottom:8px;">Volume Transaksi</div>
                <div class="card-value" style="color:#b45309; font-size:1.5rem; font-weight:800;">${totalTransaksi} Pesanan</div>
            </div>
            <div class="owner-summary-card" style="background:#faf5ff; border: 1px solid #e9d5ff; padding: 24px; border-radius: 12px;">
                <div class="card-label" style="color:#581c87; font-weight:700; font-size:0.85rem; margin-bottom:8px;">Aset Produk</div>
                <div class="card-value" style="color:#6b21a8; font-size:1.5rem; font-weight:800;">${totalProducts} Item</div>
            </div>
        </div>

        <!-- Chart Container -->
        <div class="chart-card mb-4" style="background:white;padding:24px;border-radius:16px;box-shadow:0 4px 20 rgba(0,0,0,0.03);border:1px solid #e7e5e4;">
            <div class="chart-header d-flex justify-content-between align-items-center mb-3">
                <h5 class="fw-bold m-0" style="color:#0f172a;"><i class="fas fa-chart-bar text-warning"></i> Statistik Omset Finansial Bulanan</h5>
                <span class="small text-muted">Laporan Konsolidasi</span>
            </div>
            <div class="chart-container" style="position: relative; height:320px; width:100%;">
                <canvas id="ownerRevenueChart"></canvas>
            </div>
        </div>

        <!-- Financial Summary Table -->
        <div class="owner-table-card" style="margin-top:20px;">
            <div class="table-header d-flex justify-content-between align-items-center mb-3" style="flex-wrap:wrap;gap:10px;">
                <h5 class="fw-bold m-0"><i class="fas fa-file-invoice-dollar text-success"></i> Ringkasan Penjualan Selesai</h5>
                <a href="transaksi.html" class="btn btn-sm btn-danger">Cek Semua Transaksi</a>
            </div>
            <div class="table-responsive">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>No</th><th>Bulan</th><th>Jumlah Transaksi</th><th>Rata-rata Penjualan</th><th>Total Omset</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td class="fw-bold">Juni 2026</td>
                            <td>${totalTransaksi}</td>
                            <td class="fw-bold text-success">${formatRupiah(totalTransaksi > 0 ? (totalRevenue / totalTransaksi) : 0)}</td>
                            <td class="fw-bold text-primary">${formatRupiah(totalRevenue)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    // Load and render Chart.js
    loadChartJs(function() {
        const ctx = document.getElementById('ownerRevenueChart').getContext('2d');
        
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const revenueData = [12000000, 18500000, 15000000, 24000000, 29000000, totalRevenue > 0 ? totalRevenue : 35000000];

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Omset Bersih (Rp)',
                    data: revenueData,
                    backgroundColor: [
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(59, 130, 246, 0.7)',
                        'rgba(245, 158, 11, 0.85)'
                    ],
                    borderColor: [
                        '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#3b82f6', '#f59e0b'
                    ],
                    borderWidth: 2,
                    borderRadius: 8
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
                                return 'Rp ' + (value >= 1000000 ? (value / 1000000) + 'Jt' : value);
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
   PRODUK OWNER - Tabel Produk (Read-Only)
   ============================================= */
function renderOwnerProduk() {
    const container = document.getElementById("owner-page-content");
    if (!container) return;

    let rowsHtml = "";
    DATA_PRODUK.forEach(p => {
        rowsHtml += `
            <tr>
                <td>${p.id_produk}</td>
                <td>${p.nama_produk}</td>
                <td>${formatRupiah(p.harga)}</td>
                <td>${p.nama_kategori}</td>
                <td>${p.stok}</td>
            </tr>
        `;
    });

    container.innerHTML = `
        <h3 class="fw-bold mb-4">My Product</h3>
        <div class="owner-table-card">
            <div class="table-responsive">
                <table class="admin-table" id="tabel-produk-owner">
                    <thead>
                        <tr><th>ID</th><th>Nama</th><th>Harga</th><th>Kategori</th><th>Stok</th></tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
        </div>
    `;
}

/* =============================================
   TRANSAKSI OWNER - Tabel Transaksi Selesai
   ============================================= */
function renderOwnerTransaksi() {
    const container = document.getElementById("owner-page-content");
    if (!container) return;

    const allOrders = getAllOrders();
    const selesaiOrders = allOrders.filter(t => t.status === "selesai");

    let rowsHtml = "";
    selesaiOrders.forEach(t => {
        rowsHtml += `
            <tr>
                <td>#${t.id_transaksi}</td>
                <td>${formatTanggalLengkap(t.tanggal_transaksi)}</td>
                <td>${t.nama_pelanggan || 'Guest'}</td>
                <td class="fw-bold">${formatRupiah(t.total_akhir)}</td>
                <td><span class="badge badge-light">${t.metode_pembayaran}</span></td>
                <td><span class="badge badge-success">SELESAI</span></td>
            </tr>
        `;
    });

    if (selesaiOrders.length === 0) {
        rowsHtml = '<tr><td colspan="6" class="text-center text-muted" style="padding:30px;">Belum ada transaksi selesai.</td></tr>';
    }

    container.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:10px;">
            <h3 class="fw-bold mb-0">Daftar Transaksi Selesai</h3>
            <button class="btn btn-danger btn-sm" onclick="showToast('Fitur cetak PDF hanya demo','error')">
                <i class="fas fa-file-pdf"></i> Cetak Semua PDF
            </button>
        </div>
        <div class="owner-table-card">
            <div class="table-responsive">
                <table class="admin-table">
                    <thead>
                        <tr><th>ID</th><th>Tanggal</th><th>Pelanggan</th><th>Total Akhir</th><th>Metode</th><th>Status</th></tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>
        </div>
    `;
}

/* =============================================
   TOAST OWNER (reuse jika belum ada)
   ============================================= */
if (typeof showToast === 'undefined') {
    function showToast(message, type = "success") {
        const existing = document.querySelector(".toast-notification");
        if (existing) existing.remove();
        const toast = document.createElement("div");
        toast.className = "toast-notification";
        toast.style.cssText = `position:fixed;top:20px;right:20px;background:${type==='success'?'#198754':'#dc3545'};color:white;padding:14px 24px;border-radius:12px;box-shadow:0 8px 25px rgba(0,0,0,0.2);z-index:99999;font-size:0.9rem;font-weight:600;max-width:350px;`;
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => { toast.remove(); }, 3000);
    }
}
