/**
 * ============================================================
 * DATA.JS - Data Dummy Toko Perangkat Jaringan (NES)
 * ============================================================
 * File ini berisi seluruh data dummy yang digunakan oleh website.
 * Data diambil dari database ec.sql dan dikonversi ke format JavaScript.
 * Semua halaman menggunakan data dari file ini sebagai sumber data utama.
 * ============================================================
 */

/* =============================================
   KATEGORI PRODUK
   Daftar kategori perangkat jaringan
   ============================================= */
const DATA_KATEGORI = [
    { id_kategori: 3, nama_kategori: "Router" },
    { id_kategori: 4, nama_kategori: "Accesories" },
    { id_kategori: 5, nama_kategori: "Access Point" },
    { id_kategori: 6, nama_kategori: "Cable & Connector" },
    { id_kategori: 7, nama_kategori: "Modem" },
    { id_kategori: 8, nama_kategori: "Wireless Adapter" },
    { id_kategori: 9, nama_kategori: "Mikrotik" },
    { id_kategori: 10, nama_kategori: "TP-Link" }
];

/* =============================================
   MERK / BRAND PRODUK
   Daftar merk yang tersedia di toko
   ============================================= */
const DATA_MERK = [
    { id_merk: 2, nama_merk: "Kiyomitsu" },
    { id_merk: 4, nama_merk: "ASUS" },
    { id_merk: 5, nama_merk: "TP-Link" },
    { id_merk: 7, nama_merk: "Linksys" },
    { id_merk: 8, nama_merk: "Mikrotik" }
];

/* =============================================
   PRODUK - DAFTAR PERANGKAT JARINGAN
   Data lengkap 14 produk sesuai database
   ============================================= */
const DATA_PRODUK = [
    {
        id_produk: 2,
        id_kategori: 4,
        id_merk: 4,
        nama_produk: "Power Suply Central 24V 10AAA",
        harga: 195000,
        stok: 13,
        gambar: "1770123612_beaffeda1b30d5c9a044.jpg",
        deskripsi_singkat: "Power Suply Central dengan AC Input AC 110/220V,DC Output DC 24V, 10A. Alat ini bisa digunakan untuk Adaptor Sentral Access Point UBNT, Mikrotik.",
        spesifikasi_lengkap: "Specifications Power Suplay Central 24V 10A :\n\nProduct Name\t: Power Supply\nAC Input : AC 110/220V±20%\nDC Output : DC 24V, 10A\nMaterial : Metal, Electronic Parts\nSize : 19.5 x 10.9 x 5cm/ 7.7\" x 4.3\" x 2\"(L*W*T)\nColor : Silver Tone\nNet Weight : 678g\nPackage Content : 1 x Power Supply",
        tag: "",
        nama_kategori: "Accesories",
        nama_merk: "ASUS"
    },
    {
        id_produk: 6,
        id_kategori: 4,
        id_merk: 4,
        nama_produk: "Adaptor 24V 1A",
        harga: 55000,
        stok: 52,
        gambar: "1770123340_387af8075d2c0c93f482.jpg",
        deskripsi_singkat: "Power Adaptor DFE 24 Volt, Input 100-240V 1A, Output 24V1A. Adaptor ini digunakan untuk UBNT Bullet2, BulletM2HP, Bullet2HP, BulletM5HP, Mikrotik RB411.",
        spesifikasi_lengkap: "Spesifikasi Adaptor 24V 1A :\n• Input: 100V- 240V AC 50/60 HZ.\n• Output: DC 24V, 1A.\n• 2.1mm x 5.5mm Output Connector",
        tag: "Kamera eHD Outdoor",
        nama_kategori: "Accesories",
        nama_merk: "ASUS"
    },
    {
        id_produk: 7,
        id_kategori: 5,
        id_merk: 7,
        nama_produk: "Linksys WRT54GL",
        harga: 850000,
        stok: 10,
        gambar: "1770123166_66a62a5e1899898bc716.jpg",
        deskripsi_singkat: "Wireless-G Broadband Router Linksys WRT54GL juga built-in 4-port full-duplex 10/100 Switch untuk menghubungkan perangkat ke jaringan kabel.",
        spesifikasi_lengkap: "Features :\n• Data Transfer Rate : 54 Mbps\n• Wireless : Mode AP Router Mode, Bridge mode\n• Data Link Protocol : Ethernet, Fast Ethernet, IEEE 802.11b, IEEE 802.11g\n• Compliant Standards : IEEE 802.3, IEEE 802.3U, IEEE 802.11b, IEEE 802.11g\n• Features : Firewall protection, auto-sensing per device, DHCP support\n• Integrated Switch : 4-port switch\n• Status Indicators : Port status, link activity\n• Switching Protocol : Ethernet\n• Wireless Security : AES, TKIP, WPA, WPA2",
        tag: "limited",
        nama_kategori: "Access Point",
        nama_merk: "Linksys"
    },
    {
        id_produk: 8,
        id_kategori: 5,
        id_merk: 4,
        nama_produk: "Asus RT-N12HP 300Mbps",
        harga: 1200000,
        stok: 0,
        gambar: "1770122795_44311b866d5bb30ed042.jpg",
        deskripsi_singkat: "Wireless Router Asus RT-N12HP 300Mbps. Wireless Router High Power RT-N12HP mendukung kinerja wireless berkekuatan tinggi dengan 2 antenna Omni 9 dbi.",
        spesifikasi_lengkap: "Access Point Router Asus RT-N12HP 300Mbps :\n\n• 3-in-1 multi wireless mode : Router/Access Point/Range Extender\n• Sinyal wireless dan transmisi antena lebih kuat, jangkauan sinyal lebih luas hingga 300%\n• 2 eksternal antenna 9 dbi yang detachable\n• Multitasking online yang lebih baik hingga 30,000 sesi data",
        tag: "limited",
        nama_kategori: "Access Point",
        nama_merk: "ASUS"
    },
    {
        id_produk: 9,
        id_kategori: 5,
        id_merk: 5,
        nama_produk: "Acces Point TP-link CPE-605",
        harga: 570000,
        stok: 22,
        gambar: "1770122576_b976a79368807f493913.jpg",
        deskripsi_singkat: "Perangkat wireless outdoor 5 GHz dengan kecepatan hingga 150 Mbps, antena 23 dBi untuk jarak jauh, desain kokoh tahan cuaca IP56.",
        spesifikasi_lengkap: "• Kecepatan data 150Mbps pada wireless frekuensi 5GHz\n• Antena reflektor 23dbi terbuat dari logam khusus\n• Radio cocok untuk pemasangan jarak jauh\n• Struktur bahan IP56 sehingga tahan cuaca\n• TP-Link Pharos MAXtream Teknologi TDMA\n• Pharos Control memberi administrator sistem manajemen terpusat yang gratis\n• Dukungan PoE pasif",
        tag: "kualitas bagus, harga terjangkau",
        nama_kategori: "Access Point",
        nama_merk: "TP-Link"
    },
    {
        id_produk: 10,
        id_kategori: 4,
        id_merk: 2,
        nama_produk: "Ruber Tape 3M",
        harga: 75000,
        stok: 5,
        gambar: "1770123689_b8412fdc7e2ae7e6ecc8.jpg",
        deskripsi_singkat: "Ruber Tape 3M / Isolasi Outdoor. Isolasi outdoor yang tahan panas dan cuaca sangat cocok digunakan untuk menutup sambungan kabel.",
        spesifikasi_lengkap: "Ruber Tape 3M / Isolasi Outdoor\nRuber Tape 3M merupakan Isolasi outdoor yang tahan panas dan cuaca sangat cocok digunakan untuk menutup sambungan dari kabel pigtail ke Accesspoint, atau dari antenna ke pigtail guna melindungi perangkat dari cuaca.",
        tag: "kualitas bagus, harga terjangkau",
        nama_kategori: "Accesories",
        nama_merk: "Kiyomitsu"
    },
    {
        id_produk: 11,
        id_kategori: 6,
        id_merk: 2,
        nama_produk: "Kabel FTP izinet cat 5e free konektor",
        harga: 550000,
        stok: 3,
        gambar: "1770124104_769ea68f765c05f05176.jpg",
        deskripsi_singkat: "Kabel Izinet FTP/Outdoor Cat5e CCA. Kabel kualitas Middle Class sangat bagus dan cocok digunakan oleh para installer jaringan RT/RW Net.",
        spesifikasi_lengkap: "",
        tag: "kualitas bagus",
        nama_kategori: "Cable & Connector",
        nama_merk: "Kiyomitsu"
    },
    {
        id_produk: 12,
        id_kategori: 6,
        id_merk: 2,
        nama_produk: "Kabel UTP Spectra Cat5e Indoor",
        harga: 387000,
        stok: 10,
        gambar: "1770124207_e6f1384ba9ebb0f3ce67.jpg",
        deskripsi_singkat: "Kabel UTP AMP Spectra Cat5E – Kabel Jaringan Spectra – Cable LAN Cat5 305 Meter – Support PoE",
        spesifikasi_lengkap: "Product Description\nKabel UTP AMP Spectra Cat5E\nMerk: Spectra\nWarna Kabel: Abu-Abu\nJenis Kabel : UTP Cat5e (Indoor)\nPanjang kabel: 305 Meter",
        tag: "",
        nama_kategori: "Cable & Connector",
        nama_merk: "Kiyomitsu"
    },
    {
        id_produk: 13,
        id_kategori: 6,
        id_merk: 4,
        nama_produk: "Senter Laser Kabel Fiber Optic VFL 10mw",
        harga: 150000,
        stok: 0,
        gambar: "1770124332_2c727b6f31bc99a46cdb.jpg",
        deskripsi_singkat: "Senter Laser untuk cek kabel fiber optic yang putus, mempermudah pemasangan connector.",
        spesifikasi_lengkap: "Product Description\nUntuk cek kabel yang putus kena tikus atau kena benang layangan\nbisa menggunakan senter ini, dan mempermudah pemasangan conector\n\nsinyal dengan 10MW lebih kuat lasernya dari 1 atau 10MW",
        tag: "Murah, Kualitas Bagus",
        nama_kategori: "Cable & Connector",
        nama_merk: "ASUS"
    },
    {
        id_produk: 15,
        id_kategori: 7,
        id_merk: 5,
        nama_produk: "Wireless PCI Express Adapter TP-LINK TL-WN781ND 150Mbps",
        harga: 150000,
        stok: 13,
        gambar: "1770125079_af6bd0db83656d527606.png",
        deskripsi_singkat: "TP-LINK TL-WN781ND dirancang untuk memberikan pengguna akhir kinerja nirkabel lengkap dari server atau backbone infrastruktur.",
        spesifikasi_lengkap: "FITUR HARDWARE\nInterface: PCI Express\nDimensions: 120.8 x 78.5 x 21.5mm\nAntenna Type: Detachable Omni Directional (RP-SMA)\nAntenna Gain: 2dBi\n\nFITUR WIRELESS\nWireless Standards: IEEE 802.11n, IEEE 802.11g, IEEE 802.11b\nFrequency: 2.400-2.4835GHz\nTransmit Power: 20dBm (EIRP)\nWireless Security: Support 64/128 bit WEP, WPA-PSK/WPA2-PSK",
        tag: "",
        nama_kategori: "Modem",
        nama_merk: "TP-Link"
    },
    {
        id_produk: 16,
        id_kategori: 7,
        id_merk: 5,
        nama_produk: "Modem Router TP-LINK TL-MR3020",
        harga: 265000,
        stok: 17,
        gambar: "1770125259_e040ef3ab6719ffb5203.png",
        deskripsi_singkat: "Portable 3G/3.75G Wireless N Router. TP-Link TL-MR3020 memiliki 3 mode yaitu 3G Router, WISP Client Router dan Travel Router Mode.",
        spesifikasi_lengkap: "Berbagi koneksi mobile 3G, kompatibel dengan 120+ UMTS/HSPA/EVDO USB modem 3G\nDesain ukuran travel, kecil dan cukup ringan untuk dibawa\nKecepatan wireless hingga 150Mbps\nTersedia tiga model: Router 3G, WISP Client Router dan AP\nDengan fitur failover 3G/WAN",
        tag: "",
        nama_kategori: "Modem",
        nama_merk: "TP-Link"
    },
    {
        id_produk: 17,
        id_kategori: 8,
        id_merk: 8,
        nama_produk: "Mini PCI R52H MIMO",
        harga: 750000,
        stok: 12,
        gambar: "1770125517_0d51860cda37ae23f651.jpg",
        deskripsi_singkat: "Wireless MiniPCI produksi Mikrotik standar 802.11a+b+g+n, untuk aplikasi wireless broadband. Bekerja pada frekuensi dual band.",
        spesifikasi_lengkap: "Spesification R52HN (MIMO) :\n\n• Dual Band IEEE 802.11 a/b/g/n standard.\n• Output power of up to 25 dBm @ b/g/n Band.\n• Support for up to 2X2 MIMO with spatial multiplexing.\n• Atheros AR9220, chipset.\n• High performance (up to 300 Mbps)\n• 2X U.Fl Antenna Connector",
        tag: "limited",
        nama_kategori: "Wireless Adapter",
        nama_merk: "Mikrotik"
    },
    {
        id_produk: 18,
        id_kategori: 8,
        id_merk: 2,
        nama_produk: "Mini PCI Ubiquiti XR5 5GHz",
        harga: 1435000,
        stok: 12,
        gambar: "1770125851_08b85952263af26c62f3.png",
        deskripsi_singkat: "Wireless Mini PCI Ubiquiti XR5 5GHz 600mW. High Power 600mW 802.11a 5GHz mini-PCI Module (Atheros AR5414 Chip).",
        spesifikasi_lengkap: "Spesification Ubnt XR 5 (5 Ghz, 600mW) :\n\n• Radio Operation IEEE 802.11a, 5GHz\n• Interface 32-bit mini-PCI Type IIIA\n• Operation Voltage 3.3VDC\n• Antenna Ports Single MMCX\n• Temperature Range -45C to +85C\n• Security WPA, WPA2, AES-CCM & TKIP\n• Data Rates 6-54Mbps\n• Max Power Output: 600 mWatt",
        tag: "",
        nama_kategori: "Wireless Adapter",
        nama_merk: "Kiyomitsu"
    },
    {
        id_produk: 19,
        id_kategori: 8,
        id_merk: 5,
        nama_produk: "TP-Link TL-WN722N",
        harga: 110000,
        stok: 5,
        gambar: "1770126229_2c73a2676465d2b1f9ca.png",
        deskripsi_singkat: "USB Wireless TP-Link TL-WN722N (150Mbps). Wireless N USB Adapter memungkinkan koneksi nirkabel dan akses kecepatan tinggi 150Mbps.",
        spesifikasi_lengkap: "TL-WN722N menawarkan 4dBi antena eksternal gain tinggi yang dapat diputar dan disesuaikan dalam arah yang berbeda.\n\n150Mbps Wireless N Speed\nBerdasarkan teknologi IEEE 802.11n, TL-WN722N menunjukkan kemampuan lebih baik mengurangi kehilangan data jarak jauh.",
        tag: "kualitas bagus, harga terjangkau",
        nama_kategori: "Wireless Adapter",
        nama_merk: "TP-Link"
    },
    {
        id_produk: 20,
        id_kategori: 9,
        id_merk: 8,
        nama_produk: "Board Mikrotik RB 411L",
        harga: 513000,
        stok: 5,
        gambar: "1770126757_ec2b6c30c3875c816794.png",
        deskripsi_singkat: "Board Only RB411 routerboard dikhususkan sebagai CPE/wireless client, atau point to point. Memiliki 1 port ethernet dan 1 slot minipci.",
        spesifikasi_lengkap: "Spesifikasi RB411L\n\nArchitecture\tMIPS-BE\nCPU\tAR7130 300MHz\nMain Storage/NAND\t64MB\nRAM\t32MB\nLAN Ports\t1\nMiniPCI\t1\nPOE Input\t10-28V\nDimentions\t105mm x 105mm\nOperating System\tRouterOS\nTemperature Range\t-30C .. +60C\nRouterOS License\tLevel3",
        tag: "kualitas bagus, harga terjangkau",
        nama_kategori: "Mikrotik",
        nama_merk: "Mikrotik"
    },
    {
        id_produk: 21,
        id_kategori: 9,
        id_merk: 8,
        nama_produk: "Mikrotik RB2011iL-IN",
        harga: 1661000,
        stok: 5,
        gambar: "1770127404_96dfe5cb86738964858d.png",
        deskripsi_singkat: "Mikrotik RB2011iL-IN dengan Atheros 600MHz CPU. 5xLAN 100Mbps, 5xGigabit LAN 1000Mbps, RouterOS L4, indoor metal case.",
        spesifikasi_lengkap: "Spesifikasi RB2011iL-IN\n\nArchitecture\tMIPS-BE\nCPU\tAR9344 600MHz\nMain Storage/NAND\t64MB\nRAM\t64MB\nLAN Ports\t5\nGigabit\t5\nSwitch Chip\t2\nPOE Input\t8-30V\nPOE Output\tYes, port 10\nDimentions\t250x250x90mm\nOperating System\tRouterOS\nRouterOS License\tLevel4",
        tag: "kualitas bagus",
        nama_kategori: "Mikrotik",
        nama_merk: "Mikrotik"
    },
    {
        id_produk: 22,
        id_kategori: 10,
        id_merk: 5,
        nama_produk: "16 Port Gigabit TP-Link TL-SG1016D",
        harga: 995000,
        stok: 4,
        gambar: "1770127766_c514b666746aa541a374.png",
        deskripsi_singkat: "Switch Gigabit TP-Link 16 Port TL-SG1016D Metal Case. Switch Gigabit LAN 16 port RJ45 10/100/1000M.",
        spesifikasi_lengkap: "HARDWARE FEATURES\nStandards: IEEE 802.3i, IEEE 802.3u, IEEE 802.3ab, IEEE 802.3x\nInterface: 16 10/100/1000Mbps RJ45 Ports\nFan Quantity: Fanless\nPower Supply: 100-240VAC, 50/60Hz\nPower Consumption: Max 13.3W\nDimensions: 294*180*44 mm\n\nPERFORMANCE\nSwitching Capacity: 32Gbps\nPacket Forwarding Rate: 23.8Mpps\nMAC Address Table: 8K\nJumbo Frame: 10KB\nGreen Technology: energy-efficient, saves power up to 15%",
        tag: "kualitas bagus",
        nama_kategori: "TP-Link",
        nama_merk: "TP-Link"
    }
];

/* =============================================
   USER / AKUN PENGGUNA
   Daftar akun untuk login (admin, owner, customer)
   Password disimpan plain text karena ini frontend-only demo
   ============================================= */
const DATA_USERS = [
    {
        id_user: 1,
        nama: "Admin Store",
        email: "admin@gmail.com",
        password: "admin123",
        alamat: null,
        no_hp: null,
        kota: null,
        foto: null,
        pin_pembayaran: "123456",
        role: "Admin"
    },
    {
        id_user: 2,
        nama: "Laura",
        email: "laura@gmail.com",
        password: "owner123",
        alamat: null,
        no_hp: null,
        kota: null,
        foto: null,
        pin_pembayaran: "123456",
        role: "Owner"
    },
    {
        id_user: 3,
        nama: "Syaffa",
        email: "syaffa@gmail.com",
        password: "123",
        alamat: "Jl. Masjid, Tangerang Selatan",
        no_hp: "085806132246",
        kota: "Luar Jakarta (Ongkir Rp 10.000)",
        foto: null,
        pin_pembayaran: "123456",
        role: "Customer"
    },
    {
        id_user: 4,
        nama: "Customer",
        email: "customer@gmail.com",
        password: "123",
        alamat: "Jl. Sudirman No. 45, Jakarta Pusat",
        no_hp: "081234567890",
        kota: "Jakarta",
        foto: null,
        pin_pembayaran: "123456",
        role: "Customer"
    }
];

/* =============================================
   TRANSAKSI - DATA PESANAN
   Data dummy transaksi dari database
   ============================================= */
const DATA_TRANSAKSI = [
    {
        id_transaksi: 28,
        id_user: 3,
        total_harga: 245000,
        total_akhir: 245000,
        status: "proses",
        metode_pembayaran: "Transfer BCA",
        jasa_kirim: "J&T",
        tanggal_transaksi: "2026-01-30 15:03:58",
        nama_pelanggan: "Syaffa"
    },
    {
        id_transaksi: 29,
        id_user: 3,
        total_harga: 1005000,
        total_akhir: 1005000,
        status: "proses",
        metode_pembayaran: "Transfer BCA",
        jasa_kirim: "J&T",
        tanggal_transaksi: "2026-01-30 15:21:43",
        nama_pelanggan: "Syaffa"
    },
    {
        id_transaksi: 30,
        id_user: 4,
        total_harga: 510000,
        total_akhir: 510000,
        status: "proses",
        metode_pembayaran: "Transfer BCA",
        jasa_kirim: "J&T",
        tanggal_transaksi: "2026-01-30 16:31:22",
        nama_pelanggan: "Customer"
    },
    {
        id_transaksi: 31,
        id_user: 3,
        total_harga: 1005000,
        total_akhir: 1005000,
        status: "dikirim",
        metode_pembayaran: "Transfer BCA",
        jasa_kirim: "J&T",
        tanggal_transaksi: "2026-01-30 16:55:11",
        nama_pelanggan: "Syaffa"
    },
    {
        id_transaksi: 33,
        id_user: 3,
        total_harga: 1005000,
        total_akhir: 1005000,
        status: "selesai",
        metode_pembayaran: "Transfer BNI",
        jasa_kirim: "J&T",
        tanggal_transaksi: "2026-01-31 06:08:30",
        nama_pelanggan: "Syaffa"
    },
    {
        id_transaksi: 34,
        id_user: 4,
        total_harga: 20000,
        total_akhir: 20000,
        status: "selesai",
        metode_pembayaran: "Transfer BCA",
        jasa_kirim: "J&T",
        tanggal_transaksi: "2026-01-31 06:08:49",
        nama_pelanggan: "Customer"
    },
    {
        id_transaksi: 35,
        id_user: 3,
        total_harga: 10000,
        total_akhir: 10000,
        status: "dikemas",
        metode_pembayaran: "Transfer BNI",
        jasa_kirim: "J&T",
        tanggal_transaksi: "2026-01-31 06:13:18",
        nama_pelanggan: "Syaffa"
    },
    {
        id_transaksi: 36,
        id_user: 3,
        total_harga: 260000,
        total_akhir: 260000,
        status: "dikemas",
        metode_pembayaran: "Transfer BNI",
        jasa_kirim: "JNE",
        tanggal_transaksi: "2026-01-31 06:26:09",
        nama_pelanggan: "Syaffa"
    },
    {
        id_transaksi: 37,
        id_user: 3,
        total_harga: 205000,
        total_akhir: 205000,
        status: "dikemas",
        metode_pembayaran: "Transfer Mandiri",
        jasa_kirim: "JNE",
        tanggal_transaksi: "2026-02-06 13:52:31",
        nama_pelanggan: "Syaffa"
    },
    {
        id_transaksi: 38,
        id_user: 4,
        total_harga: 65000,
        total_akhir: 65000,
        status: "dikemas",
        metode_pembayaran: "Transfer BCA",
        jasa_kirim: "JNE",
        tanggal_transaksi: "2026-02-07 03:53:32",
        nama_pelanggan: "Customer"
    }
];

/* =============================================
   TRANSAKSI DETAIL - ITEM DALAM PESANAN
   Detail produk per transaksi
   ============================================= */
const DATA_TRANSAKSI_DETAIL = [
    { id_detail: 42, id_transaksi: 28, id_produk: 6, jumlah: 1, harga_satuan: 235000 },
    { id_detail: 43, id_transaksi: 29, id_produk: 2, jumlah: 1, harga_satuan: 995000 },
    { id_detail: 44, id_transaksi: 30, id_produk: 8, jumlah: 2, harga_satuan: 250000 },
    { id_detail: 45, id_transaksi: 31, id_produk: 2, jumlah: 1, harga_satuan: 995000 },
    { id_detail: 47, id_transaksi: 33, id_produk: 2, jumlah: 1, harga_satuan: 995000 },
    { id_detail: 48, id_transaksi: 34, id_produk: 7, jumlah: 1, harga_satuan: 10000 },
    { id_detail: 49, id_transaksi: 35, id_produk: 7, jumlah: 1, harga_satuan: 10000 },
    { id_detail: 50, id_transaksi: 36, id_produk: 8, jumlah: 1, harga_satuan: 250000 },
    { id_detail: 51, id_transaksi: 37, id_produk: 2, jumlah: 1, harga_satuan: 195000 },
    { id_detail: 52, id_transaksi: 38, id_produk: 6, jumlah: 1, harga_satuan: 55000 }
];

/* =============================================
   HELPER FUNCTIONS - FUNGSI UTILITAS
   Fungsi-fungsi untuk memformat dan mencari data
   ============================================= */

/**
 * Format angka menjadi format Rupiah (Indonesia)
 * @param {number} angka - Angka yang akan diformat
 * @returns {string} String format Rupiah, contoh: "Rp 1.500.000"
 */
function formatRupiah(angka) {
    return "Rp " + Number(angka).toLocaleString("id-ID");
}

/**
 * Format tanggal ke format Indonesia
 * @param {string} dateStr - String tanggal
 * @returns {string} Format tanggal: "30 Jan 2026"
 */
function formatTanggal(dateStr) {
    const bulan = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const d = new Date(dateStr);
    return d.getDate() + " " + bulan[d.getMonth()] + " " + d.getFullYear();
}

/**
 * Format tanggal lengkap dengan waktu
 * @param {string} dateStr - String tanggal
 * @returns {string} Format: "30 Januari 2026, 15:03 WIB"
 */
function formatTanggalLengkap(dateStr) {
    const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
    const d = new Date(dateStr);
    const jam = String(d.getHours()).padStart(2, "0");
    const menit = String(d.getMinutes()).padStart(2, "0");
    return d.getDate() + " " + bulan[d.getMonth()] + " " + d.getFullYear() + ", " + jam + ":" + menit + " WIB";
}

/**
 * Cari produk berdasarkan ID
 * @param {number} id - ID produk
 * @returns {object|undefined} Object produk atau undefined
 */
function getProdukById(id) {
    return DATA_PRODUK.find(p => p.id_produk === parseInt(id));
}

/**
 * Cari produk berdasarkan kategori
 * @param {number} idKategori - ID kategori
 * @returns {array} Array produk dalam kategori tersebut
 */
function getProdukByKategori(idKategori) {
    return DATA_PRODUK.filter(p => p.id_kategori === parseInt(idKategori));
}

/**
 * Cari nama kategori berdasarkan ID
 * @param {number} id - ID kategori
 * @returns {string} Nama kategori atau "-"
 */
function getKategoriName(id) {
    const k = DATA_KATEGORI.find(k => k.id_kategori === parseInt(id));
    return k ? k.nama_kategori : "-";
}

/**
 * Cari nama merk berdasarkan ID
 * @param {number} id - ID merk
 * @returns {string} Nama merk atau "-"
 */
function getMerkName(id) {
    const m = DATA_MERK.find(m => m.id_merk === parseInt(id));
    return m ? m.nama_merk : "-";
}

/**
 * Dapatkan path gambar produk
 * @param {string} gambar - Nama file gambar
 * @returns {string} Path lengkap ke gambar
 */
function getImagePath(gambar) {
    return "public/uploads/" + gambar;
}

/**
 * Hitung total revenue dari semua transaksi selesai
 * @returns {number} Total revenue
 */
function getTotalRevenue() {
    return DATA_TRANSAKSI
        .filter(t => t.status === "selesai")
        .reduce((sum, t) => sum + t.total_akhir, 0);
}

/**
 * Hitung jumlah customer unik
 * @returns {number} Jumlah customer
 */
function getTotalCustomer() {
    return DATA_USERS.filter(u => u.role === "Customer").length;
}

/**
 * Hitung total transaksi
 * @returns {number} Jumlah transaksi
 */
function getTotalTransaksi() {
    return DATA_TRANSAKSI.length;
}
