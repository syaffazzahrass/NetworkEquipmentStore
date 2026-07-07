-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Feb 2026 pada 15.20
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ec`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`) VALUES
(3, 'Router'),
(4, 'Accesories'),
(5, 'Access Point'),
(6, 'Cable & Connector'),
(7, 'Modem'),
(8, 'Wireless Adapter'),
(9, 'Mikrotik'),
(10, 'TP-Link');

-- --------------------------------------------------------

--
-- Struktur dari tabel `keranjang`
--

CREATE TABLE `keranjang` (
  `id_keranjang` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_produk` int(11) NOT NULL,
  `qty` int(11) NOT NULL DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `keranjang`
--

INSERT INTO `keranjang` (`id_keranjang`, `id_user`, `id_produk`, `qty`, `created_at`, `updated_at`) VALUES
(17, 5, 2, 1, '2026-01-26 05:07:36', '2026-01-26 05:07:36'),
(38, 4, 2, 2, '2026-02-03 21:10:43', '2026-02-07 10:51:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `merk`
--

CREATE TABLE `merk` (
  `id_merk` int(11) NOT NULL,
  `nama_merk` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `merk`
--

INSERT INTO `merk` (`id_merk`, `nama_merk`) VALUES
(2, 'Kiyomitsu'),
(4, 'ASUS'),
(5, 'TP-Link'),
(7, 'Linksys'),
(8, 'Mikrotik');

-- --------------------------------------------------------

--
-- Struktur dari tabel `produk`
--

CREATE TABLE `produk` (
  `id_produk` int(11) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `id_merk` int(11) NOT NULL,
  `nama_produk` varchar(255) NOT NULL,
  `harga` decimal(12,2) NOT NULL DEFAULT 0.00,
  `stok` int(11) NOT NULL DEFAULT 0,
  `gambar` varchar(255) DEFAULT 'default.png',
  `deskripsi_singkat` text DEFAULT NULL,
  `spesifikasi_lengkap` text DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `produk`
--

INSERT INTO `produk` (`id_produk`, `id_kategori`, `id_merk`, `nama_produk`, `harga`, `stok`, `gambar`, `deskripsi_singkat`, `spesifikasi_lengkap`, `tag`) VALUES
(2, 4, 4, 'Power Suply Central 24V 10AAA', 195000.00, 13, '1770123612_beaffeda1b30d5c9a044.jpg', 'Power Suply Central dengan AC Input AC 110/220V,DC Output DC 24V, 10A. Alat ini bisa digunakan untuk Adaptor Sentral Access Point UBNT, Mikrotik. Dengan menggunakan 1 (satu) Adaptor / Power Suplay Central 24V 10A bisa digunakan untuk beberapa Radio dalam 1 Tower.', 'Specifications Power Suplay Central 24V 10A :\r\n\r\nProduct Name	: Power Supply\r\nAC Input : AC 110/220V±20%\r\nDC Output : DC 24V, 10A\r\nMaterial : Metal, Electronic Parts\r\nSize : 19.5 x 10.9 x 5cm/ 7.7″ x 4.3″ x 2″(L*W*T)\r\nColor : Silver Tone\r\nNet Weight : 678g\r\nPackage Content : 1 x  Power Supply', ''),
(6, 4, 4, 'Adaptor 24V 1A', 55000.00, 52, '1770123340_387af8075d2c0c93f482.jpg', 'Power Adaptor DFE 24 Volt, Input 100-240V 1A, Output 24V1A. Adaptor ini digunakan untuk UBNT Bullet2 , BulletM2HP, Bullet2HP, BulletM5HP, Mikrotik RB411 dan perangkat lainnya.', 'Spesifikasi Adaptor 24V 1A :\r\n• Input: 100V- 240V AC 50/60 HZ.\r\n• Output: DC 24V, 1A.\r\n• 2.1mm x 5.5mm Output Connector', ' Kamera eHD Outdoor'),
(7, 5, 7, 'Linksys WRT54GL', 850000.00, 10, '1770123166_66a62a5e1899898bc716.jpg', 'Wireless-G Broadband Router Linksys WRT54GL juga built-in 4-port full-duplex 10/100 Switch untuk menghubungkan perangkat ke jaringan kabel, atau 4 komputer secara bersamaan. Wireless-G Broadband Router Linksys WRT54GL biasanya di gunakan para pengelola RT/RW NET di jadikan sebagai AP sekaligus router, meraka biasanya sudah upgrade WRT54GL ke DDWRT. Fitur bertambah banyak, menjadi AP, Client, Bridge, Repeater, WDS, Router. Power hingga 250mW.', 'Features :\r\n• Data Transfer Rate : 54 Mbps\r\n• Wireless : Mode AP Router Mode, Bridge mode (point-to-point / point to Multi-point)\r\n• Data Link Protocol : Ethernet, Fast Ethernet, IEEE 802.11b, IEEE 802.11g\r\n• Compliant Standards : IEEE 802.3, IEEE 802.3U, IEEE 802.11b, IEEE 802.11g\r\n• Features : Firewall protection, auto-sensing per device, dynamic IP address assignment , DHCP support, auto-negotiation, Stateful Packet Inspection (SPI), MAC address filtering, firmware upgradable\r\n• Integrated Switch : 4-port switch\r\n• Status Indicators : Port status, link activity\r\n• Remote Management : Protocol HTTP\r\n• Switching Protocol : Ethernet\r\n• Wireless Security : AES, TKIP, WPA, WPA2', 'limited'),
(8, 5, 4, 'Asus RT-N12HP 300Mbps', 1200000.00, 0, '1770122795_44311b866d5bb30ed042.jpg', 'Wireless Router Asus RT-N12HP 300Mbps\r\nWireless Router High Power RT-N12HP mendukung kinerja wireless berkekuatan tinggi. Dilengkapi dengan 2 antenna Omni 9 dbi sehingga meningkatkan jangkauan dan sinyal wireless dengan meggunakan penguat sinyal yang terintegrasi.', 'Access Point Router Asus RT-N12HP 300Mbps : \r\n\r\n• 3-in-1 multi wireless mode : Router/Access Point /Range Extender\r\n• Sinyal wireless dan transmisi antena lebih kuat, jangkauan sinyal lebih luas hingga 300%\r\n• 2 eksternal antenna 9 dbi yang detachable, dan dapat diatur kekuatan outputnya\r\n• Multitasking online yang lebih baik hingga 30,000 sesi data', 'limited'),
(9, 5, 5, 'Acces Point TP-link CPE-605', 570000.00, 22, '1770122576_b976a79368807f493913.jpg', 'Perangkat wireless outdoor 5 GHz dengan kecepatan hingga 150 Mbps, antena 23 dBi untuk jarak jauh, desain kokoh tahan cuaca IP56, mendukung TDMA Pharos MAXtream, manajemen terpusat gratis, dan instalasi mudah dengan PoE pasif.', '• Kecepatan data 150Mbps pada wireless frekuensi 5GHz\r\n• Antena reflektor 23dbi terbuat dari logam khusus\r\n• Radio cocok untuk pemasangan jarak jauh\r\n• Komponen yang inovatif sehingga perakitan cepat dan desain struktur yang kokoh menjaga CPE605 stabil bahkan dalam angin kencang\r\n• Struktur bahan IP56 sehingga tahan cuaca\r\n• TP-Link Pharos MAXtream Teknologi TDMA meningkatkan kinerja, kapasitas, dan latensi\r\n• Pharos Control memberi administrator sistem manajemen terpusat yang gratis.\r\n• Dukungan PoE pasif untuk memungkinkan penerapan yang fleksibel dan pemasangan yang nyaman', 'kualitas bagus, harga terjangkau'),
(10, 4, 2, 'Ruber Tape 3M', 75000.00, 5, '1770123689_b8412fdc7e2ae7e6ecc8.jpg', 'Ruber Tape 3M / Isolasi Outdoor\r\nRuber Tape 3M merupakan Isolasi outdoor yang tahan panas dan cuaca sangat cocok digunakan untuk menutup sambungan dari kabel pigtail ke Accesspoint, atau dari antenna ke pigtail guna melindung pengangkat dari cuaca', 'Ruber Tape 3M / Isolasi Outdoor\r\nRuber Tape 3M merupakan Isolasi outdoor yang tahan panas dan cuaca sangat cocok digunakan untuk menutup sambungan dari kabel pigtail ke Accesspoint, atau dari antenna ke pigtail guna melindung pengangkat dari cuaca', 'kualitas bagus, harga terjangkau'),
(11, 6, 2, 'Kabel FTP izinet cat 5e free konektor', 550000.00, 3, '1770124104_769ea68f765c05f05176.jpg', 'Kabel Izinet FTP/Outdoor Cat5e CCA Kabel Kualitas Middle Class Sangat Bagus dan Cocok digunakan oleh para installer Jaringan Rt/Rw Net di Indonesia yg membutuhkan kabel murah dengan kualitas bagus dan mumpuni dan kabel ini pun support PoE.', '', 'kualitas bagus'),
(12, 6, 2, 'Kabel UTP Spectra Cat5e Indoor', 387000.00, 10, '1770124207_e6f1384ba9ebb0f3ce67.jpg', '', 'Product Description\r\nKabel UTP AMP Spectra Cat5E – Kabel Jaringan Spectra – Cable LAN Cat5 305 Meter – Support PoE\r\nMerk: Spectra\r\nWarna Kabel: Abu-Abu\r\nJenis Kabel : UTP Cat5e ( Indoor )\r\nPanjang kabel: 305 Meter', ''),
(13, 6, 4, 'Senter Laser Kabel Fiber Optic VFL 10mw Fiber Flashlight', 150000.00, 0, '1770124332_2c727b6f31bc99a46cdb.jpg', '', 'Product Description\r\nUntuk cek kabel yang putus kena tikus atau kena benang layangan atau\r\nkena apapun yg menjadi kabel terluka atau putus core nya\r\nbisa menggunakan senter ini , dan mempermudah pemasangan conector\r\nsambil senter di nyalain langsung di ketahui hasilnya\r\n\r\nshare pengalaman untuk cek kabel yg putus enak di malam hari\r\nbisa di ketahui , sinyal laser terlihat pada kabel yang terluka atau putus core nya\r\n\r\nsinyal dengan 10MW lebih kuat lasernya dari 1 atau 10MW', 'Murah, Kualitas Bagus'),
(15, 7, 5, 'Wireless PCI Express Adapter TP-LINK TL-WN781ND 150Mbps', 150000.00, 13, '1770125079_af6bd0db83656d527606.png', 'TP-LINK TL-WN781ND dirancang untuk memberikan pengguna akhir yang lengkap untuk mengakhiri kinerja nirkabel dari server atau backbone infrastruktur server untuk switch dan turun melalui ke desktop dengan konektor PCI Express. TL-WN781ND Wireless N PCI Express (x1) Adapter menyediakan kompatibilitas yang lebih luas, pas dengan standar slot PCI Express, x1, x2,, x8 atau x16. Dibandingkan dengan network card PCI standar, ia menawarkan peningkatan bandwidth, kehandalan dan fungsionalitas yang lebih, yang memungkinkan Anda untuk menikmati koneksi yang cepat dan canggih, seperti men-download, membuat panggilan internet dan video streaming.', 'Product Description\r\nFITUR HARDWARE\r\nInterface: PCI Express\r\nDimensions ( W x D x H ): 4.8 x 3.1 x 0.8in. (120.8 x 78.5 x 21.5mm)\r\nAntenna Type: Detachable Omni Directional (RP-SMA)\r\nAntenna Gain: 2dBi\r\n\r\nFITUR WIRELESS\r\nWireless Standards: IEEE 802.11n, IEEE 802.11g, IEEE 802.11b\r\nFrequency: 2.400-2.4835GHz\r\nTransmit Power: 20dBm (EIRP)\r\nWireless Modes: Ad-Hoc / Infrastructure mode\r\nWireless Security: Support 64/128 bit WEP, WPA-PSK/WPA2-PSK\r\nModulation Technology: DBPSK, DQPSK, CCK, OFDM, 16-QAM, 64-QAM\r\n\r\nISI KEMASAN / PAKET\r\n• Wireless Adapter\r\n• Detachable Omni directional antenna\r\n• Resource CD\r\n• Quick Installation Guide', ''),
(16, 7, 5, 'Modem Router TP-LINK TL-MR3020', 265000.00, 17, '1770125259_e040ef3ab6719ffb5203.png', 'Portable 3G/3.75G Wireless N Router\r\n\r\nTP-Link TL-MR3020 Merupakan 3G Router Portable keluaran dari TP-LINK  TL-MR3020. Memiliki 3 mode yaitu 3G Router, WISP Client Router dan Travel Router Mode (AP Mode).', 'Product Description\r\nBerbagi koneksi mobile 3G, kompatibel dengan 120+ UMTS/HSPA/EVDO USB modem 3G, teruji di lapangan\r\nDesain ukuran travel, kecil dan cukup ringan untuk dibawa dalam perjalanan, memungkinkan pengguna untuk berbagi koneksi mobile 3G dimanapun dimana tersedia cakupan 3G\r\nKecepatan wireless hingga 150Mbps\r\nTersedia tiga model untuk situasi yang berbeda: Router 3G, WISP Client Router dan AP\r\nDengan fitur failover 3G/WAN strategi back-up, TL-MR3020 dapat memberikan koneksi internet berkelanjutan', ''),
(17, 8, 8, 'Mini PCI R52H MIMO', 750000.00, 12, '1770125517_0d51860cda37ae23f651.jpg', 'Wireless MiniPCI produksi Mikrotik yang bekerja sesuai dengan standar 802.11a+b+g+n, untuk aplikasi wirelesss broadband. Bekerja pada frekuensi 2.192-2.539 dan 4.920-6.100GHz dengan power maksimal 350 mWatt. Karena termasuk minipci MIMO (Multiple Input Multiple Output), minipci ini mampu menghantarkan data rate 200Mbps – 300Mbps', 'Spesification R52HN (MIMO) :\r\n\r\n• Dual Band IEEE 802.11 a/b/g/n standard.\r\n• Output power of up to 25 dBm @ b/g/n Band.\r\n• Support for up to 2X2 MIMO with spatial multiplexing.\r\n• Four Times the througput if 802.11 a/g.\r\n• Atheros AR9220, chipset.\r\n• High performance (up to 300 Mbps physical data rates and 200 Mbps actual user throughput) with low power consumption.\r\n• 2X U.Fl Antenna Connector', 'limited'),
(18, 8, 2, 'Mini PCI Ubiquiti XR5 5GHz', 1435000.00, 12, '1770125851_08b85952263af26c62f3.png', 'Wireless Mini PCI Ubiquiti XR5 5GHz 600mW\r\nWireless Mini PCI produk Ubiquiti High Power 600mW 802.11a 5GHz mini-PCI Module (Atheros AR5414 Chip)Outdoor Range (Antenna Dependent)over 50km, cable pigtail MMCX.', 'Spesification Ubnt XR 5 (5 Ghz, 600mW ) :\r\n\r\n• Radio Operation IEEE 802.11a, 5GHz\r\n• Interface 32-bit mini-PCI Type IIIA\r\n• Operation Voltage 3.3VDC\r\n• Antenna Ports Single MMCX\r\n• Temperature Range -45C to +85C (extended temp version up to +95C)\r\n• Security WPA, WPA2, AES-CCM & TKIP Encryption, 802.1x, 64/128/152bit WEP\r\n• Data Rates 6Mbps, 9Mbps, 12Mbps, 24Mbps, 36Mbps, 48Mbps. 54Mbps\r\n• RoHS Compliance YES\r\n• Wireless Modular Approvals FCC Part 15.247 (32dBi Antenna), IC RS210, CE with Notified Body Number\r\n• Radio Operating Frequency: 5.20-5.825GHz\r\n• Max Power Output: 600 mWatt', ''),
(19, 8, 5, 'TP-Link TL-WN722N', 110000.00, 5, '1770126229_2c73a2676465d2b1f9ca.png', 'USB Wireless TP-Link TL-WN722N (150Mbps)\r\nWireless N USB Adapter TL-WN722N memungkinkan Anda untuk menghubungkan komputer desktop atau notebook ke jaringan nirkabel dan akses koneksi Internet kecepatan tinggi 150Mbps. Dengan antena tambahan 4dBi.', 'TL-WN722N menawarkan 4dBi antena eksternal gain tinggi yang dapat diputar dan disesuaikan dalam arah yang berbeda untuk menyesuaikan berbagai lingkungan operasi, dan dapat membawa kinerja yang lebih baik daripada antena internal. Untuk lebih tuntutan aplikasi tertentu, antena bisa diganti dengan antena yang beragam untuk menunjukkan fleksibilitas yang lebih besar dan jangkauan nirkabel yang lebih luas\r\n\r\n150Mbps Wireless N Speed – Kecepatan dan Jangkauan\r\n\r\nBerdasarkan teknologi IEEE 802.11n, TL-WN722N menunjukkan kemampuan lebih baik mengurangi kehilangan data jarak jauh dan melalui rintangan di kantor kecil atau apartemen besar, bahkan dalam bangunan baja dan beton. Di atas semua, Anda dapat dengan mudah mengambil jaringan nirkabel saat koneksi jarak jauh di mana warisan produk 11g mungkin tidak mampu!', 'kualitas bagus, harga terjangkau'),
(20, 9, 8, 'Board Mikrotik RB 411L', 513000.00, 5, '1770126757_ec2b6c30c3875c816794.png', 'Board Only RB411 adalah routerboard yang dikhususkan sebagai CPE/wireless client, atau point to point (tidak bisa difungsikan sebagai access point dengan multi client). Memiliki 1 buah port ethernet dan 1 buah slot minipci. Tidak memiliki port concole. Beserta lisensi RouterOS level 3.', 'Product Description\r\nProduk ini berupa board only, tanpa casing, adaptor, wireless card, antenna, dan perangkat tambahan apapun. Harus dirakit terlebih dahulu sebelum digunakan.\r\n\r\nSpesifikasi RB411L\r\n\r\nProduct Code	RB411L\r\nArchitecture	MIPS-BE\r\nCPU	AR7130 300MHz\r\nCurrent Monitor	No\r\nMain Storage/NAND	64MB\r\nRAM	32MB\r\nSFP Ports	0\r\nLAN Ports	1\r\nGigabit	No\r\nSwitch Chip	No\r\nMiniPCI	1\r\nIntegrated Wireless	No\r\nMiniPCIe	0\r\nSIM Card Slots	No\r\nUSB	No\r\nMemory Cards	No\r\nPower Jack	No\r\n802.3af Support	No\r\nPOE Input	10-28V\r\nPOE Output	No\r\nSerial Port	No\r\nVoltage Monitor	No\r\nTemperature Sensor	No\r\nDimentions	105mm x 105mm\r\nOperating System	RouterOS\r\nTemperature Range	-30C .. +60C\r\nRouterOS License	Level3', 'kualitas bagus, harga terjangkau'),
(21, 9, 8, 'Mikrotik RB2011iL-IN', 1661000.00, 5, '1770127404_96dfe5cb86738964858d.png', 'Mikrotik RB2011iL-IN dengan Atheros 600MHz CPU, Memiliki 5xLAN 100Mbps, 5XGigabit LAN 1000Mbps, RouterOS L4, indoor metal case. RB2011 dirancang dengan 10 Port Ethernet yang bisa digunakan untuk routing, VLAN, ataupun fungsi router lainnya yang memerlukan port lebih banyak dari router indoor yang ada.', 'Spesifikasi RB2011iL-IN\r\n\r\nProduct Code	RB2011iL-IN\r\nArchitecture	MIPS-BE\r\nCPU	AR9344 600MHz\r\nCurrent Monitor	No\r\nMain Storage/NAND	64MB\r\nRAM	64MB\r\nSFP Ports	0\r\nLAN Ports	5\r\nGigabit	5\r\nSwitch Chip	2\r\nMiniPCI	0\r\nIntegrated Wireless	No\r\nMiniPCIe	0\r\nSIM Card Slots	No\r\nUSB	No\r\nMemory Cards	No\r\nPower Jack	No\r\n802.3af Support	No\r\nPOE Input	8-30V\r\nPOE Output	Yes, port 10\r\nSerial Port	No\r\nVoltage Monitor	No\r\nTemperature Sensor	No\r\nDimentions	250x250x90mm\r\nOperating System	RouterOS\r\nTemperature Range	-30C .. +70C\r\nRouterOS License	Level4', 'kualitas bagus'),
(22, 10, 5, '16 Port Gigabit TP-Link TL-SG1016D', 995000.00, 4, '1770127766_c514b666746aa541a374.png', 'Switch Gigabit TP-Link 16 Port TL-SG1016D Metal Case\r\nSwitch Gigabit LAN TP-Link TL-SG1016D 24 port RJ45 10/100/1000M Metal case Rackmount RJ45 10/100Mbps Standar 13-inci rangka baja', 'Product Description\r\nHARDWARE FEATURES\r\nStandards and Protocols	IEEE 802.3i, IEEE 802.3u, IEEE 802.3ab , IEEE 802.3x\r\nInterface	16 10/100/1000Mbps RJ45 Ports (Auto Negotiation/Auto MDI/MDIX)\r\nNetwork Media	10BASE-T: UTP category 3, 4, 5 cable (maximum 100m)\r\n100BASE-TX/1000BASE-T: UTP category 5, 5e or above cable (maximum 100m)\r\nFan Quantity	Fanless\r\nPower Supply	100-240VAC, 50/60Hz\r\nPower Consumption	Maximum: 13.3W (220V/50Hz)\r\nDimensions ( W x D x H )	11.6*7.1*1.7 in. (294*180*44 mm)\r\nPERFORMANCE\r\nSwitching Capacity	32Gbps\r\nPacket Forwarding Rate	23.8Mpps\r\nMAC Address Table	8K\r\nJumbo Frame	10KB\r\nGreen Technology	Innovative energy-efficient technology saves power up to 15%\r\nTransfer Method	Store-and-Forward', 'kualitas bagus'),
(23, 3, 2, 'Router 111', 50000.00, 20, '1770729667_d72f0f9489a6b0725af4.jpg', '1', '1', 'router');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `total_harga` decimal(15,2) NOT NULL,
  `total_akhir` int(11) DEFAULT NULL,
  `status` enum('pending','proses','dikemas','dikirim','selesai','dibatalkan') NOT NULL DEFAULT 'proses',
  `metode_pembayaran` varchar(50) DEFAULT NULL,
  `jasa_kirim` enum('JNE','J&T','SiCepat','Ambil Sendiri') NOT NULL DEFAULT 'JNE',
  `tanggal_transaksi` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `id_user`, `total_harga`, `total_akhir`, `status`, `metode_pembayaran`, `jasa_kirim`, `tanggal_transaksi`, `updated_at`) VALUES
(28, 4, 245000.00, 245000, 'proses', 'Transfer BCA', 'J&T', '2026-01-30 08:03:58', NULL),
(29, 4, 1005000.00, 1005000, 'proses', 'Transfer BCA', 'J&T', '2026-01-30 08:21:43', NULL),
(30, 4, 510000.00, 510000, 'proses', 'Transfer BCA', 'J&T', '2026-01-30 09:31:22', NULL),
(31, 4, 1005000.00, 1005000, 'dikirim', 'Transfer BCA', 'J&T', '2026-01-30 09:55:11', '2026-01-30 17:11:14'),
(32, 4, 245000.00, 245000, 'proses', 'Transfer BCA', 'J&T', '2026-01-30 22:59:59', NULL),
(33, 4, 1005000.00, 1005000, 'selesai', 'Transfer BNI', 'J&T', '2026-01-30 23:08:30', '2026-01-31 06:32:07'),
(34, 4, 20000.00, 20000, 'selesai', 'Transfer BCA', 'J&T', '2026-01-30 23:08:49', '2026-01-31 06:14:45'),
(35, 4, 10000.00, 10000, 'dikemas', 'Transfer BNI', 'J&T', '2026-01-30 23:13:18', '2026-01-31 06:14:39'),
(36, 4, 260000.00, 260000, 'dikemas', 'Transfer BNI', 'JNE', '2026-01-30 23:26:09', '2026-01-31 06:31:58'),
(37, 4, 205000.00, 205000, 'dikemas', 'Transfer Mandiri', 'JNE', '2026-02-06 06:52:31', '2026-02-10 13:19:52'),
(38, 4, 65000.00, 65000, 'dikemas', 'Transfer BCA', 'JNE', '2026-02-06 20:53:32', '2026-02-07 03:56:24');

-- --------------------------------------------------------

--
-- Struktur dari tabel `transaksi_detail`
--

CREATE TABLE `transaksi_detail` (
  `id_detail` int(11) NOT NULL,
  `id_transaksi` int(11) DEFAULT NULL,
  `id_produk` int(11) DEFAULT NULL,
  `jumlah` int(11) NOT NULL,
  `harga_satuan` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `transaksi_detail`
--

INSERT INTO `transaksi_detail` (`id_detail`, `id_transaksi`, `id_produk`, `jumlah`, `harga_satuan`) VALUES
(42, 28, 6, 1, 235000.00),
(43, 29, 2, 1, 995000.00),
(44, 30, 8, 2, 250000.00),
(45, 31, 2, 1, 995000.00),
(46, 32, 6, 1, 235000.00),
(47, 33, 2, 1, 995000.00),
(48, 34, 7, 1, 10000.00),
(49, 35, 7, 1, 10000.00),
(50, 36, 8, 1, 250000.00),
(51, 37, 2, 1, 195000.00),
(52, 38, 6, 1, 55000.00);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `alamat` text DEFAULT NULL,
  `no_hp` varchar(15) DEFAULT NULL,
  `kota` varchar(100) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `pin_pembayaran` varchar(6) DEFAULT '123456',
  `role` enum('Admin','Customer','Owner') DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `nama`, `email`, `password`, `alamat`, `no_hp`, `kota`, `foto`, `pin_pembayaran`, `role`, `created_at`, `updated_at`) VALUES
(1, 'Admin Store', 'admin@gmail.com', '$2y$10$601.dIDp.ynjtFKsTlHXS.b.ln2K/dHvz4lJ50IHyz7HOPMrSzjgm', NULL, NULL, NULL, NULL, '123456', 'Admin', '2026-01-19 14:00:40', NULL),
(4, 'Noyasy', 'syaffaazzahraa@gmail.com', '$2y$10$8VFveZ7ZSyYl5RvJmhGEruoAwTIFiSpDxYvr2pK9KFHGmZ2qX90om', 'Jl. Masjid, Tangerang Selatan', '085806132246', 'Luar Jakarta (Ongkir Rp 10.000)', '1770127946_32809be78981709ae920.jpeg', '123456', 'Customer', '2026-01-19 09:17:36', '2026-01-30 05:03:44'),
(5, 'Big Boss', 'owner@gmail.com', '$2y$10$4byWkQCNEvIjd.GwrX1ikeVggi2fxBPL5RaZpP2Zb7RxpRQ4tZBJO', NULL, NULL, NULL, NULL, '123456', 'Owner', '2026-01-26 05:03:35', NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `keranjang`
--
ALTER TABLE `keranjang`
  ADD PRIMARY KEY (`id_keranjang`);

--
-- Indeks untuk tabel `merk`
--
ALTER TABLE `merk`
  ADD PRIMARY KEY (`id_merk`);

--
-- Indeks untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id_produk`),
  ADD KEY `fk_kategori` (`id_kategori`),
  ADD KEY `fk_merk` (`id_merk`);

--
-- Indeks untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `id_user` (`id_user`);

--
-- Indeks untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `id_transaksi` (`id_transaksi`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT untuk tabel `keranjang`
--
ALTER TABLE `keranjang`
  MODIFY `id_keranjang` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT untuk tabel `merk`
--
ALTER TABLE `merk`
  MODIFY `id_merk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `produk`
--
ALTER TABLE `produk`
  MODIFY `id_produk` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `produk`
--
ALTER TABLE `produk`
  ADD CONSTRAINT `fk_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_merk` FOREIGN KEY (`id_merk`) REFERENCES `merk` (`id_merk`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `transaksi_detail`
--
ALTER TABLE `transaksi_detail`
  ADD CONSTRAINT `transaksi_detail_ibfk_1` FOREIGN KEY (`id_transaksi`) REFERENCES `transaksi` (`id_transaksi`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
