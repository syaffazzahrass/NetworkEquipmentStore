/**
 * ============================================================
 * AUTH.JS - Sistem Autentikasi Website NES
 * ============================================================
 * Mengelola login, logout, dan session management menggunakan
 * localStorage. Mendukung 3 role: Admin, Owner, Customer.
 * ============================================================
 */

/* =============================================
   SESSION MANAGEMENT
   Menggunakan localStorage untuk menyimpan data user
   ============================================= */

/**
 * Simpan data user ke session (localStorage)
 * @param {object} user - Object user dari DATA_USERS
 */
function setSession(user) {
    localStorage.setItem("nes_session", JSON.stringify({
        id_user: user.id_user,
        nama: user.nama,
        email: user.email,
        role: user.role,
        alamat: user.alamat,
        no_hp: user.no_hp,
        kota: user.kota,
        foto: user.foto,
        pin_pembayaran: user.pin_pembayaran,
        logged_in: true
    }));
}

/**
 * Ambil data session saat ini
 * @returns {object|null} Object session atau null jika belum login
 */
function getSession() {
    const data = localStorage.getItem("nes_session");
    return data ? JSON.parse(data) : null;
}

/**
 * Cek apakah user sudah login
 * @returns {boolean} True jika sudah login
 */
function isLoggedIn() {
    const session = getSession();
    return session && session.logged_in === true;
}

/**
 * Ambil role user saat ini
 * @returns {string|null} Role user (Admin/Owner/Customer) atau null
 */
function getUserRole() {
    const session = getSession();
    return session ? session.role : null;
}

/**
 * Hapus session (logout)
 */
function clearSession() {
    localStorage.removeItem("nes_session");
}

/**
 * Update data profil di session
 * @param {object} updates - Object berisi data yang akan diupdate
 */
function updateSession(updates) {
    const session = getSession();
    if (session) {
        Object.assign(session, updates);
        localStorage.setItem("nes_session", JSON.stringify(session));
    }
}

/* =============================================
   LOGIN FUNCTIONS
   Validasi credential dan redirect
   ============================================= */

/**
 * Proses login customer
 * Memvalidasi email dan password dari DATA_USERS
 * @param {string} email - Email customer
 * @param {string} password - Password customer
 * @returns {object} {success: boolean, message: string}
 */
function loginCustomer(email, password) {
    const user = DATA_USERS.find(u =>
        u.email === email &&
        u.password === password &&
        u.role === "Customer"
    );

    if (user) {
        setSession(user);
        return { success: true, message: "Login berhasil! Selamat datang, " + user.nama };
    }
    return { success: false, message: "Email atau password salah!" };
}

/**
 * Proses login admin/owner (internal)
 * Redirect ke dashboard sesuai role
 * @param {string} email - Email admin/owner
 * @param {string} password - Password admin/owner
 * @returns {object} {success: boolean, message: string, redirect: string}
 */
function loginInternal(email, password) {
    const user = DATA_USERS.find(u =>
        u.email === email &&
        u.password === password &&
        (u.role === "Admin" || u.role === "Owner")
    );

    if (user) {
        setSession(user);
        const redirect = user.role === "Admin" ? "admin/dashboard.html" : "owner/dashboard.html";
        return { success: true, message: "Login berhasil!", redirect: redirect };
    }
    return { success: false, message: "Email atau password salah!" };
}

/**
 * Tampilkan modal konfirmasi logout
 */
function logout() {
    // Buat overlay modal konfirmasi
    const existing = document.getElementById("nes-logout-modal");
    if (existing) existing.remove();

    const isInternal = window.location.pathname.includes("/admin/") || window.location.pathname.includes("/owner/");

    const modal = document.createElement("div");
    modal.id = "nes-logout-modal";
    modal.style.cssText = `
        position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:99999;
        display:flex;align-items:center;justify-content:center;
        animation:nesModalBgIn 0.2s ease;
    `;
    modal.innerHTML = `
        <div style="
            background:#fff;border-radius:16px;padding:32px 28px;max-width:360px;width:90%;
            box-shadow:0 20px 60px rgba(0,0,0,0.25);text-align:center;
            animation:nesModalIn 0.25s cubic-bezier(.34,1.56,.64,1);
        ">
            <div style="
                width:60px;height:60px;border-radius:50%;background:#fff3cd;
                display:flex;align-items:center;justify-content:center;
                margin:0 auto 16px;font-size:28px;
            ">⚠️</div>
            <h5 style="font-weight:700;margin-bottom:8px;color:#1a1a2e;">Keluar dari akun?</h5>
            <p style="color:#6c757d;font-size:0.9rem;margin-bottom:24px;">
                Kamu akan keluar dari sesi ini. Pastikan pesanan kamu sudah disimpan.
            </p>
            <div style="display:flex;gap:10px;justify-content:center;">
                <button onclick="document.getElementById('nes-logout-modal').remove()" style="
                    flex:1;padding:10px 16px;border-radius:8px;border:1.5px solid #dee2e6;
                    background:#fff;font-weight:600;cursor:pointer;font-size:0.9rem;color:#495057;
                    transition:all 0.2s;
                " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='#fff'">
                    Batal
                </button>
                <button onclick="confirmLogout(${isInternal})" style="
                    flex:1;padding:10px 16px;border-radius:8px;border:none;
                    background:#dc3545;color:#fff;font-weight:600;cursor:pointer;font-size:0.9rem;
                    transition:all 0.2s;
                " onmouseover="this.style.background='#bb2d3b'" onmouseout="this.style.background='#dc3545'">
                    Ya, Keluar
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    // Tutup jika klik luar modal
    modal.addEventListener("click", (e) => { if (e.target === modal) modal.remove(); });
}

/**
 * Eksekusi logout setelah konfirmasi
 */
function confirmLogout(isInternal) {
    const session = getSession();
    const nama = session ? session.nama : "";
    clearSession();
    // Simpan flag untuk trigger welcome-pop di halaman tujuan
    localStorage.setItem("nes_notify", JSON.stringify({ type: "logout", nama }));
    if (isInternal) {
        window.location.href = "../login-internal.html";
    } else {
        window.location.href = "index.html";
    }
}

/* =============================================
   PAGE PROTECTION
   Cek akses halaman berdasarkan role
   ============================================= */

/**
 * Proteksi halaman admin - redirect jika bukan admin
 */
function requireAdmin() {
    if (!isLoggedIn() || getUserRole() !== "Admin") {
        window.location.href = "../login-internal.html";
        return false;
    }
    return true;
}

/**
 * Proteksi halaman owner - redirect jika bukan owner
 */
function requireOwner() {
    if (!isLoggedIn() || getUserRole() !== "Owner") {
        window.location.href = "../login-internal.html";
        return false;
    }
    return true;
}

/**
 * Proteksi halaman yang butuh login customer
 */
function requireLogin() {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
        return false;
    }
    return true;
}

/* =============================================
   REGISTER FUNCTION
   Simpan akun baru ke localStorage
   ============================================= */

/**
 * Registrasi akun customer baru
 * @param {string} nama - Nama lengkap
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} {success: boolean, message: string}
 */
function registerCustomer(nama, email, password) {
    // Cek email sudah terdaftar
    const existing = DATA_USERS.find(u => u.email === email);
    if (existing) {
        return { success: false, message: "Email sudah terdaftar!" };
    }

    // Cek di registered users localStorage
    const registered = getRegisteredUsers();
    if (registered.find(u => u.email === email)) {
        return { success: false, message: "Email sudah terdaftar!" };
    }

    // Tambah user baru
    const newUser = {
        id_user: Date.now(),
        nama: nama,
        email: email,
        password: password,
        alamat: null,
        no_hp: null,
        kota: "Jakarta",
        foto: null,
        pin_pembayaran: "123456",
        role: "Customer"
    };

    registered.push(newUser);
    localStorage.setItem("nes_registered_users", JSON.stringify(registered));

    // Juga push ke DATA_USERS agar bisa login langsung
    DATA_USERS.push(newUser);

    return { success: true, message: "Registrasi berhasil! Silakan login." };
}

/**
 * Ambil daftar user yang terdaftar via form register
 * @returns {array} Array user yang terdaftar
 */
function getRegisteredUsers() {
    const data = localStorage.getItem("nes_registered_users");
    return data ? JSON.parse(data) : [];
}

/**
 * Load registered users ke DATA_USERS pada saat halaman dimuat
 * Agar user yang register bisa login
 */
function loadRegisteredUsers() {
    const registered = getRegisteredUsers();
    registered.forEach(u => {
        if (!DATA_USERS.find(existing => existing.email === u.email)) {
            DATA_USERS.push(u);
        }
    });
}

// Auto-load registered users saat script dimuat
if (typeof DATA_USERS !== 'undefined') {
    loadRegisteredUsers();
}
