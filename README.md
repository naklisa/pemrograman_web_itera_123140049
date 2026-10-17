# Repositori Praktikum Pengembangan Aplikasi Web (PAW)
## Institut Teknologi Sumatera (ITERA) &bull; Semester Ganjil 2026/2027

Selamat datang di repositori resmi penugasan **Praktikum Pengembangan Aplikasi Web (PAW)**. Repositori ini memuat seluruh berkas proyek aplikasi utama dan modul latihan mingguan yang disusun menggunakan standar teknologi web modern berbasis **Vanilla HTML5, CSS3, dan JavaScript (ES6+ Object-Oriented & Asynchronous Programming)**.

---

### Profil Mahasiswa
- **Nama Lengkap** : Nahli Saud Ramdani
- **NIM** : 123140049
- **Kelas Praktikum** : RA
- **Program Studi** : Teknik Informatika
- **Jurusan** : Teknologi Produksi dan Industri (JTPI)
- **Institusi** : Institut Teknologi Sumatera (ITERA)
- **Dosen Pengampu / Tim Asisten** : Praktikum Pengembangan Aplikasi Web (PAW)

---

### Daftar Isi
1. [Struktur Repositori](#struktur-repositori)
2. [Ringkasan Pertemuan 1: Mini POS Kantin Kampus](#pertemuan-1-mini-point-of-sale-pos-kantin-kampus)
3. [Ringkasan Pertemuan 2: ITERA Academic Hub (Personal Student Dashboard)](#pertemuan-2-itera-academic-hub-personal-student-dashboard)
4. [Tabel Komparasi Teknologi Antar Pertemuan](#tabel-komparasi-teknologi)
5. [Panduan Eksekusi & Menjalankan Proyek](#panduan-eksekusi--menjalankan-proyek)

---

### Struktur Repositori

```plaintext
Praktikum PAW/
│
├── README.md                                    # Dokumentasi Utama Repositori (Berkas Ini)
│
├── NahliSaudRamdani_123140049_pertemuan1/       # TUGAS & LATIHAN PERTEMUAN 1
│   ├── index.html                               # Aplikasi Utama: Mini Point of Sale (POS) Kantin
│   ├── style.css                                # Desain tampilan kasir & format print struk thermal
│   ├── script.js                                # Logika DOM, validasi formulir, & kalkulator diskon
│   ├── README.md                                # Dokumentasi lengkap pertemuan 1
│   ├── screenshots/                             # Dokumentasi tangkapan layar pengujian pertemuan 1
│   └── modul/                                   # Folder Latihan Modul Praktikum 1
│       ├── index.html                           # Menu navigasi latihan 1-4
│       ├── latihan1.html & latihan1.js          # Latihan 1: Dasar JS, percabangan & umur
│       ├── latihan2.html & latihan2.js          # Latihan 2: Perulangan, prima, faktorial & BMI
│       ├── latihan3.html & latihan3.js          # Latihan 3: Array objek, sorting, filter & CRUD
│       └── latihan4.html & latihan4.js          # Latihan 4: LocalStorage, validasi & dark mode
│
└── NahliSaudRamdani_123140049_pertemuan2/       # TUGAS & LATIHAN PERTEMUAN 2
    ├── index.html                               # Aplikasi Utama: ITERA Academic Hub Dashboard
    ├── style.css                                # Desain responsif, dual-theme (Light & Dark) & glassmorphism
    ├── app.js                                   # Arsitektur OOP ES6+ (Class TaskItem, DashboardApp & Async Fetch)
    ├── README.md                                # Dokumentasi komprehensif pertemuan 2 & pemetaan ES6+
    ├── screenshots/                             # Dokumentasi tangkapan layar pengujian pertemuan 2 (7 Gambar)
    └── modul/                                   # Folder Latihan Modul Praktikum 2 (JavaScript Next Gen ES6+)
        ├── index.html                           # Runner Interaktif (12 Demo Materi & Solusi Latihan)
        ├── style.css                            # Desain dark-theme runner eksekusi kode
        └── js/
            ├── app.js                           # 12 Fungsi Demo Resmi Panduan Praktikum ES6+
            ├── latihan.js                       # Solusi Lengkap Latihan Mandiri Seluruh Topik ES6+
            └── main.js                          # Script Pengikat Runner & Event Listeners
```

---

### Pertemuan 1: Mini Point of Sale (POS) Kantin Kampus

Folder: [`NahliSaudRamdani_123140049_pertemuan1/`](file:///d:/S7.1/MKS7/Praktikum%20PAW/NahliSaudRamdani_123140049_pertemuan1)

Aplikasi web kasir dan keranjang belanja kasir kantin kampus yang berfokus pada penguasaan dasar-dasar pemrograman web interaktif:

#### 1. Fitur Aplikasi Utama
- **Validasi Formulir Ketat**: Pemeriksaan nama barang (min. 3 karakter), harga satuan (angka positif $\ge$ Rp 500), dan kuantitas barang ($\ge 1$) disertai pesan peringatan merah dan animasi getar (*shake*).
- **Kalkulator Kasir & Diskon Otomatis**:
  - Subtotal per item: $\text{Subtotal} = \text{Harga} \times \text{Qty}$
  - Diskon otomatis 10% untuk belanja minimal Rp 50.000 atau kupon promo `HEMAT10`.
  - Kalkulasi uang bayar dan kembalian secara *real-time*.
- **Penyimpanan Keranjang Persisten**: Sinkronisasi data keranjang belanja menggunakan `localStorage.setItem()` dan `JSON.stringify()`, sehingga transaksi tidak hilang saat halaman di-refresh.
- **Struk Transaksi Kasir (*Thermal Receipt Print*)**: Cetak struk kasir dengan identitas kasir mahasiswa ITERA via `window.print()`.

#### 2. Kumpulan Modul Latihan 1-4 (`modul/`)
- **Latihan 1**: Variabel, data diri, logika kelulusan, penentuan umur, `switch-case` nama hari, dan ternary operator nilai huruf.
- **Latihan 2**: Algoritma perulangan (`for` & `while`), tabel perkalian dinamis, faktorial, bilangan prima, kalkulator indeks massa tubuh (BMI), dan permainan klasik *FizzBuzz*.
- **Latihan 3**: Manipulasi struktur data array dan objek mahasiswa, pencarian nilai tertinggi (*highest score*), filter kelulusan, pengurutan abjad/skor, serta operasi CRUD array.
- **Latihan 4**: Manajemen state `localStorage`, validasi formulir tingkat lanjut, *dynamic list*, toggle tema gelap (*dark mode*), dan pengambilan data API publik.

---

### Pertemuan 2: ITERA Academic Hub (Personal Student Dashboard)

Folder: [`NahliSaudRamdani_123140049_pertemuan2/`](file:///d:/S7.1/MKS7/Praktikum%20PAW/NahliSaudRamdani_123140049_pertemuan2)

Aplikasi dasbor akademik personal mahasiswa ITERA yang dibangun menggunakan standar modern **ES6+ Object-Oriented Architecture** dan integrasi **3 API Publik Real-time**:

#### 1. Fitur Aplikasi Utama (Personal Dashboard)
- **Academic Task & Deadline Manager (Full CRUD)**:
  - Menambah tugas baru melalui formulir modal interaktif dengan pemilih tanggal/waktu deadline.
  - Membaca dan menampilkan kartu tugas lengkap dengan lencana mata kuliah, kategori, dan hitung mundur sisa waktu relatif (*Hari ini, Besok, Terlewat*).
  - Mengubah detail tugas (Edit) dan menghapus tugas dengan modal konfirmasi keamanan.
  - Ceklis tugas selesai (*toggle complete*) dengan animasi coret (*strikethrough*) dan pembaruan progres akademik otomatis.
- **Penyimpanan Lokal Lengkap (`localStorage`)**:
  - Persistensi data tugas (`itera_dashboard_tasks_v1`).
  - Persistensi memo kilat scratchpad (`itera_dashboard_notes_v1`).
  - Persistensi preferensi tema pengguna (`itera_dashboard_theme_v1`).
- **Widget Cuaca Real-Time Kampus ITERA (Async Open-Meteo API)**:
  - Koordinat satelit kampus ITERA di Lampung Selatan (`-5.36°`, `105.31°`).
  - Menampilkan suhu udara, kecepatan angin, kondisi cuaca WMO, dan saran mobilitas mahasiswa saat melintasi Labtek dan GKU.
- **Kutipan Inspirasi Harian (Async DummyJSON Quotes API)**:
  - Mengambil kata-kata mutiara acak dari server eksternal untuk dorongan motivasi belajar harian.
- **Simulasi Impor Cloud (Async JSONPlaceholder API)**:
  - Mengunduh tugas eksternal dari endpoint *todos* dan mentransformasikannya secara instan ke objek `TaskItem`.
- **Produktivitas Mahasiswa Tambahan**:
  - Jam digital kampus *real-time* WIB dengan tanggal Bahasa Indonesia.
  - Study focus timer dengan teknik Pomodoro 25 menit (Mulai, Jeda, Reset).
  - Scratchpad memo kuliah otomatis tersimpan (*auto-save*).
  - Akses pintasan langsung ke portal SIAKAD, LMS Kuliah Daring, DIM, dan Perpustakaan ITERA.
  - Dual Theme (Mode Terang Elegan & Mode Gelap Modern).

#### 2. Folder Modul Praktikum 2 (`modul/` - JavaScript Next Gen ES6+)
- **Runner Interaktif (`modul/index.html`)**:
  - Dilengkapi tombol `runBtn` (*Run Demo Materi*) dan `runLatihanBtn` (*Jalankan Solusi Latihan*).
- **12 Demo Materi Standar (`modul/js/app.js`)**:
  1. `demoVariables()`: Let & Const vs Var, block scope.
  2. `demoArrowFunctions()`: Berbagai variasi fungsi panah.
  3. `demoTemplateLiterals()`: Interpolasi `${...}` & multi-line string.
  4. `demoDestructuring()`: Objek bertingkat, array, rest pattern, swap variable.
  5. `demoSpreadRest()`: Spread operator untuk kloning & rest parameter.
  6. `demoDefaultParams()`: Parameter default modern vs ES5 OR operator.
  7. `demoClasses()`: OOP modern (`class User`, `Admin extends User`, `super`).
  8. `demoObjectLiterals()`: Shorthand property/method, computed keys.
  9. `demoArrayMethods()`: Higher-Order Functions (`map`, `filter`, `find`, `reduce`, `some`, `every`).
  10. `demoAdvancedArrays()`: `Array.from()`, `Array.of()`, `flat()`, `flatMap()`, `includes()`.
  11. `demoPromises()`: Penanganan Promise dasar, chaining, `Promise.all`, dan `Promise.race`.
  12. `demoAsyncAwait()`: Sintaks `async/await` dengan `try/catch` dan eksekusi paralel.
- **Solusi Lengkap Latihan Mandiri (`modul/js/latihan.js`)**:
  - Penanganan error reassign `const` (`TypeError`) & isolasi block scope `let`.
  - Generator kartu mahasiswa HTML dinamis berbasis template literals.
  - Nested destructuring 3 level (Fakultas $\rightarrow$ Jurusan $\rightarrow$ Program Studi).
  - Fungsi statistik `calculateStats(...numbers)` menggunakan rest parameter.
  - Penggabungan 3 objek dengan spread operator dan penimpaan properti.
  - Destructuring di dalam loop `for...of`.
  - Hierarki pewarisan `Product` $\rightarrow$ `DigitalProduct` & `PhysicalProduct` lengkap dengan getter/setter.
  - Fungsi `groupBy()` serbaguna menggunakan `reduce()`.
  - Transformasi flattening array bersarang.
  - Pipeline chaining `filter` $\rightarrow$ `map` $\rightarrow$ `reduce`.
  - Fetch paralel multi-endpoint, mekanisme retry dengan exponential backoff, async error boundary, dan pagination.

---

### Tabel Komparasi Teknologi

| Aspek Penilaian | Pertemuan 1 (Mini POS Kasir) | Pertemuan 2 (ITERA Academic Hub) |
|:---|:---|:---|
| **Paradigma Kode** | Procedural / Functional JavaScript Dasar | **Object-Oriented Programming (OOP) ES6+ Classes** |
| **Model Data** | Plain Object `{ id, name, price, qty }` | **Kelas Entitas `TaskItem` & Manager `DashboardApp`** |
| **Fitur Bahasa** | ES5 / ES6 Dasar (`var`, `let`, `function`, concatenation) | **Strict `let`/`const`, Arrow Functions, Template Literals, Destructuring, Spread Operator (`...`)** |
| **Operasi Data** | DOM Event Listener & Manipulasi Elemen Klasik | **Template Literals Dynamic Rendering, Higher-Order Functions (`map`, `filter`, `reduce`)** |
| **Penyimpanan** | `localStorage` Keranjang Belanja | **`localStorage` Multi-Key (Tugas, Scratchpad Memo, & Preferensi Tema)** |
| **Jaringan & API** | Standalone Offline / Modul Terbatas | **Async / Await dengan Real Public APIs (Open-Meteo, DummyJSON, JSONPlaceholder)** |
| **Desain Antarmuka** | Light Theme POS Kasir + Format Struk Thermal | **Dual Theme (Light & Dark), Glassmorphism, Responsive Grid, SVG Icons & Pomodoro** |
| **Modul Latihan** | Latihan 1 sampai 4 di folder `modul/` | **Runner Interaktif 12 Demo ES6+ & Solusi Latihan Lengkap di `modul/`** |

---

### Panduan Eksekusi & Menjalankan Proyek

Seluruh aplikasi dibuat menggunakan standar **Vanilla Web (HTML, CSS, JS)** murni tanpa membutuhkan instalasi dependensi luar melalui `npm install`.

#### Rekomendasi: Menjalankan via Local Web Server
Karena Pertemuan 2 menggunakan modul JavaScript modern (`type="module"`) dan pemanggilan API publik asinkron, sangat disarankan menggunakan web server lokal untuk menghindari batasan keamanan `CORS` pada protokol `file://`:

1. Buka PowerShell atau Terminal pada folder utama:
   ```powershell
   cd "d:\S7.1\MKS7\Praktikum PAW"
   ```
2. Jalankan server lokal menggunakan Python:
   ```powershell
   python -m http.server 8080
   ```
3. Buka browser dan akses alamat berikut:
   - **Pertemuan 1 (Mini POS Kasir)**: [http://localhost:8080/NahliSaudRamdani_123140049_pertemuan1/](http://localhost:8080/NahliSaudRamdani_123140049_pertemuan1/)
   - **Pertemuan 1 (Modul Latihan)**: [http://localhost:8080/NahliSaudRamdani_123140049_pertemuan1/modul/](http://localhost:8080/NahliSaudRamdani_123140049_pertemuan1/modul/)
   - **Pertemuan 2 (ITERA Academic Hub)**: [http://localhost:8080/NahliSaudRamdani_123140049_pertemuan2/](http://localhost:8080/NahliSaudRamdani_123140049_pertemuan2/)
   - **Pertemuan 2 (Modul Latihan ES6+)**: [http://localhost:8080/NahliSaudRamdani_123140049_pertemuan2/modul/](http://localhost:8080/NahliSaudRamdani_123140049_pertemuan2/modul/)
